import { Card, Descriptions, Alert, Divider } from "antd";
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

const RateDetail = () => {
  let history = useParams();

  const {
    data: gateway,
    status,
    error,
  } = useQuery(["gateway", history.id], () =>
    terminalsAPI.getTerminal(history.id)
  );

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
      <Descriptions
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        bordered
        size="small"
      >
        <Descriptions.Item span={3} label="GUID">
          {gateway.guid}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {gateway.description}
        </Descriptions.Item>
        <Descriptions.Item label="Created at">
          {formatDate(gateway.created_at)}
        </Descriptions.Item>
        <Descriptions.Item label="Created by">
          {gateway.created_by_username}
        </Descriptions.Item>
        <Descriptions.Item label="Updated at">
          {formatDate(gateway.updated_at) || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Updated by">
          {gateway.updated_by_username || "-"}
        </Descriptions.Item>
      </Descriptions>

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
export default RateDetail;
