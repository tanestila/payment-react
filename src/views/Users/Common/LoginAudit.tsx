import { useQuery } from "react-query";
import { auditAPI } from "../../../services/queries/audit";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import Table from "../../../Components/TableFactory/Table";
import { useLoginsAuditColumns } from "../../../constants/columns";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";

export const LoginAudit = ({ guid }) => {
  const ability = useContext(AbilityContext);

  const {
    // status: loginsStatus,
    isFetching,
    isLoading,
    isError,
    error,
    data,
    items,
    handleTableChange,
  } = useTableQuery(
    `login-audit`,
    () => auditAPI.getLoginsHistory({ guid }),
    false,
    10,
    [guid]
  );
  const loginsColumns = useLoginsAuditColumns(ability);
  return (
    <div>
      <Table
        columns={loginsColumns}
        handleTableChange={handleTableChange}
        isFetching={isFetching}
        data={data}
        items={items}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  );
};
