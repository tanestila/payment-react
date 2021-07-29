import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useChargebacksColumns } from "../../../constants/columns";
import { chargebacksAPI } from "../../../services/queries/management/transactions/chargebacks";

export default function Chargebacks() {
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
  } = useTableQuery("chargebacks", chargebacksAPI.getChargebacks, true);

  const columns = useChargebacksColumns(ability);

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
