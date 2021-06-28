import Table from "../../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../../Components/Common/Can";
import { useTransactionDataAuditColumns } from "../../../../constants/columns";
import { auditAPI } from "../../../../services/queries/audit";

export default function TransactionDataAudit() {
  const ability = useContext(AbilityContext);
  const {
    isLoading,
    isError,
    error,
    status,
    data,
    isFetching,
    handleTableChange,
    onSearch,
  } = useTableQuery(
    "transaction-data-audit",
    auditAPI.getTransactionDataHistory,
    true
  );

  const columns = useTransactionDataAuditColumns(ability);

  return (
    <Table
      columns={columns}
      handleTableChange={handleTableChange}
      onSearch={onSearch}
      isFetching={isFetching}
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      status={status}
    />
  );
}
