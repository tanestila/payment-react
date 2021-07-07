import {
  Card,
  Descriptions,
  Divider,
  Button,
  Row,
  Progress,
  Alert,
} from "antd";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { AbilityContext } from "../../../Components/Common/Can";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { gatewayAPI } from "../../../services/queries/management/gateways";
import Table from "../../../Components/TableFactory/Table";
import {
  useLoginColumns,
  useGroupMerchantsColumns,
} from "../../../constants/columns";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { formatDate } from "../../../helpers/formatDate";
import { Loading } from "../../../Components/Common";

export default function GatewayDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();

  const {
    data: group,
    status,
    error,
  } = useQuery(["gateway", history.id], () => gatewayAPI.getGroup(history.id));

  const {
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
    10,
    [history.id]
  );

  const merchantsColumns = useGroupMerchantsColumns(ability);

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
      <Card title={`Group detail ${group.group_name}`}>
        <Descriptions
          column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          bordered
          size="small"
        >
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
            {group.partner_name || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Monthly limit">
            {group.monthly_amount_limit}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {formatDate(group.created_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Created by">
            {group.created_by_username}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {formatDate(group.updated_at) || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {group.updated_by_username || "-"}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          size="small"
        >
          <Descriptions.Item label="Used amount limit">
            <Row>
              {group.used_amount}
              {/* {` (${group.used_percent}%)`} */}
            </Row>
            {group.used_percent !== "Disabled" && (
              <Row>
                <Progress percent={group.used_percent} size="small" />
              </Row>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Available amount limit">
            {group.unused_amount}
            {` (${group.unused_percent}%)`}
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
      </Card>
    </>
  );
}
