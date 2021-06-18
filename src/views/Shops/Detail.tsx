import { Card, Descriptions, Divider, Typography } from "antd";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AbilityContext } from "../../Components/Common/Can";
import useTableQuery from "../../Components/TableFactory/useTableQuery";
import { shopsAPI } from "../../services/queries/management/shops";
import { auditAPI } from "../../services/queries/audit";

import Table from "../../Components/TableFactory/Table";
import { useMerchantHistoryColumns } from "../../constants/columns";
import { formatDate } from "../../helpers/formatDate";
const { Text } = Typography;

export default function ShopDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();

  const {
    data: shop,
    status,
    error,
  } = useQuery([`shop-${history.id}`], () => shopsAPI.getShop(history.id), {
    keepPreviousData: true,
  });

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

  const historyColumns = useMerchantHistoryColumns(ability);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    let errorObj = error as any;
    return <span>Error: {errorObj.message}</span>;
  }

  return (
    <>
      <Card title={`Group detail ${shop.group_name}`}>
        <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
          <Descriptions.Item span={3} label="GUID">
            {shop.group_guid}
          </Descriptions.Item>
          <Descriptions.Item label="Group type">
            {shop.group_type}
          </Descriptions.Item>
          <Descriptions.Item label="Group name">
            {shop.group_name}
          </Descriptions.Item>
          <Descriptions.Item label="Partner">
            {shop.partner_name}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {formatDate(shop.created_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Created by">
            {shop.created_by_username}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {formatDate(shop.updated_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {shop.updated_by_username}
          </Descriptions.Item>
        </Descriptions>
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
