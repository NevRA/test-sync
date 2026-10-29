import type { ReactNode } from "react";

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minWidth: 0,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#4b5563" }}>{title}</h2>
      {children}
    </section>
  );
}

export function PanelMessage({ children }: { children: ReactNode }) {
  return <div style={{ padding: 16, color: "#6b7280", fontSize: 14 }}>{children}</div>;
}

export function PanelError({ error }: { error: unknown }) {
  return (
    <PanelMessage>
      <span style={{ color: "#b91c1c" }}>
        {error instanceof Error ? error.message : String(error)}
      </span>
    </PanelMessage>
  );
}
