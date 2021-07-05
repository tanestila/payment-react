import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import Creator from "./Creator";
import Modal from "../../../Components/Common/Modal";
import { partnersAPI } from "../../../services/queries/management/users/partners";
import { usePartnersColumns } from "../../../constants/columns";
import { Button } from "antd";
import { useMutation, useQueryClient } from "react-query";

export default function Partners() {
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
  } = useTableQuery("partners", partnersAPI.getPartners, true);

  const deletePartnerMutation = useMutation(partnersAPI.deletePartner, {
    onSuccess: () => {
      queryClient.invalidateQueries("partners");
    },
  });

  const columns = usePartnersColumns(ability, deletePartnerMutation);

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
          allowed={ability.can("EXECUTE", "USERPARTNER")}
          button={<Button type="primary">Create partner</Button>}
          content={Creator}
          header="Create partner"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
