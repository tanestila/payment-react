import { templatesAPI } from "../../../services/queries/management/transactions/templates";
import { Link } from "react-router-dom";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { Space } from "antd";
import { cutGuid } from "../../../helpers/cutGuid";
import { Copy } from "../../../Components/Common/CopyToClipboard";
import { useTransactionTemplatesColumns } from "../../../constants/columns";

export default function Templates() {
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
  } = useTableQuery("templates", templatesAPI.getTemplates);

  const columns = useTransactionTemplatesColumns();

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
