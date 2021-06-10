import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import Loading from "../Common/Loading";

type DataType = {
  data: Array<any>,
  count: string,
};

type TablePropsType = {
  handleTableChange: any,
  columns: any,
  data: DataType,
  items: number,
  isFetching: boolean,
  isLoading: boolean,
  isError: boolean,
  error: any,
  isPaginated?: boolean,
  // rowKey?: any,
};

export default function TableFactory({
  handleTableChange,
  columns,
  data = { data: [], count: "0" },
  items,
  isFetching,
  isLoading,
  isPaginated = true,
  isError,
  error,
}: // rowKey,
TablePropsType) {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <span>Error: {error && error.message}</span>
      ) : (
        <Table
          dataSource={isPaginated ? data.data || [] : data}
          columns={columns}
          size="small"
          onChange={handleTableChange}
          pagination={
            isPaginated && {
              total: parseInt(data.count, 10),
              position: ["bottomLeft"],
              pageSize: items,
            }
          }
          bordered
          loading={isFetching}
          // rowKey={(record) => (rowKey ? record[rowKey] : record.guid)}
        />
      )}
    </>
  );
}
