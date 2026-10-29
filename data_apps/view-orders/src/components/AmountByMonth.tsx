import { useMemo } from "react";

import { StaticQuestion, type MetabaseCard } from "@metabase/embedding-sdk-react";
import { aggregations, useMetabaseQueryObject } from "@metabase/embedding-sdk-react/data-app";

import { orderFilterClauses, type OrderFilters } from "../hooks/useOrderFilters";
import { queries } from "../metabase";
import { Panel, PanelError, PanelMessage } from "./Panel";

export function AmountByMonth({ filters }: { filters: OrderFilters }) {
  const { query, isLoading, error } = useMetabaseQueryObject(queries.orderRows, {
    filters: orderFilterClauses(filters),
    aggregations: [aggregations.sum({ type: "column", name: "amount" }, { name: "total_amount" })],
    breakouts: [{ type: "column", name: "created_at", unit: "month" }],
  });
  const card = useMemo(() => ({ query, visualization: "bar" }) satisfies MetabaseCard, [query]);

  return (
    <Panel title="Amount by month">
      {error ? (
        <PanelError error={error} />
      ) : isLoading || !query ? (
        <PanelMessage>Loading…</PanelMessage>
      ) : (
        <StaticQuestion card={card} height={300} width="100%" />
      )}
    </Panel>
  );
}
