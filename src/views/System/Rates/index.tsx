import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import Creator from "./Creator";
import Modal from "../../../Components/Common/Modal";
import { ratesAPI } from "../../../services/queries/management/rates";
import { useRatesColumns } from "../../../constants/columns";
import { Button } from "antd";
import { useMutation, useQueryClient } from "react-query";

export default function Rate() {
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
  } = useTableQuery("rates", ratesAPI.getRates, true);

  const deleteRateMutation = useMutation(ratesAPI.deleteRate, {
    onSuccess: () => {
      queryClient.invalidateQueries("rates");
    },
  });

  const columns = useRatesColumns(ability, deleteRateMutation);

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
          button={<Button type="primary">Create rate</Button>}
          content={Creator}
          header="Create rate"
          // dialogClassName="modal-creator"
        />
      }
    />
  );
}
