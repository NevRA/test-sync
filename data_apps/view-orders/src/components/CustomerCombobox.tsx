import { useEffect, useMemo, useRef, useState } from "react";

import { useMetabaseQuery } from "@metabase/embedding-sdk-react/data-app";

import { queries } from "../metabase";

type Option = { value: string; label: string };

export function CustomerCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { data, error } = useMetabaseQuery(queries.customers);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const options = useMemo<Option[]>(() => {
    const names = new Set<string>();
    for (const row of data?.rows ?? []) {
      if (row.customer_name != null) names.add(row.customer_name);
    }
    return [...names].map((name) => ({ value: name, label: name }));
  }, [data]);

  useEffect(() => {
    if (data && value !== "all" && !options.some((option) => option.value === value)) {
      onChange("all");
    }
  }, [data, options, value, onChange]);

  const term = search.trim().toLowerCase();
  const visible = [
    { value: "all", label: "All customers" },
    ...options.filter((option) => option.label.toLowerCase().includes(term)),
  ];

  const pick = (next: string) => {
    onChange(next);
    setOpen(false);
    setSearch("");
  };

  const selectedLabel = value === "all" ? "All customers" : value;

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative" }}
      onBlur={(event) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button type="button" style={triggerStyle} onClick={() => setOpen((o) => !o)}>
        Customer: <strong>{selectedLabel}</strong> ▾
      </button>
      {open && (
        <div style={popoverStyle}>
          <input
            autoFocus
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customers"
            style={inputStyle}
          />
          <div style={{ maxHeight: 240, overflowY: "auto" }}>
            {visible.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => pick(option.value)}
                style={{
                  ...optionStyle,
                  background: option.value === value ? "#EAF4FF" : "transparent",
                }}
              >
                {option.label}
              </button>
            ))}
            {data === null && !error && <div style={hintStyle}>Loading…</div>}
            {error != null && <div style={hintStyle}>Couldn't load customers</div>}
            {data && visible.length === 1 && <div style={hintStyle}>No matches</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export const triggerStyle = {
  border: "1px solid #d1d5db",
  borderRadius: 8,
  background: "white",
  padding: "6px 12px",
  fontSize: 14,
  color: "#1f2937",
  cursor: "pointer",
} as const;

const popoverStyle = {
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  zIndex: 10,
  width: 240,
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  padding: 8,
} as const;

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #d1d5db",
  borderRadius: 6,
  padding: "6px 8px",
  marginBottom: 6,
  fontSize: 14,
} as const;

const optionStyle = {
  display: "block",
  width: "100%",
  textAlign: "left",
  border: "none",
  borderRadius: 6,
  padding: "6px 8px",
  fontSize: 14,
  cursor: "pointer",
  color: "#1f2937",
} as const;

const hintStyle = { padding: "6px 8px", fontSize: 13, color: "#6b7280" } as const;
