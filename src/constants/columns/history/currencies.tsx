import { useMemo } from "react";

export default function useCurrenciesAuditColumns(ability) {
  return useMemo(
    () => [
      {
        title: "guid",
        dataIndex: "guid",
        key: "guid",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "code",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "number",
        dataIndex: "number",
        key: "number",
      },
      {
        title: "exchange_markup_percent",
        dataIndex: "exchange_markup_percent",
        key: "exchange_markup_percent",
      },
      {
        title: "rate_to_eur",
        dataIndex: "rate_to_eur",
        key: "rate_to_eur",
      },

      {
        title: "Time",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "Reason",
        dataIndex: "reason",
        key: "reason",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
      },
      {
        title: "Author",
        dataIndex: "author_username",
        key: "author_username",
      },
    ],
    [ability]
  );
}
