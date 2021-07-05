import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import Creator from "./Creator";
import Modal from "../../../Components/Common/Modal";
import { adminsAPI } from "../../../services/queries/management/users/admins";
import { useAdminsColumns } from "../../../constants/columns";
import { Button } from "antd";
import { useMutation, useQueryClient } from "react-query";

export default function Admins() {
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
  } = useTableQuery("admins", adminsAPI.getAdmins, true);

  const deleteAdminMutation = useMutation(adminsAPI.deleteAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries("admins");
    },
  });

  const columns = useAdminsColumns(ability, deleteAdminMutation);

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
