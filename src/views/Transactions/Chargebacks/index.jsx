import { Link } from "react-router-dom";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { cutGuid } from "../../../helpers/cutGuid";
import { chargebacksAPI } from "../../../services/queries/management/transactions/chargebacks";

export default function Chargebacks() {
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
  } = useTableQuery("chargebacks", chargebacksAPI.getChargebacks);

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
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
    },
    {
      title: "Transaction ID",
      dataIndex: "transaction_processing_guid",
      key: "transaction_processing_guid",
      sorter: true,
      render: (text: any, record: any) => (
        <>
          {/* <Copy text={transaction.guid} /> */}
          <Link className="link" to={`/about/order/${text}`}>
            {cutGuid(text)}
          </Link>
        </>
      ),
    },
    {
      title: "Card type",
      dataIndex: "card_type",
      key: "card_type",
      sorter: true,
    },
    {
      title: "Reason code",
      dataIndex: "reason_code",
      key: "reason_code",
      sorter: true,
    },
    {
      title: "Merchant name",
      dataIndex: "merchant_name",
      key: "merchant_name",
      sorter: true,
      render: (text: any, record: any) => (
        <>
          {/* <Copy text={transaction.guid} /> */}
          <Link className="link" to={`/about/merchant/${text}`}>
            {cutGuid(text)}
          </Link>
        </>
      ),
    },
    {
      title: "Shop",
      dataIndex: "shop_name",
      key: "shop_name",
      sorter: true,
      render: (text: any, record: any) => (
        <>
          {/* <Copy text={transaction.guid} /> */}
          <Link className="link" to={`/about/shop/${text}`}>
            {cutGuid(text)}
          </Link>
        </>
      ),
    },
    {
      title: "Terminal",
      dataIndex: "terminal_guid",
      key: "terminal_guid",
      sorter: true,
      render: (text: any, record: any) => (
        <>
          {/* <Copy text={transaction.guid} /> */}
          <Link className="link" to={`/about/terminal/${text}`}>
            {cutGuid(text)}
          </Link>
        </>
      ),
    },
    {
      title: "Chargeback amount",
      dataIndex: "chb_amount",
      key: "chb_amount",
      sorter: true,
    },
    {
      title: "Chargeback process date",
      dataIndex: "chb_proc_date",
      key: "chb_proc_date",
      sorter: true,
    },
    {
      title: "Transaction amount",
      dataIndex: "tr_amount",
      key: "tr_amount",
      sorter: true,
    },
    {
      title: "Transaction process date",
      dataIndex: "tr_date_time",
      key: "tr_date_time",
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
