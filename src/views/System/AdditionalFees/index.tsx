import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { Creator } from "./Creator";
import Modal from "../../../Components/Common/Modal";
import { useAdditionalFees } from "../../../constants/columns";
import { additionalFeesAPI } from "../../../services/queries/management/rates/additionalFees";
import { Button } from "antd";

export default function AdditionalFees() {
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
  } = useTableQuery(
    "additional-fees",
    additionalFeesAPI.getAdditionalFees,
    true
  );

  const columns = useAdditionalFees(ability);

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
          button={<Button type="primary">Create currency</Button>}
          content={Creator}
          header="Create currency"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
