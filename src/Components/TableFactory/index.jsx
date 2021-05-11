import { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import Form from "./Form";
import "antd/dist/antd.css";
import { SearchOutlined } from "@ant-design/icons";
import ButtonFilter from "./Button";

export default function TableFactory({
  onSearch,
  search,
  handleTableChange,
  columns,
  data = {},
  items,
  isFetching,
  modalComponent,
  isLoading,
  isError,
  error,
}) {
  const [isShowFrom, showForm] = useState(false);

  function handleSearch(electedKeys, dataIndex, confirm = () => {}) {
    confirm();
    onSearch({ ...search, [dataIndex]: electedKeys });
  }

  function handleReset(clearFilters, dataIndex) {
    let params = { ...search };
    delete params[dataIndex];
    onSearch({ ...params });
    clearFilters();
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
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
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
  });

  const getColumnBoolSearchProps = (dataIndex) => ({
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

  const columnsWithSearch = columns.map((col) => {
    if (!col.search) return { ...col, ...getColumnSearchProps(col.dataIndex) };
    else {
      switch (col.search) {
        case "bool":
          return { ...col, ...getColumnBoolSearchProps(col.dataIndex) };

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
          <ButtonFilter />
        </div>

        <div className="secondary-buttons"></div>
      </div>
      <div style={{ overflowX: "auto", width: "100%", minHeight: "300px" }}>
        {isShowFrom && <Form onSearch={onSearch} />}
        <Button
          onClick={() => showForm(!isShowFrom)}
          style={{ marginBottom: "15px" }}
        >
          SearchForm
        </Button>

        {isLoading ? (
          "Loading..."
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
