import { Card, Descriptions, Divider, Typography } from "antd";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AbilityContext } from "../../../Components/Common/Can";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { auditAPI } from "../../../services/queries/audit";
import Table from "../../../Components/TableFactory/Table";
import { useLoginsAuditColumns } from "../../../constants/columns";
import { adminsAPI } from "../../../services/queries/management/users/admins";
import { formatDate } from "../../../helpers/formatDate";
const { Text } = Typography;

export default function AdminDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();

  const {
    data: admin,
    status,
    error,
  } = useQuery([`admin-${history.id}`], () => adminsAPI.getAdmin(history.id), {
    keepPreviousData: true,
  });

  const {
    // status: adminHistoryStatus,
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
    10
  );

  const historyColumns = useLoginsAuditColumns(ability);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    let errorObj = error as any;
    return <span>Error: {errorObj.message}</span>;
  }

  return (
    <>
      <Card title={`Admin detail ${admin.group_name}`}>
        <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
          <Descriptions.Item span={3} label="GUID">
            {admin.group_guid}
          </Descriptions.Item>
          <Descriptions.Item label="Group type">
            {admin.group_type}
          </Descriptions.Item>
          <Descriptions.Item label="Group name">
            {admin.group_name}
          </Descriptions.Item>
          <Descriptions.Item label="Partner">
            {admin.partner_name}
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

        <Text strong>Change history</Text>
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
