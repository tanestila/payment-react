import { Card, Descriptions, Divider, Button, Row } from "antd";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AbilityContext } from "../../../Components/Common/Can";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { accountsAPI } from "../../../services/queries/management/accounts";
import { shopsAPI } from "../../../services/queries/management/shops";
import { terminalsAPI } from "../../../services/queries/management/transactions/steps";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import { auditAPI } from "../../../services/queries/audit";
import Table from "../../../Components/TableFactory/Table";
import {
  useLoginColumns,
  useAccountsColumns,
  useTerminalsColumns,
  useShopsColumns,
  useMerchantAuditColumns,
} from "../../../constants/columns";
import { formatDate } from "../../../helpers/formatDate";
import CustomModal from "../../../Components/Common/Modal";
import { LoginCreator } from "../Common/LoginCreator";

export default function MerchantDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();

  const {
    data: merchant,
    status,
    error,
  } = useQuery(
    [`merchant-${history.id}`],
    () => merchantsAPI.getMerchant(history.id),
    {
      keepPreviousData: true,
    }
  );

  const {
    // status: loginsStatus,
    isFetching: isFetchingLogins,
    isLoading: isLoadingLogins,
    isError: isErrorLogins,
    error: loginsError,
    data: logins,
    items: loginsItems,
    handleTableChange: handleLoginsTableChange,
  } = useTableQuery(
    `merchant-logins-${history.id}`,
    () => merchantsAPI.getMerchantLogins(history.id, {}),
    false,
    10
  );

  const {
    // status: accountsStatus,
    isFetching: isFetchingAccounts,
    isLoading: isLoadingAccounts,
    isError: isErrorAccounts,
    error: accountsError,
    data: accounts,
    items: accountsItems,
    handleTableChange: handleAccountsTableChange,
  } = useTableQuery(
    `accounts-${history.id}`,
    () => accountsAPI.getAccounts(history.id, {}),
    false,
    10
  );

  const {
    // status: terminalsStatus,
    isFetching: isFetchingTerminals,
    isLoading: isLoadingTerminals,
    isError: isErrorTerminals,
    error: terminalsError,
    data: terminals,
    items: terminalsItems,
    handleTableChange: handleTerminalsTableChange,
  } = useTableQuery(
    `terminals-${history.id}`,
    () => terminalsAPI.getTerminals({ merchant_guid: history.id }),
    false,
    10
  );

  const {
    // status: shopsStatus,
    isFetching: isFetchingShops,
    isLoading: isLoadingShops,
    isError: isErrorShops,
    error: shopsError,
    data: shops,
    items: shopsItems,
    handleTableChange: handleShopsTableChange,
  } = useTableQuery(
    `shops-${history.id}`,
    () => shopsAPI.getShops({ merchant_guid: history.id }),
    false,
    10
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
    `merchant-history-${history.id}`,
    () => auditAPI.getMerchantsHistory({ guid: history.id }),
    false,
    10
  );

  const loginsColumns = useLoginColumns(ability);

  const accountsColumns = useAccountsColumns(ability);

  const terminalsColumns = useTerminalsColumns(ability);

  const shopsColumns = useShopsColumns(ability);

  const historyColumns = useMerchantAuditColumns(ability);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    let errorObj = error as any;
    return <span>Error: {errorObj.message}</span>;
  }

  return (
    <>
      <Card title={`Merchant detail ${merchant.merchant_name}`}>
        <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
          <Descriptions.Item span={3} label="GUID">
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
          {/* <Button style={{ margin: "10px auto" }}>Add login</Button> */}
          <CustomModal
            header="Create Login"
            content={LoginCreator}
            contentProps={{ guid: merchant.merchant_guid }}
            button={<Button>Add login</Button>}
            // dialogClassName="modal-creator"
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
          {/* <Button style={{ margin: "10px auto" }}>Add accounts</Button> */}
          <CustomModal
            header="Create account"
            content={LoginCreator}
            contentProps={{ guid: merchant.merchant_guid }}
            button={<Button>Add account</Button>}
            // dialogClassName="modal-creator"
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
