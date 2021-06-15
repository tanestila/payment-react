import { useContext } from "react";
import Table from "../../../Components/TableFactory/MainTable";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import { AbilityContext } from "../../../Components/Common/Can";
import Modal from "../../../Components/Common/Modal";
import Creator from "./Creator";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useMerchantsColumns } from "../../../constants/columns";
import { Button } from "antd";

export default function Merchants() {
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
    status,
  } = useTableQuery("merchants", merchantsAPI.getMerchants);

  const columns = useMerchantsColumns(ability);

  return (
    <Table
      name="merchants"
      columns={columns}
      handleTableChange={handleTableChange}
      onSearch={onSearch}
      search={search}
      isFetching={isFetching}
      data={data}
      items={items}
      status={status}
      isLoading={isLoading}
      isError={isError}
      error={error}
      searchQuery={{ gateways: true }}
      rowKey={"login_guid"}
      modalComponent={
        <Modal
          allowed={ability.can("EXECUTE", "USERMERCHANT")}
          button={<Button type="primary">Create merchant</Button>}
          content={Creator}
          header="Create merchant"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
