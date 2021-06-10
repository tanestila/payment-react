import { Link } from "react-router-dom";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { Space } from "antd";
import { cutGuid } from "../../../helpers/cutGuid";
import { chargebacksAPI } from "../../../services/queries/management/transactions/chargebacks";

export default function MismatchTransaction() {
  const {
    isLoading,
    isError,
    error,
    data,
    items,
    search,
    isFetching,
    handleTableChange,
    onSearch,
  } = useTableQuery("mismatch_transaction", chargebacksAPI.getChargebacks);

  const columns = [
    {
      title: "Chargeback ID",
      dataIndex: "guid",
      key: "guid",
      render: (text: any, record: any) => (
        <>
          {/* <Copy text={transaction.guid} /> */}
          <Link className="link" to={`/about/processing/${text}`}>
            {cutGuid(text)}
          </Link>
        </>
      ),
    },
    {
      title: "Payment ID",
      dataIndex: "payment_id",
      key: "payment_id",
      sorter: true,
    },
    {
      title: "Card number",
      dataIndex: "card_number",
      key: "card_number",
      sorter: true,
      render: (text: string, record: any) =>
        text.substr(0, 4) + "****" + text.substr(text.length - 4, 4),
    },
    {
      title: "Card schema",
      dataIndex: "card_schema",
      key: "card_schema",
      sorter: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
    },
    {
      title: "Currency",
      dataIndex: "currency_code",
      key: "currency_code",
      sorter: true,
    },
    {
      title: "Card number decta",
      dataIndex: "card_number_decta",
      key: "card_number_decta",
      sorter: true,
      render: (text: string, record: any) =>
        text.substr(0, 4) + "****" + text.substr(text.length - 4, 4),
    },
    {
      title: "Card schema decta",
      dataIndex: "card_schema_decta",
      key: "card_schema_decta",
      sorter: true,
    },
    {
      title: "Amount decta",
      dataIndex: "amount_decta",
      key: "amount_decta",
      sorter: true,
    },
    {
      title: "Currency decta",
      dataIndex: "currency_code_decta",
      key: "currency_code_decta",
      sorter: true,
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
    },
  ];

  return (
    <Table
      columns={columns}
      handleTableChange={handleTableChange}
      onSearch={onSearch}
      search={search}
      isFetching={isFetching}
      data={data}
      items={items}
    />
  );
}
