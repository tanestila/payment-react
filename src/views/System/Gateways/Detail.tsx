import { Card, Descriptions, Alert } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { gatewaysAPI } from "../../../services/queries/management/gateways";
import { terminalsAPI } from "../../../services/queries/management/terminals";
import { formatDate } from "../../../helpers/formatDate";
import { Loading } from "../../../Components/Common";
import Table from "../../../Components/TableFactory/Table";
import { Row, Col } from "react-bootstrap";

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

export default function GatewayDetail() {
  let history = useParams<{ id: string }>();

  const {
    data: gateway,
    status,
    error,
  } = useQuery(["gateway", history.id], () =>
    gatewaysAPI.getGateway(history.id)
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

  const {
    isFetching: isFetchingProperties,
    isLoading: isLoadingProperties,
    isError: isErrorProperties,
    error: propertiesError,
    data: properties,
    items: propertiesItems,
    handleTableChange: handlePropertiesTableChange,
  } = useTableQuery(
    "gateway-properties",
    () => terminalsAPI.getGatewayTerminals(history.id),
    false,
    10,
    [history.id]
  );

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    let errorObj = error as any;
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
    <>
      <Row>
        <Col>
          <Card title={`Gateway detail ${gateway.name}`}>
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
          </Card>
        </Col>
        <Col>
          <Card title={`Connected terminals`}>
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
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          <Card title={`Properties`}>
            <Table
              columns={terminalsColumns}
              handleTableChange={handlePropertiesTableChange}
              isFetching={isFetchingProperties}
              data={properties}
              items={propertiesItems}
              isLoading={isLoadingProperties}
              isError={isErrorProperties}
              error={propertiesError}
              isPaginated={false}
            />
          </Card>
        </Col>
        <Col>
          <Card title={`Currencies`}>
            <Table
              columns={terminalsColumns}
              handleTableChange={false}
              isFetching={false}
              data={gateway?.currencies ?? []}
              items={100}
              isLoading={false}
              isError={false}
              error={false}
              isPaginated={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
