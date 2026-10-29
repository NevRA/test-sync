import { useMemo } from "react";

import { StaticQuestion, type MetabaseCard } from "@metabase/embedding-sdk-react";
import { orderBy, useMetabaseQueryObject } from "@metabase/embedding-sdk-react/data-app";

import { orderFilterClauses, type OrderFilters } from "../hooks/useOrderFilters";
import { queries } from "../metabase";
import { Panel, PanelError, PanelMessage } from "./Panel";

export function OrdersTable({ filters }: { filters: OrderFilters }) {
  const { query, isLoading, error } = useMetabaseQueryObject(queries.orderRows, {
    filters: orderFilterClauses(filters),
    orderBys: [orderBy({ type: "column", name: "created_at" }, "desc")],
  });
  const card = useMemo(() => ({ query, visualization: "table" }) satisfies MetabaseCard, [query]);

  return (
    <Panel title="Orders">
      {error ? (
        <PanelError error={error} />
      ) : isLoading || !query ? (
        <PanelMessage>Loading…</PanelMessage>
      ) : (
        <StaticQuestion card={card} height={420} width="100%" />
      )}
    </Panel>
  );
}
