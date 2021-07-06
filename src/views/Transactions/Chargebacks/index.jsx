import { useContext } from "react";
import { Link } from "react-router-dom";
import { AbilityContext } from "../../../Components/Common/Can";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useChargebacksColumns } from "../../../constants/columns";
import { cutGuid } from "../../../helpers/cutGuid";
import { chargebacksAPI } from "../../../services/queries/management/transactions/chargebacks";

export default function Chargebacks() {
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
  } = useTableQuery("chargebacks", chargebacksAPI.getChargebacks);

  const columns = useChargebacksColumns(ability);

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
