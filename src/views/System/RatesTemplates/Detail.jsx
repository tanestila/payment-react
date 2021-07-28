import { Card, Button, Alert } from "antd";
import { useContext } from "react";
import Table from "../../../Components/TableFactory/Table";
import { useParams } from "react-router-dom";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { Loading } from "../../../Components/Common";
import { ratesAPI } from "../../../services/queries/management/rates";
import CustomModal from "../../../Components/Common/Modal";
import FeeCreator from "./Fee/Creator";
import { AbilityContext } from "../../../Components/Common/Can";

const RateTemplateDetail = () => {
  let history = useParams();
  const ability = useContext(AbilityContext);
  const {
    isFetching,
    isLoading,
    isError,
    error,
    status,
    data,
    items,
    handleTableChange,
  } = useTableQuery(
    "rate-template-fees",
    () => ratesAPI.getRateTemplateFees(history.id),
    true,
    100,
    [history.id]
  );

  const terminalsColumns = [
    {
      title: "transaction_type",
      key: "transaction_type",
      dataIndex: "transaction_type",
    },
    {
      title: "transaction_status",
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
      title: "plain",
      key: "plain",
      dataIndex: "plain",
    },
    ability.can("DELETE", "RATES") && {
      title: "delete",
      key: "delete",
      dataIndex: "delete",
    },
  ];

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
    <Card title={`Template fees`}>
      <CustomModal
        header="Create fee"
        content={FeeCreator}
        contentProps={{ guid: history.id }}
        button={<Button>Create fee</Button>}
        // dialogClassName="modal-creator"
      />
      <Table
        columns={terminalsColumns}
        handleTableChange={handleTableChange}
        isFetching={isFetching}
        data={data}
        items={items}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </Card>
  );
};
export default RateTemplateDetail;
