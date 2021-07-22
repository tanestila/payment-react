import { ordersAPI } from "../../../services/queries/report/orders";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";

import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { useOrdersColumns } from "../../../constants/columns";

export default function Orders() {
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
  } = useTableQuery("orders", ordersAPI.getOrders, true);

  const columns = useOrdersColumns(ability);

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
