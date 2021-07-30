import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import Creator from "./Creator";
import Modal from "../../../Components/Common/Modal";
import { currenciesAPI } from "../../../services/queries/management/currencies";
import { useCurrenciesColumns } from "../../../constants/columns";
import { Button } from "antd";

export default function Currencies() {
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
  } = useTableQuery("currencies", currenciesAPI.getCurrencies, true);

  const columns = useCurrenciesColumns(ability);

  return (
    <Table
      columns={columns}
      handleTableChange={handleTableChange}
      onSearch={onSearch}
      isFetching={isFetching}
      data={data}
      status={status}
      isLoading={isLoading}
      isError={isError}
      error={error}
      modalComponent={
        <Modal
          allowed={ability.can("EXECUTE", "USERMERCHANT")}
          button={<Button type="primary">Create currency</Button>}
          content={Creator}
          header="Create currency"
          // dialogClassName="modal-creator"
        />
      }
    />
  );
}
