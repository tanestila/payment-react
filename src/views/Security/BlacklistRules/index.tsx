import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { blackListRulesAPI } from "../../../services/queries/management/blacklist/rules";
import { useBacklistRulesColumns } from "../../../constants/columns";
import Modal from "../../../Components/Common/Modal";
import { Button } from "antd/lib/radio";
import Creator from "./Creator";
import { useMutation, useQueryClient } from "react-query";

export default function BlacklistRules() {
  const queryClient = useQueryClient();
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

  const deleteMutation = useMutation(blackListRulesAPI.deleteRule, {
    onSuccess: () => {
      queryClient.invalidateQueries("blacklist-rules");
    },
  });

  const columns = useBacklistRulesColumns(ability, deleteMutation);

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
          button={<Button type="primary">Create rule</Button>}
          content={Creator}
          header="Create rule"
          // dialogClassName="modal-creator"
        />
      }
    />
  );
}
