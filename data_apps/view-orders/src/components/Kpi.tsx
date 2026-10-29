import { useMemo } from "react";

import { StaticQuestion, type MetabaseCard } from "@metabase/embedding-sdk-react";
import { aggregations, useMetabaseQueryObject } from "@metabase/embedding-sdk-react/data-app";

import { orderFilterClauses, type OrderFilters } from "../hooks/useOrderFilters";
import { queries } from "../metabase";
import { Panel, PanelError, PanelMessage } from "./Panel";

const amount = { type: "column", name: "amount" } as const;
const id = { type: "column", name: "id" } as const;

function KpiPanel({
  title,
  query,
  isLoading,
  error,
}: {
  title: string;
  query: ReturnType<typeof useMetabaseQueryObject>["query"];
  isLoading: boolean;
  error: unknown;
}) {
  const card = useMemo(() => ({ query, visualization: "scalar" }) satisfies MetabaseCard, [query]);
  return (
    <Panel title={title}>
      {error ? (
        <PanelError error={error} />
      ) : isLoading || !query ? (
        <PanelMessage>Loading…</PanelMessage>
      ) : (
        <StaticQuestion card={card} height={110} width="100%" />
      )}
    </Panel>
  );
}

export function Kpis({ filters }: { filters: OrderFilters }) {
  const count = useMetabaseQueryObject(queries.orderRows, {
    filters: orderFilterClauses(filters),
    aggregations: [aggregations.distinct(id, { name: "orders" })],
  });
  const total = useMetabaseQueryObject(queries.orderRows, {
    filters: orderFilterClauses(filters),
    aggregations: [aggregations.sum(amount, { name: "total_amount" })],
  });
  const average = useMetabaseQueryObject(queries.orderRows, {
    filters: orderFilterClauses(filters),
    aggregations: [aggregations.avg(amount, { name: "average_amount" })],
  });

  return (
    <div style={gridStyle}>
      <KpiPanel title="Orders" {...count} />
      <KpiPanel title="Total amount" {...total} />
      <KpiPanel title="Average order" {...average} />
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 16,
} as const;
