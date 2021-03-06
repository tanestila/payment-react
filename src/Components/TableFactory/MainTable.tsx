import { useContext, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchForm } from "./Form";
import "antd/dist/antd.css";
import { SearchOutlined } from "@ant-design/icons";
import { ButtonFilter } from "./Button";
import Loading from "../Common/Loading/MainLoading";
import { useQuery } from "react-query";
import { gatewaysAPI } from "../../services/queries/management/gateways";
import { AbilityContext } from "../Common/Can";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Export } from "./Export";

type DataType = {
  data: Array<any>;
  count: string;
};

type TablePropsType = {
  onSearch: Function;
  // search: any;
  handleTableChange: any;
  columns: any;
  data: DataType;
  // items: number;
  isFetching: boolean;
  modalComponent?: any;
  isLoading: boolean;
  isError: boolean;
  error: any;
  searchQuery?: any;
  rowKey?: any;
  status: string;
  rowClassName?: any;
};

export default function TableFactory({
  onSearch,
  // search,
  handleTableChange,
  columns,
  data = { data: [], count: "0" },
  // items,
  isFetching,
  modalComponent,
  isLoading,
  isError,
  error,
  searchQuery = {},
  status,
  rowClassName,
}: TablePropsType) {
  const ability = useContext(AbilityContext);
  const [isShowFrom, showForm] = useState(false);
  const { data: gateways } = useQuery(
    ["gateways-for-table-search"], // bc if we load gateways with 'gateway' key, table will rerender after every load
    () => gatewaysAPI.getGateways(),
    {
      keepPreviousData: true,
      enabled: ability.can("READ", "GATEWAYS") && !!searchQuery.gateways,
      refetchOnWindowFocus: false,
    }
  );

  const { page, items, search, sort } = useSelector(({ table }) => {
    return {
      page: table.page,
      items: table.items,
      search: table.search,
      sort: table.sort,
    };
  });

  function handleSearch(
    selectedKeys: string,
    dataIndex: string,
    confirm: Function
  ) {
    confirm();
    onSearch({ ...search, [dataIndex]: selectedKeys });
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
          onPressEnter={() => handleSearch(selectedKeys[0], dataIndex, confirm)}
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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : "" }} />
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
      ? gateways.data.map((g: any) => ({
          text: g.name,
          value: g.name,
        }))
      : [];
    return {
      filters: gatewaysSearchParams,
      filterMultiple: true,
    };
  };

  const columnsWithSearch = columns
    .map((col: any) => {
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
    })
    .map((c: any) => {
      let column = { ...c };
      if (search[c.dataIndex])
        column = { ...column, filteredValue: [search[c.dataIndex]] };
      if (sort.field === c.dataIndex)
        column = { ...column, sortOrder: sort.order };
      return column;
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

        <div className="secondary-buttons">
          <Export data={data.data || []} columns={columns} name={"name"} />
        </div>
      </div>
      {/* ?????????????? ?????????? ???????? ???????? ???????????? ???????????? ?????????? ??????????????  */}
      <div style={{ overflowX: "auto", width: "100%", minHeight: "300px" }}>
        {isShowFrom && (
          <SearchForm onSearch={onSearch} columns={columns} search={search} />
        )}
        {/* {console.log(status)} */}
        {isLoading || status === "loading" ? (
          <Loading />
        ) : isError || status === "error" ? (
          <span>Error: {error && error.message}</span>
        ) : (
          <Table
            // scroll={{ x: "100%", y: "100%" }}
            dataSource={data.data || []}
            columns={columnsWithSearch}
            size="small"
            onChange={handleTableChange}
            pagination={{
              total: parseInt(data.count, 10),
              position: ["bottomLeft"],
              pageSize: items,
              current: page,
            }}
            bordered
            loading={isFetching}
            rowKey={() => uuidv4()}
            rowClassName={rowClassName}
          />
        )}
      </div>
    </div>
  );
}
