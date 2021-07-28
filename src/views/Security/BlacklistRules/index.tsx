import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { blackListRulesAPI } from "../../../services/queries/management/blacklist/rules";
import { useBacklistRulesColumns } from "../../../constants/columns";
import Modal from "../../../Components/Common/Modal";
import { Button } from "antd/lib/radio";
import Creator from "./Creator";

export default function BlacklistRules() {
  const ability = useContext(AbilityContext);
  const {
    isLoading,
    isError,
    error,
    status,
    data,
    isFetching,
    handleTableChange,
    onSearch,
  } = useTableQuery("blacklist-rules", blackListRulesAPI.getRules, true);

  const columns = useBacklistRulesColumns(ability);

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
          allowed={ability.can("EXECUTE", "USERADMIN")}
          button={<Button type="primary">Create admin</Button>}
          content={Creator}
          header="Create admin"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
