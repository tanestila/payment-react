import { transactionsAPI } from "../../../services/queries/management/transactions/processing";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useAllTransactionsColumns } from "../../../constants/columns";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";

export default function AllTransactions() {
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
  } = useTableQuery("transactions", transactionsAPI.getTransactions, true);

  const columns = useAllTransactionsColumns(ability);

  return (
    <Table
      columns={columns}
      handleTableChange={handleTableChange}
      onSearch={onSearch}
      isFetching={isFetching}
      data={data}
      status={status}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
}
