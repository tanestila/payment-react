import { useState, useMemo } from "react";
import { ReportForm } from "../ReportForm";

import { Card, Tabs } from "antd";
import { Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { dailyReportAPI } from "../../../services/queries/report/dailyReport";

import { TandCReportAPI } from "../../../services/queries/report/TandCReport";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import Table from "../../../Components/TableFactory/Table";
import { formatDateForTable } from "../../../helpers/formatDate";
import Loading from "../../../Components/Common/Loading/MainLoading";
import moment from "moment";

const columnsSummary = [
  {
    title: "TRX date",
    dataIndex: "date",
    key: "date",
    // render: (text) => formatDateForTable(text),
    render: (value, row, index) => {
      const obj = {
        children: value === "Summary" ? value : formatDateForTable(value),
        props: {},
      };

      if (row.rowSpan !== null) {
        console.log(row.rowSpan);
        obj.props.rowSpan = row.rowSpan;
      }
      return obj;
    },
  },
  {
    title: "Currency",
    dataIndex: "currency_code",
    key: "currency_code",
  },
  {
    title: "Success payment sum",
    dataIndex: "success_turnover_amount",
    key: "success_turnover_amount",
  },
  {
    title: "Failed payment sum",
    dataIndex: "failed_turnover_amount",
    key: "failed_turnover_amount",
  },
  { title: "Refund sum", dataIndex: "refund_amount", key: "refund_amount" },
  {
    title: "Chargeback sum",
    dataIndex: "chargeback_amount",
    key: "chargeback_amount",
  },
  {
    title: "Chargeback reversal sum",
    dataIndex: "chargeback_reversal_amount",
    key: "chargeback_reversal_amount",
  },
  {
    title: "Prearbitration sum",
    dataIndex: "prearbitration_amount",
    key: "prearbitration_amount",
  },
  {
    title: "Representment sum",
    dataIndex: "representment_amount",
    key: "representment_amount",
  },
  {
    title: "Retrieval sum",
    dataIndex: "retrieval_amount",
    key: "retrieval_amount",
  },
  { title: "Reverse sum", dataIndex: "reverse_amount", key: "reverse_amount" },
];

const processorColumns = [
  {
    title: "TRX date",
    dataIndex: "date",
    key: "date",
    render: (text) => formatDateForTable(text),
  },
  {
    title: "Success turnover fee sum (fixed)",
    dataIndex: "success_turnover_merchant_fixed_fee",
    key: "success_turnover_merchant_fixed_fee",
  },
  {
    title: "Success turnover fee sum (%)",
    dataIndex: "success_turnover_merchant_percent_fee",
    key: "success_turnover_merchant_percent_fee",
  },
  {
    title: "Refund fee sum",
    dataIndex: "refund_merchant_fee",
    key: "refund_merchant_fee",
  },
  {
    title: "Decline fee sum",
    dataIndex: "failed_turnover_merchant_fee",
    key: "failed_turnover_merchant_fee",
  },
  {
    title: "Chargeback fee sum",
    dataIndex: "chargeback_merchant_fee",
    key: "chargeback_merchant_fee",
  },
  {
    title: "Monthly fee sum",
    dataIndex: "monthly_fee",
    key: "monthly_fee",
  },
  {
    title: "Prearbitration sum",
    dataIndex: "prearbitration_amount",
    key: "prearbitration_amount",
  },
  {
    title: "BankWire Fee sum",
    dataIndex: "bank_wire_fee",
    key: "bank_wire_fee",
  },
  {
    title: "Connection Fee sum",
    dataIndex: "connection_fee",
    key: "connection_fee",
  },
];

const bankColumnsForCurrency = [
  {
    title: "TRX date",
    dataIndex: "date",
    key: "date",
    render: (text) => formatDateForTable(text),
  },
  {
    title: "Success turnover fee sum (fixed)",
    dataIndex: "success_turnover_bank_fixed_fee",
    key: "success_turnover_bank_fixed_fee",
  },
  {
    title: "Success turnover fee sum (%)",
    dataIndex: "success_turnover_bank_percent_fee",
    key: "success_turnover_bank_percent_fee",
  },
  {
    title: "Refund fee sum",
    dataIndex: "refund_bank_fee",
    key: "refund_bank_fee",
  },
  {
    title: "Decline fee sum",
    dataIndex: "failed_turnover_bank_fee",
    key: "failed_turnover_bank_fee",
  },
  {
    title: "Chargeback fee sum",
    dataIndex: "chargeback_bank_fee",
    key: "chargeback_bank_fee",
  },
  {
    title: "Monthly fee sum",
    dataIndex: "monthly_fee",
    key: "monthly_fee",
    render: () => 0,
  },
  {
    title: "Prearbitration sum",
    dataIndex: "prearbitration_amount",
    key: "prearbitration_amount",
  },
  {
    title: "BankWire Fee sum",
    dataIndex: "bank_wire_fee",
    key: "bank_wire_fee",
  },
  {
    title: "Connection Fee sum",
    dataIndex: "connection_fee",
    key: "connection_fee",
  },
];

const bankColumns = [
  {
    title: "TRX date",
    dataIndex: "date",
    key: "date",
    render: (text) => formatDateForTable(text),
  },
  {
    title: "Success turnover fee sum (fixed)",
    dataIndex: "success_turnover_bank_fixed_fee",
    key: "success_turnover_bank_fixed_fee",
  },
  {
    title: "Success turnover fee sum (%)",
    dataIndex: "success_turnover_bank_percent_fee",
    key: "success_turnover_bank_percent_fee",
  },
  {
    title: "Refund fee sum",
    dataIndex: "refund_bank_fee",
    key: "refund_bank_fee",
  },
  {
    title: "Decline fee sum",
    dataIndex: "failed_turnover_bank_fee",
    key: "failed_turnover_bank_fee",
  },
  {
    title: "Chargeback fee sum",
    dataIndex: "chargeback_bank_fee",
    key: "chargeback_bank_fee",
  },
  {
    title: "Monthly fee sum",
    dataIndex: "monthly_fee",
    key: "monthly_fee",
  },
  {
    title: "Prearbitration sum",
    dataIndex: "prearbitration_amount",
    key: "prearbitration_amount",
  },
  {
    title: "BankWire Fee sum",
    dataIndex: "bank_wire_fee",
    key: "bank_wire_fee",
  },
  {
    title: "Connection Fee sum",
    dataIndex: "connection_fee",
    key: "connection_fee",
  },
];

const TransactionAndCommission = () => {
  const [data, setData] = useState({
    merchant_guid_array: [],
    group_guid_array: [],
    partner_guid_array: [],
    shop_guid_array: [],
    terminal_guid_array: [],
    from_date: moment().startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
    to_date: moment().endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
    exportType: null,
  });

  const handleSubmit = (data) => {
    setData({ ...data });
  };

  const {
    isFetching,
    isLoading,
    isError,
    error,
    data: response,
    items,
    handleTableChange,
  } = useTableQuery(
    "transaction-and-commissions",
    () => TandCReportAPI.get({ ...data }),
    false,
    10,
    [
      data.partner_guid_array,
      data.group_guid_array,
      data.merchant_guid_array,
      data.shop_guid_array,
      data.terminal_guid_array,
      data.from_date,
      data.to_date,
    ]
  );

  const modifiedSummary = useMemo(() => {
    let summary = [];
    if (response && response.summary) {
      response.summary.forEach((item) => {
        if (item.collapsed.length === 1) {
          summary.push({ date: item.date, ...item.collapsed[0] });
        } else {
          item.collapsed.forEach((data, index) => {
            summary.push({
              date: item.date,
              ...data,
              rowSpan: index === 0 ? item.collapsed.length : 0,
            });
          });
        }
      });
    }
    return summary;
  }, [response]);

  return (
    <>
      <ReportForm handleSubmit={handleSubmit} />
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <>
          <div>checkbox View processed (Show empty rows)</div>
          Summary
          <Table
            columns={columnsSummary}
            handleTableChange={handleTableChange}
            isFetching={isFetching}
            data={modifiedSummary}
            items={items}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isPaginated={false}
          />
          {response.merchantFees &&
            response.merchantFees.map((data) => (
              <>
                TBF with customer ({data.currency})
                <Table
                  columns={processorColumns}
                  handleTableChange={handleTableChange}
                  isFetching={isFetching}
                  data={data.collapsed}
                  items={items}
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                  isPaginated={false}
                />
              </>
            ))}
          TBF with customer (Summary)
          <Table
            columns={processorColumns}
            handleTableChange={handleTableChange}
            isFetching={isFetching}
            data={response.merchantFeesSumm}
            items={items}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isPaginated={false}
          />
          {response.bankFees &&
            response.bankFees.map((data) => (
              <>
                Decta with TBF({data.currency})
                <Table
                  columns={bankColumnsForCurrency}
                  handleTableChange={handleTableChange}
                  isFetching={isFetching}
                  data={data.collapsed}
                  items={items}
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                  isPaginated={false}
                />
              </>
            ))}
          Decta with TBF (Summary)
          <Table
            columns={bankColumns}
            handleTableChange={handleTableChange}
            isFetching={isFetching}
            data={response.merchantFeesSumm}
            items={items}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isPaginated={false}
          />
        </>
      )}
    </>
  );
};
export default TransactionAndCommission;
