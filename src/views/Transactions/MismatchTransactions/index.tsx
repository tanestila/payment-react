import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useMismatchTransactionsColumns } from "../../../constants/columns";
import { mismatchAPI } from "../../../services/queries/management/transactions/mismatch";

export default function MismatchTransactions() {
  const ability = useContext(AbilityContext);
  const {
    isLoading,
    isError,
    error,
    data,
    status,
    isFetching,
    handleTableChange,
    onSearch,
  } = useTableQuery(
    "mismatch_transaction",
    mismatchAPI.getMismatchTransactions,
    true
  );

  const columns = useMismatchTransactionsColumns(ability);

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
