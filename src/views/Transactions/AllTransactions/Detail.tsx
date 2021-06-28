import { Card, Descriptions, Divider, Typography, Button, Row } from "antd";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AbilityContext } from "../../../Components/Common/Can";
import {
  useLoginColumns,
  useShopsColumns,
  useMerchantAuditColumns,
  useGroupsMerchantsColumns,
} from "../../../constants/columns";
import { transactionsAPI } from "../../../services/queries/management/transactions/processing";
const { Text } = Typography;

export default function ProcessingDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();

  const {
    data: group,
    status,
    error,
  } = useQuery(
    [`transaction-${history.id}`],
    () => transactionsAPI.getTransaction(history.id),
    {
      keepPreviousData: true,
    }
  );

  // const {
  //   // status: merchantHistoryStatus,
  //   isFetching: isFetchingMerchantHistory,
  //   isLoading: isLoadingMerchantHistory,
  //   isError: isErrorMerchantHistory,
  //   error: merchantHistoryError,
  //   data: merchantHistory,
  //   items: merchantHistoryItems,
  //   handleTableChange: handleMerchantHistoryTableChange,
  // } = useTableQuery(
  //   "admin-history",
  //   (params: any) => auditAPI.getLoginsHistory({ guid: history.id, ...params }),
  //   10
  // );

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
            {group.created_at}
          </Descriptions.Item>
          <Descriptions.Item label="Created by">
            {group.created_by_username}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {group.updated_at}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {group.updated_by_username}
          </Descriptions.Item>
        </Descriptions>
        <Divider />

        <Text strong>Change history</Text>
        {/* <Table
          columns={historyColumns}
          handleTableChange={handleMerchantHistoryTableChange}
          isFetching={isFetchingMerchantHistory}
          data={merchantHistory}
          items={merchantHistoryItems}
          isLoading={isLoadingMerchantHistory}
          isError={isErrorMerchantHistory}
          error={merchantHistoryError}
        /> */}
      </Card>
    </>
  );
}
