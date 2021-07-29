import { Alert, Card, Descriptions, Divider, Row } from "antd";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { AbilityContext } from "../../../Components/Common/Can";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { auditAPI } from "../../../services/queries/audit";
import Table from "../../../Components/TableFactory/Table";
import { useLoginsAuditColumns } from "../../../constants/columns";
import { adminsAPI } from "../../../services/queries/management/users/admins";
import { formatDate } from "../../../helpers/formatDate";
import { Loading } from "../../../Components/Common";
import { useAdminRolesColumns } from "../../../constants/columns/users/admins";

export default function AdminDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const {
    data: admin,
    status,
    error,
  } = useQuery(["admin", history.id], () => adminsAPI.getAdmin(history.id));

  const deleteAdminRoleMutation = useMutation(adminsAPI.deleteAdminRole, {
    onSuccess: () => {
      queryClient.invalidateQueries("admin-roles");
    },
  });

  const {
    isFetching: isFetchingAdminRoles,
    isLoading: isLoadingAdminRoles,
    isError: isErrorAdminRoles,
    error: adminRolesError,
    data: adminRoles,
    items: adminRolesItems,
    handleTableChange: handleAdminRolesTableChange,
  } = useTableQuery(
    "admin-roles",
    () => adminsAPI.getAdminRoles(history.id),
    false,
    10,
    [history.id]
  );

  const {
    isFetching: isFetchingAdminHistory,
    isLoading: isLoadingAdminHistory,
    isError: isErrorAdminHistory,
    error: adminHistoryError,
    data: adminHistory,
    items: adminHistoryItems,
    handleTableChange: handleAdminHistoryTableChange,
  } = useTableQuery(
    "admin-history",
    (params: any) => auditAPI.getLoginsHistory({ guid: history.id, ...params }),
    false,
    10,
    [history.id]
  );

  const historyColumns = useLoginsAuditColumns(ability);
  const rolesColumns = useAdminRolesColumns(
    ability,
    history.id,
    deleteAdminRoleMutation
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
      <Card title={`Admin detail ${admin.username}`}>
        <Descriptions
          column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          bordered
          size="small"
        >
          <Descriptions.Item label="GUID">{admin.guid}</Descriptions.Item>
          <Descriptions.Item label="Username">
            {admin.username}
          </Descriptions.Item>
          <Descriptions.Item label="First name">
            {admin.first_name}
          </Descriptions.Item>
          <Descriptions.Item label="Last name">
            {admin.last_name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{admin.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{admin.phone}</Descriptions.Item>

          <Descriptions.Item label="Credentials expire at">
            {formatDate(admin.credentials_expire_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {formatDate(admin.created_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Created by">
            {admin.created_by_username}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {formatDate(admin.updated_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {admin.updated_by_username}
          </Descriptions.Item>
        </Descriptions>
        <Divider />

        <h5>Roles</h5>
        <Table
          columns={rolesColumns}
          handleTableChange={handleAdminRolesTableChange}
          isFetching={isFetchingAdminRoles}
          data={adminRoles}
          items={adminRolesItems}
          isLoading={isLoadingAdminRoles}
          isError={isErrorAdminRoles}
          error={adminRolesError}
          isPaginated={false}
        />
        <Row justify="center">
          <RowAddRole type="admin" guid={history.id} adminRoles={adminRoles} />
        </Row>
        <Divider />
        <h5>Change history</h5>
        <Table
          columns={historyColumns}
          handleTableChange={handleAdminHistoryTableChange}
          isFetching={isFetchingAdminHistory}
          data={adminHistory}
          items={adminHistoryItems}
          isLoading={isLoadingAdminHistory}
          isError={isErrorAdminHistory}
          error={adminHistoryError}
        />
      </Card>
    </>
  );
}
