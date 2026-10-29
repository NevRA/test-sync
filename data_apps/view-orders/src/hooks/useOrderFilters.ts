import { filter } from "@metabase/embedding-sdk-react/data-app";

import type { DateRange } from "../lib/dates";

export type OrderFilters = { customer: string; range: DateRange };

// Clauses on the "Order rows" question's columns, shared by every panel on the page.
export function orderFilterClauses({ customer, range }: OrderFilters) {
  const [start, end] = range;
  return [
    ...(customer !== "all"
      ? [filter({ type: "column", name: "customer_name" }, "=", customer)]
      : []),
    ...(start && end
      ? [filter({ type: "column", name: "created_at" }, "between", [start, end])]
      : []),
  ];
}
