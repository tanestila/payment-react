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
import { accountsAPI } from "../../../services/queries/management/accounts";
import { shopsAPI } from "../../../services/queries/management/shops";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import { auditAPI } from "../../../services/queries/audit";
import Table from "../../../Components/TableFactory/Table";
import {
  useLoginColumns,
  useAccountsColumns,
  useTerminalsColumns,
  useMerchantAuditColumns,
} from "../../../constants/columns";
import { formatDate } from "../../../helpers/formatDate";
import CustomModal from "../../../Components/Common/Modal";
import { LoginCreator } from "../Common/LoginCreator";
import Loading from "../../../Components/Common/Loading/MainLoading";
import { useShopsColumnsForDetail } from "../../../constants/columns/shops";
import { terminalsAPI } from "../../../services/queries/management/terminals";

export default function MerchantDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: merchant,
    status,
    error,
  } = useQuery([`merchant`, history.id], () =>
    merchantsAPI.getMerchant(history.id)
  );

  const deleteMerchantLoginMutation = useMutation(
    merchantsAPI.deleteMerchantLogin,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("merchant-logins");
      },
    }
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
    "merchant-logins",
    () => merchantsAPI.getMerchantLogins(history.id, {}),
    false,
    10,
    [history.id]
  );

  const {
    isFetching: isFetchingAccounts,
    isLoading: isLoadingAccounts,
    isError: isErrorAccounts,
    error: accountsError,
    data: accounts,
    items: accountsItems,
    handleTableChange: handleAccountsTableChange,
  } = useTableQuery(
    "accounts",
    () => accountsAPI.getAccounts(history.id, {}),
    false,
    10,
    [history.id]
  );

  const {
    isFetching: isFetchingTerminals,
    isLoading: isLoadingTerminals,
    isError: isErrorTerminals,
    error: terminalsError,
    data: terminals,
    items: terminalsItems,
    handleTableChange: handleTerminalsTableChange,
  } = useTableQuery(
    "terminals",
    () => terminalsAPI.getTerminals({ merchant_guid: history.id }),
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
    "shops",
    () => shopsAPI.getShops({ merchant_guid: history.id }),
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
    "merchant-history",
    () => auditAPI.getMerchantsHistory({ guid: history.id }),
    false,
    10,
    [history.id]
  );

  const loginsColumns = useLoginColumns(
    ability,
    "merchant",
    history.id,
    deleteMerchantLoginMutation
  );
  const accountsColumns = useAccountsColumns(ability);
  const terminalsColumns = useTerminalsColumns(ability);
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
      <Card title={`Merchant detail ${merchant.merchant_name}`}>
        <Descriptions
          column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          bordered
          size="small"
        >
          <Descriptions.Item label="GUID">
            {merchant.merchant_guid}
          </Descriptions.Item>
          <Descriptions.Item label="Merchant type">
            {merchant.merchant_type}
          </Descriptions.Item>
          <Descriptions.Item label="Merchant name">
            {merchant.merchant_name}
          </Descriptions.Item>
          <Descriptions.Item label="Group">
            {merchant.group_name || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Monthly limit">
            {merchant.monthly_amount_limit}
          </Descriptions.Item>
          <Descriptions.Item label="Custom limit">
            {merchant.custom_days_limit > 0
              ? `${merchant.custom_amount_limit} per ${merchant.custom_days_limit} days`
              : "Disabled"}
          </Descriptions.Item>
          <Descriptions.Item label="Monthly fee date">
            {formatDate(merchant.monthly_fee_date)}
          </Descriptions.Item>
          <Descriptions.Item label="Monthly fee">
            {merchant.monthly_fee} {merchant.monthly_fee_currency}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {formatDate(merchant.created_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Created by">
            {merchant.created_by_username}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {formatDate(merchant.updated_at) || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {merchant.updated_by_username || "-"}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          size="small"
        >
          <Descriptions.Item label="Used amount limit">
            <Row>{merchant.used_amount}</Row>
            {merchant.used_percent !== "Disabled" && (
              <Row>
                <Progress percent={merchant.used_percent} size="small" />
              </Row>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Available amount limit">
            {merchant.unused_amount}
            {` (${merchant.unused_percent}%)`}
          </Descriptions.Item>

          <Descriptions.Item label="Used custom amount limit">
            <Row>{merchant.used_custom_amount}</Row>
            {merchant.used_custom_percent !== "Disabled" && (
              <Row>
                <Progress percent={merchant.used_custom_percent} size="small" />
              </Row>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Available custom amount limit">
            {merchant.unused_custom_amount}
            {` (${merchant.unused_custom_percent}%)`}
          </Descriptions.Item>
        </Descriptions>

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
            header="Create Login"
            content={LoginCreator}
            contentProps={{ guid: merchant.merchant_guid, type: "merchant" }}
            button={<Button>Add login</Button>}
          />
        </Row>
        <Divider />
        <h5>Accounts</h5>
        <Table
          columns={accountsColumns}
          handleTableChange={handleAccountsTableChange}
          isFetching={isFetchingAccounts}
          data={accounts}
          items={accountsItems}
          isLoading={isLoadingAccounts}
          isError={isErrorAccounts}
          error={accountsError}
          isPaginated={false}
        />
        <Row justify="center">
          <CustomModal
            header="Create account"
            content={LoginCreator}
            contentProps={{ guid: merchant.merchant_guid, type: "merchant" }}
            button={<Button>Add account</Button>}
          />
        </Row>
        <Divider />
        <h5>Terminals</h5>
        <Table
          columns={terminalsColumns}
          handleTableChange={handleTerminalsTableChange}
          isFetching={isFetchingTerminals}
          data={terminals}
          items={terminalsItems}
          isLoading={isLoadingTerminals}
          isError={isErrorTerminals}
          error={terminalsError}
        />
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
