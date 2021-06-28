import Table from "../../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../../Components/Common/Can";
import { logsAPI } from "../../../../services/queries/log/index";
import { useRolesColumns } from "../../../../constants/columns";

export default function Roles() {
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
  } = useTableQuery("roles", logsAPI.getСhargebackServiceLogs, true);

  const columns = useRolesColumns(ability);

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
