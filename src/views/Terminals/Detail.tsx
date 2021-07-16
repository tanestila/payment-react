import { Card, Descriptions, Divider, Alert } from "antd";
import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { AbilityContext } from "../../Components/Common/Can";
import useTableQuery from "../../Components/TableFactory/useTableQuery";
import { auditAPI } from "../../services/queries/audit";
import Table from "../../Components/TableFactory/Table";
import { useMerchantAuditColumns } from "../../constants/columns";
import { Loading } from "../../Components/Common";
import { terminalsAPI } from "../../services/queries/management/terminals";

export default function TerminalDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ shop_guid: string; terminal_guid: string }>();

  const {
    data: terminal,
    status,
    error,
  } = useQuery(
    ["terminal", history.shop_guid, history.terminal_guid],
    () => terminalsAPI.getTerminal(history.shop_guid, history.terminal_guid),
    {
      keepPreviousData: true,
    }
  );

  const {
    // status: merchantHistoryStatus,
    isFetching: isFetchingTerminalHistory,
    isLoading: isLoadingTerminalHistory,
    isError: isErrorTerminalHistory,
    error: terminalHistoryError,
    data: terminalHistory,
    items: terminalHistoryItems,
    handleTableChange: handleTerminalHistoryTableChange,
  } = useTableQuery(
    "terminal-history",
    (params: any) =>
      auditAPI.getTerminalsHistory({ guid: history.id, ...params }),
    false,
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
      <Card title={`Group detail ${terminal.name}`}>
        <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item span={3} label="Secret">
            {terminal.secret}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Hash-key">
            {terminal.hashKey}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item span={3} label="GUID">
            {terminal.guid}
          </Descriptions.Item>
          <Descriptions.Item label="Rate">
            {terminal.rate_name}
          </Descriptions.Item>
          <Descriptions.Item label="Gateway">
            {terminal.gateway_name}
          </Descriptions.Item>
          <Descriptions.Item label="Currency">
            {terminal.currency_code}
          </Descriptions.Item>
          <Descriptions.Item label="3D">{terminal.three_d}</Descriptions.Item>
          <Descriptions.Item label="billing descriptor">
            {terminal.billing_descriptor}
          </Descriptions.Item>
          <Descriptions.Item label="routing string">
            {terminal.routing_string}
          </Descriptions.Item>
          <Descriptions.Item label="payment amount limit">
            {terminal.payment_amount_limit}
          </Descriptions.Item>
          <Descriptions.Item label="monthly amount limit">
            {terminal.monthly_amount_limit}
          </Descriptions.Item>
          <Descriptions.Item label="generate_statement">
            {terminal.generate_statement}
          </Descriptions.Item>
          <Descriptions.Item label="generate_statement">
            {terminal.generate_statement}
          </Descriptions.Item>
          <Descriptions.Item label="enabled">
            {terminal.enabled}
          </Descriptions.Item>
          <Descriptions.Item label="enable_checkout">
            {terminal.enable_checkout}
          </Descriptions.Item>
          <Descriptions.Item label="checkout_method">
            {terminal.checkout_method}
          </Descriptions.Item>
          <Descriptions.Item label="antifraud_monitor">
            {terminal.antifraud_monitor}
          </Descriptions.Item>
          <Descriptions.Item label="antifraud_monitor_value">
            {terminal.antifraud_monitor_value}
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
          handleTableChange={handleTerminalHistoryTableChange}
          isFetching={isFetchingTerminalHistory}
          data={terminalHistory}
          items={terminalHistoryItems}
          isLoading={isLoadingTerminalHistory}
          isError={isErrorTerminalHistory}
          error={terminalHistoryError}
        />
      </Card>
    </>
  );
}
