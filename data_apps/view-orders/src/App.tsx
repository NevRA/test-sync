import { useState } from "react";

import { AmountByMonth } from "./components/AmountByMonth";
import { CustomerCombobox } from "./components/CustomerCombobox";
import { DateFilter, type DateChoice } from "./components/DateFilter";
import { Kpis } from "./components/Kpi";
import { OrdersTable } from "./components/OrdersTable";

export default function App() {
  const [customer, setCustomer] = useState("all");
  const [date, setDate] = useState<DateChoice>({ preset: "all", range: [null, null] });
  const filters = { customer, range: date.range };

  return (
    <div
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: 24,
        background: "#f6f7f9",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <header>
        <h1 style={{ margin: 0, fontSize: 24, color: "#1f2937" }}>Orders</h1>
      </header>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <CustomerCombobox value={customer} onChange={setCustomer} />
        <DateFilter value={date} onChange={setDate} />
      </div>

      <Kpis filters={filters} />
      <AmountByMonth filters={filters} />
      <OrdersTable filters={filters} />
    </div>
  );
}
