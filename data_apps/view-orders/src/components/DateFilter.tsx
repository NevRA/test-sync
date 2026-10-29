import { DateRangePopover, useDateFormatter } from "@metabase/embedding-sdk-react/data-app";

import { DATE_PRESETS, type DateRange } from "../lib/dates";
import { triggerStyle } from "./CustomerCombobox";

export type DateChoice = { preset: string; range: DateRange };

export function DateFilter({
  value,
  onChange,
}: {
  value: DateChoice;
  onChange: (value: DateChoice) => void;
}) {
  const { formatDateRange } = useDateFormatter();
  const isCustom = value.preset === "custom";

  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {DATE_PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={() => onChange({ preset: preset.id, range: preset.range() })}
          style={chipStyle(value.preset === preset.id)}
        >
          {preset.label}
        </button>
      ))}
      <DateRangePopover
        value={isCustom ? value.range : [null, null]}
        onChange={(range) => onChange({ preset: "custom", range })}
      >
        <button type="button" style={chipStyle(isCustom)}>
          {isCustom && formatDateRange(value.range) ? formatDateRange(value.range) : "Custom"}
        </button>
      </DateRangePopover>
    </div>
  );
}

const chipStyle = (active: boolean) =>
  ({
    ...triggerStyle,
    borderRadius: 999,
    borderColor: active ? "#4D96FF" : "#d1d5db",
    background: active ? "#EAF4FF" : "white",
    color: active ? "#1d4ed8" : "#1f2937",
  }) as const;
