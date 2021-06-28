import { useMemo } from "react";

export default function useTransactionOverviewAuditColumns(ability) {
  return useMemo(
    () => [
      {
        title: "transaction_processing_guid",
        dataIndex: "transaction_processing_guid",
        key: "transaction_processing_guid",
      },
      {
        title: "base_amount",
        dataIndex: "base_amount",
        key: "base_amount",
      },
      {
        title: "to_bank_pct",
        dataIndex: "to_bank_pct",
        key: "to_bank_pct",
      },
      {
        title: "to_bank_fixed",
        dataIndex: "to_bank_fixed",
        key: "to_bank_fixed",
      },
      {
        title: "to_client",
        dataIndex: "to_client",
        key: "to_client",
      },

      {
        title: "to_processor_pct",
        dataIndex: "to_processor_pct",
        key: "to_processor_pct",
      },
      {
        title: "to_processor_fixed",
        dataIndex: "to_processor_fixed",
        key: "to_processor_fixed",
      },
      {
        title: "hold",
        dataIndex: "hold",
        key: "hold",
      },
      {
        title: "hold_date",
        dataIndex: "hold_date",
        key: "hold_date",
      },
      {
        title: "hold_flag",
        dataIndex: "hold_flag",
        key: "hold_flag",
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
