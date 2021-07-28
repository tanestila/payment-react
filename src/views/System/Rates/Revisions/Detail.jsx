import { Card, Descriptions, Alert, Divider, Row, Button } from "antd";
import { useContext } from "react";
// import Table from "../../../../Components/TableFactory/Table";
import { useQuery } from "react-query";
import { ratesAPI } from "../../../../services/queries/management/rates";
import { useParams } from "react-router-dom";
import useTableQuery from "../../../../Components/TableFactory/useTableQuery";
import { Loading } from "../../../../Components/Common";
import { formatDate } from "../../../../helpers/formatDate";
import CustomModal from "../../../../Components/Common/Modal";
import RevisionEditor from "./Editor";
import Table from "../../../../Components/TableFactory/MainTable";
import { AbilityContext } from "../../../../Components/Common/Can";

const columns = [
  {
    title: "Transaction type",
    key: "transaction_type",
    dataIndex: "transaction_type",
    search: "text",
  },
  {
    title: "Transaction status",
    key: "transaction_status",
    dataIndex: "transaction_status",
    search: "text",
  },
  {
    title: "card_schema",
    key: "card_schema",
    dataIndex: "card_schema",
    search: "text",
  },
  {
    title: "card_region",
    key: "card_region",
    dataIndex: "card_region",
    search: "text",
  },
  {
    title: "card_type",
    key: "card_type",
    dataIndex: "card_type",
    search: "text",
  },
  {
    title: "plain fee",
    key: "plain",
    dataIndex: "plain",
    render: (plain) => (plain ? "fixed" : "%"),
    search: "text",
  },
  {
    title: "buy",
    key: "buy",
    dataIndex: "buy",
    search: "text",
  },
  {
    title: "sell",
    key: "sell",
    dataIndex: "sell",
    search: "text",
  },
];

const RevisionDetail = () => {
  let history = useParams();
  const ability = useContext(AbilityContext);

  const {
    isFetching,
    isLoading,
    isError,
    status,
    error,
    data,
    onSearch,
    items,
    handleTableChange,
  } = useTableQuery(
    "rate-revision-fees",
    (args) => ratesAPI.getRateRevisionFees(history.rate_id, history.id, args),
    true,
    100,
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
        onSearch={onSearch}
        isFetching={isFetching}
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        status={status}
        modalComponent={
          <CustomModal
            allowed={ability.can("EXECUTE", "USERADMIN")}
            header="Edit fees"
            content={RevisionEditor}
            contentProps={{ guid: history.id, rate_guid: history.rate_id }}
            button={<Button>Edit fees</Button>}
            dialogClassName="modal-creator"
          />
        }
      />
    </Card>
  );
};
export default RevisionDetail;
