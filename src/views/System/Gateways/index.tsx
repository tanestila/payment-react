import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { Creator } from "./Creator";
import Modal from "../../../Components/Common/Modal";
import { gatewaysAPI } from "../../../services/queries/management/gateways";
import { useGatewaysColumns } from "../../../constants/columns";
import { Button } from "antd";

export default function Gateways() {
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
  } = useTableQuery("gateways", gatewaysAPI.getGateways, true);

  const columns = useGatewaysColumns(ability);

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
      modalComponent={
        <Modal
          allowed={ability.can("EXECUTE", "USERMERCHANT")}
          button={<Button type="primary">Create gateway</Button>}
          content={Creator}
          header="Create gateway"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
