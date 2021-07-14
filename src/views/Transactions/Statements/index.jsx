import { Link } from "react-router-dom";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { cutGuid } from "../../../helpers/cutGuid";
import { statementsAPI } from "../../../services/queries/management/statements";
import { Badge } from "react-bootstrap";
import { Can, AbilityContext } from "../../../Components/Common/Can";
import React, { useContext } from "react";
import { Button } from "antd";

export default function Statements() {
  const ability = useContext(AbilityContext);
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
  } = useTableQuery("statements", statementsAPI.getStatements);

  const columns = [
    {
      title: "ID",
      dataIndex: "guid",
      key: "guid",
      render: (text: any, record: any) => (
        <>
          {/* <Copy text={transaction.guid} /> */}
          <Link className="link" to={`/about/statement/${text}`}>
            {cutGuid(text)}
          </Link>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Merchant",
      dataIndex: "merchant_name",
      key: "merchant_name",
      sorter: true,
      render: (text: string, record: any) => (
        <Link className="link" to={`/about/merchant/${record.merchant_guid}`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Group",
      dataIndex: "group_name",
      key: "group_name",
      sorter: true,
      render: (text: string, record: any) => (
        <Link className="link" to={`/about/group/${record.group_guid}`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Currency",
      dataIndex: "statement_currency_code",
      key: "statement_currency_code",
      sorter: true,
    },
    {
      title: "Summary amount",
      dataIndex: "summary_amount",
      key: "summary_amount",
      sorter: true,
    },
    {
      title: "Summary count",
      dataIndex: "summary_count",
      key: "summary_count",
      sorter: true,
    },
    {
      title: "Statement status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (text: string, record: any) => (
        <Badge
          className={`badge-statement-${text.replace(" ", "").toLowerCase()}`}
        >
          {text}
        </Badge>
      ),
    },
    {
      title: "Parent",
      dataIndex: "parent_name",
      key: "parent_name",
      sorter: true,
      render: (text: string, record: any) => (
        <Link className="link" to={`/about/statement/${record.parent_guid}`}>
          {text}
        </Link>
      ),
    },
    {
      title: "From date",
      dataIndex: "from_date",
      key: "from_date",
      sorter: true,
    },
    {
      title: "To date",
      dataIndex: "to_date",
      key: "to_date",
      sorter: true,
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      sorter: true,
      render: () => <>edit</>,
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
      rowClassName={(record) => {
        console.log(record);
        return record.merge_statement_flag ? "colored" : undefined;
      }}
      modalComponent={
        <React.Fragment
          allowed={
            ability.can("EXECUTE", "STATEMENTS") ||
            ability.can("EXECUTE", "MERGESTATEMENTS")
          }
        >
          <Can do="EXECUTE" on="STATEMENTS">
            <Link to="/interim/statement">
              <Button>Interim statement</Button>
            </Link>
          </Can>
          <Can do="EXECUTE" on="MERGESTATEMENTS">
            <Link to="/payable/statement">
              <Button>Payable statement</Button>
            </Link>
          </Can>
        </React.Fragment>
      }
    />
  );
}
