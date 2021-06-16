import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import Creator from "./Creator";
import Modal from "../../../Components/Common/Modal";
import { partnersAPI } from "../../../services/queries/management/users/partners";
import { usePartnersColumns } from "../../../constants/columns";
import { Button } from "antd";

export default function Partners() {
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
  } = useTableQuery("partners", partnersAPI.getPartners);

  const columns = usePartnersColumns(ability);

  return (
    <Table
      columns={columns}
      handleTableChange={handleTableChange}
      onSearch={onSearch}
      search={search}
      isFetching={isFetching}
      data={data}
      items={items}
      status={status}
      isLoading={isLoading}
      isError={isError}
      error={error}
      rowKey={"login_guid"}
      modalComponent={
        <Modal
          allowed={ability.can("EXECUTE", "USERMERCHANT")}
          button={<Button type="primary">Create partner</Button>}
          content={Creator}
          header="Create merchant"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
