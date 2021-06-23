import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { Creator } from "./Creator";
import Modal from "../../../Components/Common/Modal";
import { ratesAPI } from "../../../services/queries/management/rates";
import { useCurrenciesColumns } from "../../../constants/columns";

export default function Rate() {
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
  } = useTableQuery("rates", ratesAPI.getRates, true);

  const columns = useCurrenciesColumns(ability);

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
          // allowed={true}
          button={
            <button className="btn btn-fill btn-primary">
              Create currency
            </button>
          }
          content={Creator}
          header="Create currency"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
