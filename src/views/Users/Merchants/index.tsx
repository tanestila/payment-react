import { useContext } from "react";
import Table from "../../../Components/TableFactory/MainTable";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import { AbilityContext } from "../../../Components/Common/Can";
import Modal from "../../../Components/Common/Modal";
import Creator from "./Creator";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useMerchantsColumns } from "../../../constants/columns";
import { Button } from "antd";
import { useMutation, useQueryClient } from "react-query";

export default function Merchants() {
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
  } = useTableQuery("merchants", merchantsAPI.getMerchants, true);

  const deleteMerchantMutation = useMutation(merchantsAPI.deleteMerchant, {
    onSuccess: () => {
      queryClient.invalidateQueries("merchants");
    },
  });

  const columns = useMerchantsColumns(ability, deleteMerchantMutation);

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
      searchQuery={{ gateways: true }}
      rowKey={"login_guid"}
      modalComponent={
        <Modal
          allowed={ability.can("EXECUTE", "USERMERCHANT")}
          button={<Button type="primary">Create merchant</Button>}
          content={Creator}
          header="Create merchant"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
