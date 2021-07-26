import { Card, Descriptions, Alert, Divider, Row, Button } from "antd";
import Table from "../../../../Components/TableFactory/Table";
import { useQuery } from "react-query";
import { ratesAPI } from "../../../../services/queries/management/rates";
import { useParams } from "react-router-dom";
import useTableQuery from "../../../../Components/TableFactory/useTableQuery";
import { Loading } from "../../../../Components/Common";
import { formatDate } from "../../../../helpers/formatDate";
import CustomModal from "../../../../Components/Common/Modal";
import RevisionCreator from "./Revisions/Creator";

const columns = [
  {
    title: "Transaction type",
    key: "transaction_type",
    dataIndex: "transaction_type",
  },
  {
    title: "Transaction status",
    key: "transaction_status",
    dataIndex: "transaction_status",
  },
  {
    title: "card_schema",
    key: "card_schema",
    dataIndex: "card_schema",
  },
  {
    title: "card_region",
    key: "card_region",
    dataIndex: "card_region",
  },
  {
    title: "card_type",
    key: "card_type",
    dataIndex: "card_type",
  },
  {
    title: "plain fee",
    key: "plain",
    dataIndex: "plain",
    render: (plain) => (plain ? "fixed" : "%"),
  },
  {
    title: "buy",
    key: "buy",
    dataIndex: "buy",
  },
  {
    title: "sell",
    key: "sell",
    dataIndex: "sell",
  },
];

const RevisionDetail = () => {
  let history = useParams();

  const {
    isFetching,
    isLoading,
    isError,
    status,
    error,
    data,
    items,
    handleTableChange,
  } = useTableQuery(
    "rate-revisions",
    (args) => ratesAPI.getRateRevisions(history.id, args),
    false,
    10,
    [history.id]
  );
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    let errorObj = error;
    return (
      <Alert
        message="Error"
        description={errorObj.message}
        type="error"
        showIcon
      />
    );
  }
  return (
    <Card title={`Revision ${history.id}`}>
      <Table
        columns={columns}
        handleTableChange={handleTableChange}
        isFetching={isFetching}
        data={data}
        items={items}
        isLoading={isLoading}
        isError={isError}
        error={error}
        isPaginated={false}
      />
    </Card>
  );
};
export default RevisionDetail;
