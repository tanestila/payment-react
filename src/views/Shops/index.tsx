import { Link } from "react-router-dom";
import Table from "../../Components/TableFactory/MainTable";
import useTableQuery from "../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../Components/Common/Can";
import Creator from "./Creator";
import Modal from "../../Components/Common/Modal";
import { shopsAPI } from "../../services/queries/management/shops";
import { PartnerType } from "../../types/partners";
import { Button } from "antd";
import { useShopsColumns } from "../../constants/columns";

export default function Shops() {
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
  } = useTableQuery("shops", shopsAPI.getShops);

  const columns = useShopsColumns(ability);

  return (
    <Table
      columns={columns}
      handleTableChange={handleTableChange}
      onSearch={onSearch}
      search={search}
      isFetching={isFetching}
      data={data}
      items={items}
      isLoading={isLoading}
      isError={isError}
      error={error}
      modalComponent={
        <Modal
          allowed={ability.can("EXECUTE", "USERMERCHANT")}
          // allowed={true}
          button={<Button type="primary">Create Shop</Button>}
          content={Creator}
          header="Create merchant"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
