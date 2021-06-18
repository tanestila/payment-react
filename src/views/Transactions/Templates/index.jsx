import { transactionsAPI } from "../../../services/queries/management/transactions/processing";
import { Link } from "react-router-dom";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { Space } from "antd";
import { cutGuid } from "../../../helpers/cutGuid";
import { Copy } from "../../../Components/Common/CopyToClipboard";

export default function Templates() {
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
  } = useTableQuery("transactions", transactionsAPI.getTransactions);

  const columns = [
    {
      title: "ID",
      dataIndex: "guid",
      key: "guid",
      render: (text: any, record: any) => (
        <>
          <Copy text={text} />
          <Link className="link" to={`/about/processing/${text}`}>
            {cutGuid(text)}
          </Link>
        </>
      ),
    },
    {
      title: "Type",
      dataIndex: "transaction_type",
      key: "transaction_type",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any, record: any) => (
        <i
          className={
            text === "Success"
              ? "icon-success icon green"
              : text === "Failed"
              ? "icon-failed icon red"
              : "far fa-pause-circle icon orange"
          }
        />
      ),
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (text: any, record: any) => (
        <i
          className={text ? "icon-success icon green" : "icon-failed icon red"}
        />
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      sorter: true,
    },
    {
      title: "Shop",
      dataIndex: "shop_name",
      key: "shop_name",
      sorter: true,
    },
    {
      title: "Terminal",
      dataIndex: "terminal_name",
      key: "terminal_name",
      sorter: true,
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },
    // ability.can("READ", "TRANSACTIONSPROCESSINGRATES") &&
    {
      title: "Rates",
      dataIndex: "rates",
      key: "rates",
      // render: (text: any, record: any) => (
      //   <button type="button" className="btn btn-table">
      //     Show
      //   </button>
      // ),
    },
    {
      title: "Status",
      dataIndex: "enabled",
      key: "enabled",
      search: "bool",
      render: (text: any, record: any) => (
        <i
          className={
            record.enabled ? "icon-success green icon" : "icon-failed red icon"
          }
        />
      ),
    },
    {
      title: "Action",
      key: "action",

      render: (text: any, record: any) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
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
