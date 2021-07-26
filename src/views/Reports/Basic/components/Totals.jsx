import { basicReportAPI } from "../../../../services/queries/report/basicReport";
import useTableQuery from "../../../../Components/TableFactory/useTableQuery";
import Table from "../../../../Components/TableFactory/Table";

const columns = [
  { title: "Currency", dataIndex: "currency", key: "currency" },
  { title: "Transaction type", dataIndex: "type", key: "type" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  { title: "Count", dataIndex: "number", key: "number" },
];

export const Totals = ({ data }) => {
  const {
    isFetching,
    isLoading,
    isError,
    error,
    data: response,
    items,
    handleTableChange,
  } = useTableQuery(
    "totals",
    () => basicReportAPI.getTotals({ ...data }),
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
      <Table
        columns={columns}
        handleTableChange={handleTableChange}
        isFetching={isFetching}
        data={response}
        items={items}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </>
  );
};
