import { useState } from "react";
import { ReportForm } from "../ReportForm";

import { useQuery } from "react-query";
import { basicReportAPI } from "../../../services/queries/report/basicReport";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import Table from "../../../Components/TableFactory/Table";
import Loading from "../../../Components/Common/Loading/MainLoading";
import moment from "moment";
import { errorReportAPI } from "../../../services/queries/report/errorReport";
import { ErrorsBarChart } from "./components/ErrorsBarChart";
import { ErrorsPieChart } from "./components/ErrorsPieChart";
import { PassabilityPieChart } from "./components/PassabilityPieChart";

const columns = [
  {
    title: "err_code code",
    key: "err_code",
    dataIndex: "err_code",
  },
  {
    title: "err_count code",
    key: "err_count",
    dataIndex: "err_count",
  },
  {
    title: "err_message code",
    key: "err_message",
    dataIndex: "err_message",
  },
];

const Error = () => {
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
    status,
    items,
    handleTableChange,
  } = useTableQuery(
    "error-report",
    () => errorReportAPI.get({ ...data }),
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

  const {
    data: passability,
    status: passabilityStatus,
    isFetching: passabilityIsFetching,
  } = useQuery(
    [
      "transaction-types",
      data.partner_guid_array,
      data.group_guid_array,
      data.merchant_guid_array,
      data.shop_guid_array,
      data.terminal_guid_array,
      data.from_date,
      data.to_date,
    ],
    () => basicReportAPI.getTransactionTypes({ ...data })
  );

  return (
    <>
      <ReportForm handleSubmit={handleSubmit} />
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <>
          <ErrorsPieChart
            response={response}
            status={status}
            isFetching={isFetching}
          />
          <PassabilityPieChart
            response={passability}
            status={passabilityStatus}
            isFetching={passabilityIsFetching}
          />
          <ErrorsBarChart
            response={response}
            status={status}
            isFetching={isFetching}
          />
          Summary
          <Table
            columns={columns}
            handleTableChange={handleTableChange}
            isFetching={isFetching}
            data={response.data}
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
export default Error;
