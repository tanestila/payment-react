import { Table, Typography } from "antd";
import { useState, useEffect } from "react";

const columns = [
  {
    title: "Currency",
    key: "name",
    render: (cellInfo) => cellInfo.name,
  },
  {
    title: "Transactions approved",
    key: "turnover_count_amount",
    render: (cellInfo) =>
      `${cellInfo.turnover_count ?? "NaN"} / ${
        cellInfo.turnover_amount ?? "NaN"
      }`,
  },
  {
    title: "Transactions declined",
    key: "turnover_failed_count_amount",
    render: (cellInfo) =>
      `${cellInfo.turnover_count_failed ?? "NaN"} / ${
        cellInfo.turnover_amount_failed ?? "NaN"
      }`,
  },
  {
    title: "Reversal",
    key: "reversal_count_amount",
    render: (cellInfo) =>
      `${cellInfo.reverse_count ?? "NaN"} / ${
        cellInfo.reverse_amount ?? "NaN"
      }`,
  },
  {
    title: "Refund",
    key: "refund_count_amount",
    render: (cellInfo) =>
      `${cellInfo.refund_count ?? "NaN"} / ${cellInfo.refund_amount ?? "NaN"}`,
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
    title: "Representment",
    key: "representment_count_amount",
    render: (cellInfo) =>
      `${cellInfo.representment_count ?? "NaN"} / ${
        cellInfo.representment_amount ?? "NaN"
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
    title: "Summary",
    key: "summary_count_amount",
    render: (cellInfo) =>
      `${cellInfo.summary_count ?? "NaN"} / ${
        cellInfo.summary_amount ?? "NaN"
      }`,
  },
];

export const SummaryTable = ({ currencies, statement_currency_code }) => {
  let [data, setData] = useState([]);
  let [fData, setFData] = useState({});

  useEffect(() => {
    let currenciesStatement = [...currencies];
    let sumCurrencies = currenciesStatement.splice(
      currenciesStatement.indexOf(
        currenciesStatement.filter((currency) => currency.name === "Summary")
      ),
      1
    );
    sumCurrencies = {
      ...sumCurrencies[0],
      name: "Summary (" + statement_currency_code + ")",
    };

    setData(currenciesStatement);
    setFData(sumCurrencies);
  }, [currencies, statement_currency_code]);
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        summary={() => {
          return (
            <>
              <Table.Summary.Row>
                {columns.map((col) => (
                  <Table.Summary.Cell>{col.render(fData)}</Table.Summary.Cell>
                ))}
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </>
  );
};
