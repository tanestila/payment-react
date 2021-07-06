import { Card, Descriptions, Divider, Alert, Button, Row } from "antd";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AbilityContext } from "../../Components/Common/Can";
import useTableQuery from "../../Components/TableFactory/useTableQuery";
import { shopsAPI } from "../../services/queries/management/shops";
import { auditAPI } from "../../services/queries/audit";
import Table from "../../Components/TableFactory/Table";
import {
  useShopsAuditColumns,
  useTerminalsColumns,
} from "../../constants/columns";
import { formatDate } from "../../helpers/formatDate";
import { Loading } from "../../Components/Common";
import CustomModal from "../../Components/Common/Modal";
import TerminalCreator from "../Terminals/Creator";

export default function ShopDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();

  const {
    data: shop,
    status,
    error,
  } = useQuery(["shop", history.id], () => shopsAPI.getShop(history.id));

  const {
    isFetching: isFetchingTerminals,
    isLoading: isLoadingTerminals,
    isError: isErrorTerminals,
    error: merchantTerminalsError,
    data: merchantTerminals,
    items: merchantTerminalsItems,
    handleTableChange: handleTerminalsTableChange,
  } = useTableQuery(
    "shop-terminals",
    (params: any) => shopsAPI.getShopTerminals(history.id, params),
    false,
    10,
    [history.id]
  );
  const {
    isFetching: isFetchingShopHistory,
    isLoading: isLoadingShopHistory,
    isError: isErrorShopHistory,
    error: merchantHistoryError,
    data: merchantHistory,
    items: merchantHistoryItems,
    handleTableChange: handleShopHistoryTableChange,
  } = useTableQuery(
    "shop-history",
    (params: any) => auditAPI.getShopsHistory({ guid: history.id, ...params }),
    false,
    10,
    [history.id]
  );

  const historyColumns = useShopsAuditColumns(ability);
  const terminalsColumns = useTerminalsColumns(ability);

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
      <Card title={`Shop detail ${shop.name}`}>
        <Descriptions
          column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          bordered
          size="small"
        >
          <Descriptions.Item span={3} label="GUID">
            {shop.guid}
          </Descriptions.Item>
          <Descriptions.Item label="name">{shop.name}</Descriptions.Item>
          <Descriptions.Item label="Display name">
            {shop.display_name}
          </Descriptions.Item>
          <Descriptions.Item label="Risk category">
            {shop.risk_category}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{shop.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{shop.phone}</Descriptions.Item>
          <Descriptions.Item label="Url">
            {shop.url?.join(", ")}
          </Descriptions.Item>
          <Descriptions.Item label="Merchant">
            {shop.merchant_name}
          </Descriptions.Item>
          <Descriptions.Item label="note">{shop.note}</Descriptions.Item>
          <Descriptions.Item label="Created at">
            {formatDate(shop.created_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Created by">
            {shop.created_by_username}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {formatDate(shop.updated_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {shop.updated_by_username}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <h5>Terminals</h5>
        <Table
          columns={terminalsColumns}
          handleTableChange={handleTerminalsTableChange}
          isFetching={isFetchingTerminals}
          data={merchantTerminals}
          items={merchantTerminalsItems}
          isLoading={isLoadingTerminals}
          isError={isErrorTerminals}
          error={merchantTerminalsError}
        />
        <Row justify="center">
          <CustomModal
            header="Create Login"
            content={TerminalCreator}
            contentProps={{ guid: shop.guid }}
            button={<Button>Create terminal</Button>}
            // dialogClassName="modal-creator"
          />
        </Row>
        <Divider />
        <h5>Change history</h5>
        <Table
          columns={historyColumns}
          handleTableChange={handleShopHistoryTableChange}
          isFetching={isFetchingShopHistory}
          data={merchantHistory}
          items={merchantHistoryItems}
          isLoading={isLoadingShopHistory}
          isError={isErrorShopHistory}
          error={merchantHistoryError}
        />
      </Card>
    </>
  );
}
