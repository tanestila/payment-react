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
} from "../../../constants/columns";
import { partnersAPI } from "../../../services/queries/management/users/partners";
import { formatDate } from "../../../helpers/formatDate";
const { Text } = Typography;

export default function PartnerDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();

  const {
    data: partner,
    status,
    error,
  } = useQuery(
    [`partner-${history.id}`],
    () => partnersAPI.getPartner(history.id),
    {
      keepPreviousData: true,
    }
  );

  const {
    // status: loginsStatus,
    isFetching: isFetchingGroups,
    isLoading: isLoadingGroups,
    isError: isErrorGroups,
    error: groupsError,
    data: groups,
    items: groupsItems,
    handleTableChange: handleGroupsTableChange,
  } = useTableQuery(
    "partner-groups",
    (params: any) => partnersAPI.getPartnerGroups(history.id, { params }),
    false,
    10
  );

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
    "partner-logins",
    (params: any) => partnersAPI.getPartnerLogins(history.id, { params }),
    false,
    10
  );

  const {
    // status: loginsStatus,
    isFetching: isFetchingShops,
    isLoading: isLoadingShops,
    isError: isErrorShops,
    error: shopsError,
    data: shops,
    items: shopsItems,
    handleTableChange: handleShopsTableChange,
  } = useTableQuery(
    "partner-shops",
    (params: any) => partnersAPI.getPartnerShops(history.id, { params }),
    false,
    10
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
    "partner-history",
    (params: any) =>
      auditAPI.getPartnersHistory({ guid: history.id, ...params }),
    false,
    10
  );

  const loginsColumns = useLoginColumns(ability);

  const shopsColumns = useShopsColumns(ability);

  const historyColumns = useMerchantAuditColumns(ability);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    let errorObj = error as any;
    return <span>Error: {errorObj.message}</span>;
  }

  return (
    <>
      <Card title={`Partner detail ${partner.partner_name}`}>
        <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
          <Descriptions.Item span={3} label="GUID">
            {partner.partner_guid}
          </Descriptions.Item>
          <Descriptions.Item label="Partner type">
            {partner.partner_type}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {formatDate(partner.created_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Created by">
            {partner.created_by_username}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {formatDate(partner.updated_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {partner.updated_by_username}
          </Descriptions.Item>
        </Descriptions>
        <Divider />

        <Text strong>Groups</Text>
        <Table
          columns={historyColumns}
          handleTableChange={handleGroupsTableChange}
          isFetching={isFetchingGroups}
          data={groups}
          items={groupsItems}
          isLoading={isLoadingGroups}
          isError={isErrorGroups}
          error={groupsError}
        />
        <Divider />
        <Text strong>Logins</Text>
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
        <Text strong>Shops</Text>
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
        <Text strong>Change history</Text>
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
