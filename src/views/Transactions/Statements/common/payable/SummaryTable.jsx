import { Table } from "antd";

const columns = [
  {
    title: "Name",
    key: "name",
    render: (cellInfo) => cellInfo.name,
  },
  {
    title: "Turnover",
    key: "turnover__count_amount",
    render: (cellInfo) =>
      `${cellInfo.turnover_count ?? "NaN"} / ${
        cellInfo.turnover_amount ?? "NaN"
      }`,
  },
  {
    title: "Turnover failed",
    key: "turnover_failed_count_amount",
    render: (cellInfo) =>
      `${cellInfo.turnover_count_failed ?? "NaN"} / ${
        cellInfo.turnover_amount_failed ?? "NaN"
      }`,
  },
  {
    title: "Summary",
    key: "summary_count_amount",
    render: (cellInfo) =>
      `${cellInfo.summary_count ?? "NaN"} / ${
        cellInfo.summary_amount ?? "NaN"
      }`,
  },
  {
    title: "Reverse",
    key: "reverse_count_amount",
    render: (cellInfo) =>
      `${cellInfo.reverse_count ?? "NaN"} / ${
        cellInfo.reverse_amount ?? "NaN"
      }`,
  },
  {
    title: "Cancel",
    key: "cancel_count_amount",
    render: (cellInfo) =>
      `${cellInfo.cancel_count ?? "NaN"} / ${cellInfo.cancel_amount ?? "NaN"}`,
  },
  {
    title: "Chargeback",
    key: "chargeback_count_amount",
    render: (cellInfo) =>
      `${cellInfo.chargeback_count ?? "NaN"} / ${
        cellInfo.chargeback_amount ?? "NaN"
      }`,
  },
  {
    title: "Retrieval",
    key: "retrieval_count_amount",
    render: (cellInfo) =>
      `${cellInfo.retrieval_count ?? "NaN"} / ${
        cellInfo.retrieval_amount ?? "NaN"
      }`,
  },
  {
    title: "Representment",
    key: "representment_count_amount",
    render: (cellInfo) =>
      `${cellInfo.representment_count ?? "NaN"} / ${
        cellInfo.representment_amount ?? "NaN"
      }`,
  },
  {
    title: "Pre-arbitration",
    key: "prearbitration_count_amount",
    render: (cellInfo) =>
      `${cellInfo.pre_arbitration_count ?? "NaN"} / ${
        cellInfo.pre_arbitration_amount ?? "NaN"
      }`,
  },
  {
    title: "Chargeback reversal",
    key: "chargeback_reversal_count_amount",
    render: (cellInfo) =>
      `${cellInfo.chargeback_reversal_count ?? "NaN"} / ${
        cellInfo.chargeback_reversal_amount ?? "NaN"
      }`,
  },

  {
    title: "Refund",
    key: "refund_count_amount",
    render: (cellInfo) =>
      `${cellInfo.refund_count ?? "NaN"} / ${cellInfo.refund_amount ?? "NaN"}`,
  },
  {
    title: "For payout",
    key: "for_payout",
    render: (cellInfo) => cellInfo.for_payout,
  },
];

export const SummaryTable = ({ statement_data }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={statement_data}
        pagination={false}
        bordered
      />
    </>
  );
};
