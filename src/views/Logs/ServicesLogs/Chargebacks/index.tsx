import Table from "../../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../../Components/Common/Can";
import { logsAPI } from "../../../../services/queries/log/index";
import { useServicesLogsColumns } from "../../../../constants/columns";

export default function ChargebackServiceLogs() {
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
    "chargeback-service-logs",
    logsAPI.getŠ”hargebackServiceLogs,
    true
  );

  const columns = useServicesLogsColumns(ability);

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
