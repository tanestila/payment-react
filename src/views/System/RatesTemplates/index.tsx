import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import Creator from "./Creator";
import Modal from "../../../Components/Common/Modal";
import { useRatesTemplatesColumns } from "../../../constants/columns";
import { ratesAPI } from "../../../services/queries/management/rates";
import { Button } from "antd";

export default function RatesTemplates() {
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
  } = useTableQuery("rate-templates", ratesAPI.getRatesTemplates, true);

  const columns = useRatesTemplatesColumns(ability);

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
          button={<Button type="primary">Create template</Button>}
          content={Creator}
          header="Create template"
          // dialogClassName="modal-creator"
        />
      }
    />
  );
}
