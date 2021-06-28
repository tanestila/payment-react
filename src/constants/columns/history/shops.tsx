import { useMemo } from "react";

export default function useShopsAuditColumns(ability) {
  return useMemo(
    () => [
      {
        title: "Guid",
        dataIndex: "guid",
        key: "guid",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Merchant",
        dataIndex: "merchant_name",
        key: "merchant_name",
      },
      {
        title: "enabled",
        dataIndex: "enabled",
        key: "enabled",
      },
      {
        title: "phone",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "url",
        dataIndex: "url",
        key: "url",
      },

      {
        title: "risk_category",
        dataIndex: "risk_category",
        key: "risk_category",
      },
      {
        title: "note",
        dataIndex: "note",
        key: "note",
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "reason",
        dataIndex: "reason",
        key: "reason",
      },
      {
        title: "action",
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
