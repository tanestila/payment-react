import moment from "moment";
import { useState } from "react";
import { ReportForm } from "../ReportForm";
import { TransactionHistoryLineChart } from "./components/TransactionHistoryLineChart";

const BasicReport = () => {
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
    setData(data);
  };

  return (
    <>
      <ReportForm handleSubmit={handleSubmit} />
      <TransactionHistoryLineChart data={data} />
      Report Form TransactionsMain PassabilityMain CurrencyMain
      TransactionTypeMain PieChartCardsTypes Totals Shop Totals Orders
    </>
  );
};
export default BasicReport;
