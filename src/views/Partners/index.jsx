import { useState } from "react";

import { useQuery } from "react-query";
import { merchantAPI } from "../../services/queries/management/merchant";
import { Link } from "react-router-dom";
import Table from "../../Components/TableFactory";
import useTableQuery from "../../Components/TableFactory/useTableQuery";
import { Space } from "antd";

export default function Partners() {
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
  } = useTableQuery("merchants", merchantAPI.getMerchants);

  const columns = [
    {
      title: "Merchant name",
      dataIndex: "merchant_name",
      key: "merchant_name",
      sorter: true,
      render: (text: any) => (
        <Link className="link" to={`/about/merchant/${text}`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Merchant type",
      dataIndex: "merchant_type",
      key: "merchant_type",
      sorter: true,
    },
    {
      title: "Group",
      dataIndex: "group_name",
      key: "group_name",
      sorter: true,
    },
    {
      title: "Partner",
      dataIndex: "partner_name",
      key: "partner_name",
      sorter: true,
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
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
}
