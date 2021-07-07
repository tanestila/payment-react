import { useContext } from "react";
import { Link } from "react-router-dom";
import { AbilityContext } from "../../../Components/Common/Can";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useMismatchTransactionsColumns } from "../../../constants/columns";
import { cutGuid } from "../../../helpers/cutGuid";
import { mismatchAPI } from "../../../services/queries/management/transactions/mismatch";

export default function MismatchTransactions() {
  const ability = useContext(AbilityContext);
  const {
    isLoading,
    isError,
    error,
    data,
    items,
    search,
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
      search={search}
      isFetching={isFetching}
      data={data}
      items={items}
    />
  );
}
