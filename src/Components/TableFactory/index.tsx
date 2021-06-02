import React, { useContext, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import Form from "./Form";
import "antd/dist/antd.css";
import { SearchOutlined } from "@ant-design/icons";
import ButtonFilter from "./Button";
import Loading from "../Common/Loading";
import { ColumnsType } from "antd/lib/table";
import useGateways from "../Common/SearchSelect/Table/gateways";
import { useQuery } from "react-query";
import { gatewayAPI } from "../../services/queries/management/gateway";
import { AbilityContext } from "../Common/Can";

type DataType = {
  data: Array<any>;
  count: string;
};

type TablePropsType = {
  onSearch: Function;
  search: any;
  handleTableChange: any;
  columns: ColumnsType[];
  data: DataType;
  items: number;
  isFetching: boolean;
  modalComponent: any;
  isLoading: boolean;
  isError: boolean;
  error: any;
  searchQuery: any;
};

export default function TableFactory({
  onSearch,
  search,
  handleTableChange,
  columns,
  data = { data: [], count: "0" },
  items,
  isFetching,
  modalComponent,
  isLoading,
  isError,
  error,
  searchQuery = {},
}: TablePropsType) {
  const ability = useContext(AbilityContext);
  const [isShowFrom, showForm] = useState(false);
  const { data: gateways } = useQuery(
    ["gateways"],
    () => gatewayAPI.getGateways(),
    {
      keepPreviousData: true,
      enabled: ability.can("READ", "GATEWAYS") && !!searchQuery.gateways,
    }
  );

  function handleSearch(
    electedKeys: string,
    dataIndex: string,
    confirm: Function
  ) {
    confirm();
    onSearch({ ...search, [dataIndex]: electedKeys });
  }

  function handleReset(clearFilters: Function, dataIndex: string) {
    let params = { ...search };
    delete params[dataIndex];
    onSearch({ ...params });
    clearFilters();
  }

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, dataIndex, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, dataIndex, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
  });

  const getColumnBoolSearchProps = () => ({
    filters: [
      {
        text: "enabled",
        value: true,
      },
      {
        text: "disabled",
        value: false,
      },
    ],
    filterMultiple: false,
  });

  const getColumnGatewaysSearchProps = () => {
    let gatewaysSearchParams = gateways
      ? gateways.data.map((g) => ({
          text: g.name,
          value: g.name,
        }))
      : [];
    return {
      filters: gatewaysSearchParams,
      filterMultiple: true,
    };
  };

  const columnsWithSearch = columns.map((col: any) => {
    if (!col.search) return col;
    else {
      switch (col.search) {
        case "text":
          return { ...col, ...getColumnSearchProps(col.dataIndex) };
        case "bool":
          return { ...col, ...getColumnBoolSearchProps() };
        case "gateways":
          return { ...col, ...getColumnGatewaysSearchProps() };

        default:
          return col;
      }
    }
  });

  return (
    <div className="main-table">
      <div className="group-buttons">
        <div className="main-buttons">
          {modalComponent && modalComponent.props.allowed ? (
            <div> {modalComponent} </div>
          ) : null}
          <ButtonFilter handleClick={() => showForm(!isShowFrom)} />
        </div>

        <div className="secondary-buttons"></div>
      </div>
      <div style={{ overflowX: "auto", width: "100%", minHeight: "300px" }}>
        {isShowFrom && <Form onSearch={onSearch} columns={columns} />}

        {isLoading ? (
          <Loading />
        ) : isError ? (
          <span>Error: {error && error.message}</span>
        ) : (
          <div>
            <Table
              dataSource={data.data || []}
              columns={columnsWithSearch}
              size="small"
              onChange={handleTableChange}
              pagination={{
                total: parseInt(data.count, 10),
                position: ["bottomLeft"],
                pageSize: items,
              }}
              bordered
              loading={isFetching}
            />
          </div>
        )}
      </div>
    </div>
  );
}