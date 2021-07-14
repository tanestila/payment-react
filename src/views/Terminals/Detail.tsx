import { Card, Descriptions, Divider, Alert } from "antd";
import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { AbilityContext } from "../../Components/Common/Can";
import useTableQuery from "../../Components/TableFactory/useTableQuery";
import { shopsAPI } from "../../services/queries/management/shops";
import { auditAPI } from "../../services/queries/audit";
import Table from "../../Components/TableFactory/Table";
import { useMerchantAuditColumns } from "../../constants/columns";
import { Loading } from "../../Components/Common";
import { terminalsAPI } from "../../services/queries/management/terminals";

export default function TerminalDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: terminal,
    status,
    error,
  } = useQuery(
    ["terminal", history.id],
    () => terminalsAPI.getTerminal(history.id),
    {
      keepPreviousData: true,
    }
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
    "shop-history",
    (params: any) => auditAPI.getShopsHistory({ guid: history.id, ...params }),
    10
  );

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
      <Card title={`Group detail ${group.group_name}`}>
        <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
          <Descriptions.Item span={3} label="GUID">
            {terminal.group_guid}
          </Descriptions.Item>
          <Descriptions.Item label="Group type">
            {terminal.group_type}
          </Descriptions.Item>
          <Descriptions.Item label="Group name">
            {terminal.group_name}
          </Descriptions.Item>
          <Descriptions.Item label="Partner">
            {terminal.partner_name}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {terminal.created_at}
          </Descriptions.Item>
          <Descriptions.Item label="Created by">
            {terminal.created_by_username}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {terminal.updated_at}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {terminal.updated_by_username}
          </Descriptions.Item>
        </Descriptions>
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
