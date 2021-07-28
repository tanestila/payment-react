import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { useBacklistMerchantColumns } from "../../../constants/columns";
import { MerchantBlackListAPI } from "../../../services/queries/management/blacklist/merchant";
import Modal from "../../../Components/Common/Modal";
import { Button } from "antd/lib/radio";
import Creator from "./Creator";

export default function MerchantBlacklist() {
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

  const columns = useBacklistMerchantColumns(ability);

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
