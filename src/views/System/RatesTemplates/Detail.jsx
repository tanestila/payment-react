import { Card, Button, Alert, Divider } from "antd";
import Table from "../../../Components/TableFactory/Table";
import { useQuery } from "react-query";
import { terminalsAPI } from "../../../services/queries/management/terminals";
import { useParams } from "react-router-dom";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { Loading } from "../../../Components/Common";
import { formatDate } from "../../../helpers/formatDate";

const terminalsColumns = [
  {
    title: "Currency",
    key: "name",
    dataIndex: "guid",
  },
  {
    title: "Shop",
    key: "shop_name",
    dataIndex: "shop_name",
  },
  {
    title: "Currency",
    key: "currency_code",
    dataIndex: "currency_code",
  },
  {
    title: "Enabled",
    key: "enabled",
    dataIndex: "enabled",
  },
];

const RateTemplateDetail = () => {
  let history = useParams();

  const {
    isFetching: isFetchingTerminals,
    isLoading: isLoadingTerminals,
    isError: isErrorTerminals,
    error: terminalsError,
    data: terminals,
    items: terminalsItems,
    handleTableChange: handleTerminalsTableChange,
  } = useTableQuery(
    "gateway-terminals",
    () => terminalsAPI.getGatewayTerminals(history.id),
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
    <Card title={`Connected terminals`}>
      <Button>Create</Button>

      <Divider />
      <Table
        columns={terminalsColumns}
        handleTableChange={handleTerminalsTableChange}
        isFetching={isFetchingTerminals}
        data={terminals}
        items={terminalsItems}
        isLoading={isLoadingTerminals}
        isError={isErrorTerminals}
        error={terminalsError}
        isPaginated={false}
      />
    </Card>
  );
};
export default RateTemplateDetail;
