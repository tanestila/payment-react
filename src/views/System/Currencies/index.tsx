import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { Creator } from "./Creator";
import Modal from "../../../Components/Common/Modal";
import { currenciesAPI } from "../../../services/queries/management/currencies";
import { PartnerType } from "../../../types/partners";
import { DeleteModal } from "../../../Components/Common/DeleteModal";
import { useCurrenciesColumns } from "../../../constants/columns";

export default function Currencies() {
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
  } = useTableQuery("currencies", currenciesAPI.getCurrencies, true);

  const columns = useCurrenciesColumns(ability);

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
