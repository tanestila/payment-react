import { useState } from "react";
import "antd/dist/antd.css";
import { Table, Space } from "antd";
import { MerchantType } from "../../types/merchants";
import { IResponse } from "../../types/common";
import { useQuery } from "react-query";
import { merchantAPI } from "../../services/queries/management/merchant";
import { Link } from "react-router-dom";
import Form from "./Form";

// interface AppListProps {
//   // form: WrappedFormUtils;
// }

export default function Partners() {
  const [page, setpage] = useState(1);
  const [items, setitems] = useState(10);
  const [sortField, setsortField] = useState();
  const [sortOrder, setsortOrder] = useState();
  const [search, setSearch] = useState({});

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    // isPreviousData,
  } = useQuery<IResponse<MerchantType>, Error>(
    ["merchants", page, items, sortField, sortOrder, search],
    () =>
      merchantAPI.getMerchants({
        page,
        items,
        sort_col: sortOrder && sortField,
        sort_dir: sortOrder
          ? sortOrder === "ascend"
            ? false
            : true
          : undefined,
        ...search,
      }),
    {
      keepPreviousData: true,
    }
  );

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setpage(pagination.current);
    // setitems()
    setsortField(sorter.field);
    setsortOrder(sorter.order);
  };

  const onSearch = (params: any) => {
    setSearch({ ...params });
  };

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
    <div>
      <Form onSearch={onSearch} />
      <Table
        dataSource={data?.data}
        columns={columns}
        size="small"
        onChange={handleTableChange}
        pagination={{
          total: parseInt(data?.count!, 10),
          position: ["bottomLeft"],
        }}
        loading={isFetching}
      />
    </div>
  );
}
