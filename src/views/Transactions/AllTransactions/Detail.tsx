import { Card, Descriptions, Divider, Alert } from "antd";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Loading } from "../../../Components/Common";
import { AbilityContext } from "../../../Components/Common/Can";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import {
  useTransactionDataAuditColumns,
  useTransactionOverviewAuditColumns,
  useTransactionProcessingAuditColumns,
} from "../../../constants/columns";
import { formatDate, formatDateForTable } from "../../../helpers/formatDate";
import { auditAPI } from "../../../services/queries/audit";
import { transactionsAPI } from "../../../services/queries/management/transactions/processing";
import Table from "../../../Components/TableFactory/Table";
import { useTransactionProcessingStepsColumns } from "../../../constants/columns/transactions/steps";

export default function ProcessingDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();

  const {
    data: transaction,
    status,
    error,
  } = useQuery(
    [`transaction`, history.id],
    () => transactionsAPI.getTransaction(history.id),
    {
      keepPreviousData: true,
    }
  );
  const TDHistoryColumns = useTransactionDataAuditColumns(ability);
  const TPHistoryColumns = useTransactionProcessingAuditColumns(ability);
  const TOHistoryColumns = useTransactionOverviewAuditColumns(ability);
  const stepsColumns = useTransactionProcessingStepsColumns();

  const {
    isFetching: isFetchingSteps,
    isLoading: isLoadingSteps,
    isError: isErrorSteps,
    error: StepsError,
    data: Steps,
    items: StepsItems,
    handleTableChange: handleStepsTableChange,
  } = useTableQuery(
    "transaction-steps",
    (params: any) =>
      transactionsAPI.getTransactionProcessingSteps({
        transaction_processing_guid: history.id,
        ...params,
      }),
    true,
    10,
    [history.id]
  );

  const {
    isFetching: isFetchingTDHistory,
    isLoading: isLoadingTDHistory,
    isError: isErrorTDHistory,
    error: TDHistoryError,
    data: TDHistory,
    items: TDHistoryItems,
    handleTableChange: handleTDHistoryTableChange,
  } = useTableQuery(
    "transaction-data",
    (params: any) =>
      auditAPI.getTransactionDataHistory({ guid: history.id, ...params }),
    true,
    10,
    [history.id]
  );

  const {
    isFetching: isFetchingTOHistory,
    isLoading: isLoadingTOHistory,
    isError: isErrorTOHistory,
    error: TOHistoryError,
    data: TOHistory,
    items: TOHistoryItems,
    handleTableChange: handleTOHistoryTableChange,
  } = useTableQuery(
    "transaction-overview",
    (params: any) =>
      auditAPI.getTransactionOverviewsHistory({ guid: history.id, ...params }),
    true,
    10,
    [history.id]
  );

  const {
    isFetching: isFetchingTPHistory,
    isLoading: isLoadingTPHistory,
    isError: isErrorTPHistory,
    error: TPHistoryError,
    data: TPHistory,
    items: TPHistoryItems,
    handleTableChange: handleTPHistoryTableChange,
  } = useTableQuery(
    "transaction-processing",
    (params: any) =>
      auditAPI.getTransactionProcessingHistory({ guid: history.id, ...params }),
    true,
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
      <Card title={`Transaction ${transaction.guid}`}>
        <Descriptions
          column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          bordered
          size="small"
        >
          <Descriptions.Item label="transaction type">
            {transaction.transaction_type}
          </Descriptions.Item>
          <Descriptions.Item label="Amount">
            {transaction.amount / 100} {transaction.currency}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {transaction.status}
          </Descriptions.Item>
          <Descriptions.Item label="Date time">
            {formatDateForTable(transaction.date_time)}
          </Descriptions.Item>
          <Descriptions.Item label="Bin country">
            {transaction.bin_country}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {formatDate(transaction.created_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Created by">
            {transaction.created_by}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {formatDate(transaction.updated_at) || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {transaction.updated_by || "-"}
          </Descriptions.Item>
        </Descriptions>

        <Divider />
        <h5>Steps</h5>
        <Table
          columns={stepsColumns}
          handleTableChange={handleStepsTableChange}
          isFetching={isFetchingSteps}
          data={Steps}
          items={StepsItems}
          isLoading={isLoadingSteps}
          isError={isErrorSteps}
          error={StepsError}
        />
        <Divider />
        <h5>Transaction data changes history</h5>
        <Table
          columns={TDHistoryColumns}
          handleTableChange={handleTDHistoryTableChange}
          isFetching={isFetchingTDHistory}
          data={TDHistory}
          items={TDHistoryItems}
          isLoading={isLoadingTDHistory}
          isError={isErrorTDHistory}
          error={TDHistoryError}
        />
        <Divider />
        <h5>Transaction processing changes history</h5>
        <Table
          columns={TPHistoryColumns}
          handleTableChange={handleTPHistoryTableChange}
          isFetching={isFetchingTPHistory}
          data={TPHistory}
          items={TPHistoryItems}
          isLoading={isLoadingTPHistory}
          isError={isErrorTPHistory}
          error={TPHistoryError}
        />
        <Divider />
        <h5>Transaction overview changes history</h5>
        <Table
          columns={TOHistoryColumns}
          handleTableChange={handleTOHistoryTableChange}
          isFetching={isFetchingTOHistory}
          data={TOHistory}
          items={TOHistoryItems}
          isLoading={isLoadingTOHistory}
          isError={isErrorTOHistory}
          error={TOHistoryError}
        />
      </Card>
    </>
  );
}
