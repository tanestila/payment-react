import { useContext } from "react";
import Table from "../../../Components/TableFactory/MainTable";
import { AbilityContext } from "../../../Components/Common/Can";
import Modal from "../../../Components/Common/Modal";
import Creator from "./Creator";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useGroupsColumns } from "../../../constants/columns";
import { Button } from "antd";
import { useMutation, useQueryClient } from "react-query";

export default function Groups() {
  const ability = useContext(AbilityContext);
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    handleTableChange,
    onSearch,
    status,
  } = useTableQuery("groups", groupsAPI.getGroups, true);

  const deleteGroupMutation = useMutation(groupsAPI.deleteGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
  });

  const columns = useGroupsColumns(ability, deleteGroupMutation);

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
      rowKey={"login_guid"}
      modalComponent={
        <Modal
          allowed={ability.can("EXECUTE", "USERGROUP")}
          button={<Button type="primary">Create group</Button>}
          content={Creator}
          header="Create group"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
