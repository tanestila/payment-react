import { useState } from "react";
import { ReportForm } from "../ReportForm";

import { Card, Tabs } from "antd";
import { Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";

import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import Table from "../../../Components/TableFactory/Table";
import Loading from "../../../Components/Common/Loading/MainLoading";
import moment from "moment";
import { histogramReportAPI } from "../../../services/queries/report/histogramReport";

const columnsSummary = [
  {
    title: "Week day",
    dataIndex: "week_day",
    key: "week_day",
  },
  {
    title: "Day hour",
    dataIndex: "day_hour",
    key: "day_hour",
  },
  {
    title: "Transaction count",
    dataIndex: "transaction_count",
    key: "transaction_count",
  },
];

const Histogram = () => {
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
    "histogram",
    () => histogramReportAPI.get({ ...data }),
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
            data={response}
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
export default Histogram;
