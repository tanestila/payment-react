import { transactionsAPI } from "../../../services/queries/management/transactions/processing";
import { Link } from "react-router-dom";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { Space } from "antd";
import { cutGuid } from "../../../helpers/cutGuid";
import { Copy } from "../../../Components/Common/CopyToClipboard";
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
    search,
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
      search={search}
      isFetching={isFetching}
      data={data}
      status={status}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
}
