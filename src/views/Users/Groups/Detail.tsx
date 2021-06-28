import { Card, Descriptions, Divider, Typography, Button, Row } from "antd";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AbilityContext } from "../../../Components/Common/Can";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { auditAPI } from "../../../services/queries/audit";

import Table from "../../../Components/TableFactory/Table";
import {
  useLoginColumns,
  useShopsColumns,
  useMerchantAuditColumns,
  useGroupsMerchantsColumns,
} from "../../../constants/columns";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { formatDate } from "../../../helpers/formatDate";
const { Text } = Typography;

export default function GroupDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();

  const {
    data: group,
    status,
    error,
  } = useQuery([`group-${history.id}`], () => groupsAPI.getGroup(history.id), {
    keepPreviousData: true,
  });

  const {
    // status: loginsStatus,
    isFetching: isFetchingLogins,
    isLoading: isLoadingLogins,
    isError: isErrorLogins,
    error: loginsError,
    data: logins,
    items: loginsItems,
    handleTableChange: handleLoginsTableChange,
  } = useTableQuery(
    "group-logins",
    (params: any) => groupsAPI.getGroupLogins(history.id, { params }),
    false,
    10
  );

  const {
    // status: loginsStatus,
    isFetching: isFetchingMerchants,
    isLoading: isLoadingMerchants,
    isError: isErrorMerchants,
    error: merchantsError,
    data: merchants,
    items: merchantsItems,
    handleTableChange: handleMerchantsTableChange,
  } = useTableQuery(
    "group-merchants",
    (params: any) => groupsAPI.getGroupMerchants(history.id, { params }),
    false,
    10
  );

  const {
    // status: shopsStatus,
    isFetching: isFetchingShops,
    isLoading: isLoadingShops,
    isError: isErrorShops,
    error: shopsError,
    data: shops,
    items: shopsItems,
    handleTableChange: handleShopsTableChange,
  } = useTableQuery(
    "group-shops",
    (params: any) => groupsAPI.getGroupShops(history.id, { params }),
    false
  );

  const {
    // status: merchantHistoryStatus,
    isFetching: isFetchingMerchantHistory,
    isLoading: isLoadingMerchantHistory,
    isError: isErrorMerchantHistory,
    error: merchantHistoryError,
    data: merchantHistory,
    items: merchantHistoryItems,
    handleTableChange: handleMerchantHistoryTableChange,
  } = useTableQuery(
    "group-history",
    (params: any) => auditAPI.getGroupsHistory({ guid: history.id, ...params }),
    false,
    10
  );

  const merchantsColumns = useGroupsMerchantsColumns(ability);

  const loginsColumns = useLoginColumns(ability);

  const historyColumns = useMerchantAuditColumns(ability);

  const shopsColumns = useShopsColumns(ability);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    let errorObj = error as any;
    return <span>Error: {errorObj.message}</span>;
  }

  return (
    <>
      <Card title={`Group detail ${group.group_name}`}>
        <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
          <Descriptions.Item span={3} label="GUID">
            {group.group_guid}
          </Descriptions.Item>
          <Descriptions.Item label="Group type">
            {group.group_type}
          </Descriptions.Item>
          <Descriptions.Item label="Group name">
            {group.group_name}
          </Descriptions.Item>
          <Descriptions.Item label="Partner">
            {group.partner_name}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {formatDate(group.created_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Created by">
            {group.created_by_username}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {formatDate(group.updated_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {group.updated_by_username}
          </Descriptions.Item>
        </Descriptions>
        <Divider />

        <h5>Merchants</h5>
        <Table
          columns={merchantsColumns}
          handleTableChange={handleMerchantsTableChange}
          isFetching={isFetchingMerchants}
          data={merchants}
          items={merchantsItems}
          isLoading={isLoadingMerchants}
          isError={isErrorMerchants}
          error={merchantsError}
        />
        <Row justify="center">
          <Button style={{ margin: "10px auto" }}>Add login</Button>
        </Row>

        <Divider />

        <h5>Logins</h5>
        <Table
          columns={loginsColumns}
          handleTableChange={handleLoginsTableChange}
          isFetching={isFetchingLogins}
          data={logins}
          items={loginsItems}
          isLoading={isLoadingLogins}
          isError={isErrorLogins}
          error={loginsError}
        />
        <Row justify="center">
          <Button style={{ margin: "10px auto" }}>Add login</Button>
        </Row>

        <Divider />
        <h5>Shops</h5>
        <Table
          columns={shopsColumns}
          handleTableChange={handleShopsTableChange}
          isFetching={isFetchingShops}
          data={shops}
          items={shopsItems}
          isLoading={isLoadingShops}
          isError={isErrorShops}
          error={shopsError}
        />

        <Divider />
        <h5>Change history</h5>
        <Table
          columns={historyColumns}
          handleTableChange={handleMerchantHistoryTableChange}
          isFetching={isFetchingMerchantHistory}
          data={merchantHistory}
          items={merchantHistoryItems}
          isLoading={isLoadingMerchantHistory}
          isError={isErrorMerchantHistory}
          error={merchantHistoryError}
        />
      </Card>
    </>
  );
}
