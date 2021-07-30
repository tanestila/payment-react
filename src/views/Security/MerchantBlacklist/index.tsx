import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { useBacklistMerchantColumns } from "../../../constants/columns";
import { MerchantBlackListAPI } from "../../../services/queries/management/blacklist/merchant";
import Modal from "../../../Components/Common/Modal";
import { Button } from "antd/lib/radio";
import Creator from "./Creator";
import { useMutation, useQueryClient } from "react-query";

export default function MerchantBlacklist() {
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
  } = useTableQuery(
    "merchant-blacklist",
    MerchantBlackListAPI.getMerchantBlacklist,
    true
  );

  const deleteMutation = useMutation(
    MerchantBlackListAPI.deleteMerchantBlacklist,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("merchant-blacklist");
      },
    }
  );

  const columns = useBacklistMerchantColumns(ability, deleteMutation);

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
          button={<Button type="primary">Create record</Button>}
          content={Creator}
          header="Create record"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
