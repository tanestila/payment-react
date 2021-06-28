import { useMemo } from "react";

export default function useTransactionDataAuditColumns(ability) {
  return useMemo(
    () => [
      {
        title: "transaction_processing_guid",
        dataIndex: "transaction_processing_guid",
        key: "transaction_processing_guid",
      },
      {
        title: "tracking_id",
        dataIndex: "tracking_id",
        key: "tracking_id",
      },
      {
        title: "amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "currency",
        dataIndex: "currency",
        key: "currency",
      },
      {
        title: "card_eu",
        dataIndex: "card_eu",
        key: "card_eu",
      },

      {
        title: "card_type",
        dataIndex: "card_type",
        key: "card_type",
      },
      {
        title: "card_schema",
        dataIndex: "card_schema",
        key: "card_schema",
      },

      {
        title: "card_holder",
        dataIndex: "card_holder",
        key: "card_holder",
      },
      {
        title: "card_number",
        dataIndex: "card_number",
        key: "card_number",
      },
      {
        title: "Expire date",
        dataIndex: "exp_month",
        key: "exp_month",
        render: (text: string, record: any) =>
          record.exp_month + "/" + record.exp_year,
      },
      {
        title: "bin_country",
        dataIndex: "bin_country",
        key: "bin_country",
      },
      {
        title: "description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "first_name",
        dataIndex: "first_name",
        key: "first_name",
      },
      {
        title: "last_name",
        dataIndex: "last_name",
        key: "last_name",
      },
      {
        title: "email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "phone",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "ip",
        dataIndex: "ip",
        key: "ip",
      },
      {
        title: "country",
        dataIndex: "country",
        key: "country",
      },
      {
        title: "city",
        dataIndex: "city",
        key: "city",
      },
      {
        title: "address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "zip",
        dataIndex: "zip",
        key: "zip",
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
