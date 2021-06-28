import { useMemo } from "react";

export default function useTerminalsAuditColumns(ability) {
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
        title: "currency_code",
        dataIndex: "currency_code",
        key: "currency_code",
      },
      {
        title: "gateway_name",
        dataIndex: "gateway_name",
        key: "gateway_name",
      },
      {
        title: "enabled",
        dataIndex: "enabled",
        key: "enabled",
      },

      {
        title: "rate_guid",
        dataIndex: "rate_guid",
        key: "rate_guid",
      },
      {
        title: "three_d",
        dataIndex: "three_d",
        key: "three_d",
      },

      {
        title: "monthly_amount_limit",
        dataIndex: "monthly_amount_limit",
        key: "monthly_amount_limit",
      },
      {
        title: "payment_amount_limit",
        dataIndex: "payment_amount_limit",
        key: "payment_amount_limit",
      },
      {
        title: "transaction_count_limit",
        dataIndex: "transaction_count_limit",
        key: "transaction_count_limit",
      },
      {
        title: "antifraud_monitor",
        dataIndex: "antifraud_monitor",
        key: "antifraud_monitor",
      },
      {
        title: "antifraud_monitor_value",
        dataIndex: "antifraud_monitor_value",
        key: "antifraud_monitor_value",
      },
      {
        title: "billing_descriptor",
        dataIndex: "billing_descriptor",
        key: "billing_descriptor",
      },
      {
        title: "routing_string",
        dataIndex: "routing_string",
        key: "routing_string",
      },
      {
        title: "generate_statement",
        dataIndex: "generate_statement",
        key: "generate_statement",
      },
      {
        title: "supported_brands",
        dataIndex: "supported_brands",
        key: "supported_brands",
      },
      {
        title: "checkout_method",
        dataIndex: "checkout_method",
        key: "checkout_method",
      },
      {
        title: "enable_checkout",
        dataIndex: "enable_checkout",
        key: "enable_checkout",
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
