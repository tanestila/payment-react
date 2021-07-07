import { Card, Descriptions, Divider, Button, Row, Alert } from "antd";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { AbilityContext } from "../../../Components/Common/Can";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { auditAPI } from "../../../services/queries/audit";
import Table from "../../../Components/TableFactory/Table";
import {
  useLoginColumns,
  useMerchantAuditColumns,
} from "../../../constants/columns";
import { partnersAPI } from "../../../services/queries/management/users/partners";
import { formatDate } from "../../../helpers/formatDate";
import { Loading } from "../../../Components/Common";
import CustomModal from "../../../Components/Common/Modal";
import { LoginCreator } from "../Common/LoginCreator";
import { RowAddUser } from "../Common/RowAddUser";
import { useShopsColumnsForDetail } from "../../../constants/columns/shops";

export default function PartnerDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: partner,
    status,
    error,
  } = useQuery(["partner", history.id], () =>
    partnersAPI.getPartner(history.id)
  );

  const deletePartnerLoginMutation = useMutation(
    partnersAPI.deletePartnerLogin,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("partner-logins");
      },
    }
  );

  const {
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
    10,
    [history.id]
  );

  const {
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
    10,
    [history.id]
  );

  const {
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
    10,
    [history.id]
  );

  const {
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
    10,
    [history.id]
  );

  const loginsColumns = useLoginColumns(
    ability,
    "partner",
    history.id,
    deletePartnerLoginMutation
  );
  const shopsColumns = useShopsColumnsForDetail(ability);
  const historyColumns = useMerchantAuditColumns(ability);

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
      <Card title={`Partner detail ${partner.partner_name}`}>
        <Descriptions
          column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          bordered
          size="small"
        >
          <Descriptions.Item label="GUID">
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
            {formatDate(partner.updated_at) || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {partner.updated_by_username || "-"}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <h5>Groups</h5>
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
        <Row justify="center">
          <RowAddUser type="partner" guid={partner.partner_guid} />
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
          <CustomModal
            header="Create login"
            content={LoginCreator}
            contentProps={{ guid: partner.partner_guid, type: "partner" }}
            button={<Button>Add login</Button>}
            // dialogClassName="modal-creator"
          />
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
