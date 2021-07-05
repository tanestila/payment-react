import Table from "../../Components/TableFactory/MainTable";
import useTableQuery from "../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../Components/Common/Can";
import Creator from "./Creator";
import Modal from "../../Components/Common/Modal";
import { shopsAPI } from "../../services/queries/management/shops";
import { Button } from "antd";
import { useShopsColumns } from "../../constants/columns";
import { useMutation, useQueryClient } from "react-query";

export default function Shops() {
  const ability = useContext(AbilityContext);
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data,
    status,
    isFetching,
    handleTableChange,
    onSearch,
  } = useTableQuery("shops", shopsAPI.getShops, true);

  const deleteShopsMutation = useMutation(shopsAPI.deleteShop, {
    onSuccess: () => {
      queryClient.invalidateQueries("shops");
    },
  });

  const columns = useShopsColumns(ability, deleteShopsMutation);

  return (
    <Table
      columns={columns}
      handleTableChange={handleTableChange}
      onSearch={onSearch}
      isFetching={isFetching}
      status={status}
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      modalComponent={
        <Modal
          allowed={ability.can("EXECUTE", "USERMERCHANT")}
          button={<Button type="primary">Create Shop</Button>}
          content={Creator}
          header="Create shop"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
