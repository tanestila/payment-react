import { ordersAPI } from "../../../../services/queries/report/orders";
import useTableQuery from "../../../../Components/TableFactory/useTableQuery";
import Table from "../../../../Components/TableFactory/Table";
import { formatDateForTable } from "../../../../helpers/formatDate";

const columns = [
  { title: "guid", dataIndex: "guid", key: "guid" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text: string) => formatDateForTable(text),
  },
  { title: "Type", dataIndex: "type", key: "type" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  { title: "Currency", dataIndex: "currency", key: "currency" },
  { title: "Card", dataIndex: "card_number", key: "card_number" },
  { title: "Card schema", dataIndex: "card_schema", key: "card_schema" },
  { title: "Card holder", dataIndex: "card_holder", key: "card_holder" },
  { title: "Description", dataIndex: "description", key: "description" },
];

export const Orders = ({ data }) => {
  const {
    isFetching,
    isLoading,
    isError,
    error,
    data: response,
    items,
    handleTableChange,
  } = useTableQuery(
    "orders",
    () => ordersAPI.getOrders({ ...data }),
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
