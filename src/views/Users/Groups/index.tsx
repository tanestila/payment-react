import { useContext } from "react";
import Table from "../../../Components/TableFactory/MainTable";
import { AbilityContext } from "../../../Components/Common/Can";
import Modal from "../../../Components/Common/Modal";
import Creator from "./Creator";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useGroupsColumns } from "../../../constants/columns";
import { Button } from "antd";

export default function Groups() {
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
    status,
  } = useTableQuery("groups", groupsAPI.getGroups, true);

  const columns = useGroupsColumns(ability);

  return (
    <Table
      columns={columns}
      handleTableChange={handleTableChange}
      onSearch={onSearch}
      search={search}
      isFetching={isFetching}
      data={data}
      status={status}
      isLoading={isLoading}
      isError={isError}
      error={error}
      modalComponent={
        <Modal
          allowed={ability.can("EXECUTE", "USERMERCHANT")}
          button={<Button type="primary">Create group</Button>}
          content={Creator}
          header="Create merchant"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
