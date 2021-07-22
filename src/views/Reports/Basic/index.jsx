import { useState } from "react";
import { useQuery } from "react-query";
import { LineChart } from "../../../Components/Common/Charts/LineChart";
import { basicReportAPI } from "../../../services/queries/report/basicReport";
import { ReportForm } from "../ReportForm";
import { TransactionHistoryLineChart } from "./components/TransactionHistoryLineChart";

const BasicReport = () => {
  const [data, setData] = useState({});

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
