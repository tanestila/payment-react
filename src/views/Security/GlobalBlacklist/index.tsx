import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { useBacklistGlobalColumns } from "../../../constants/columns";
import { GlobalBlackListAPI } from "../../../services/queries/management/blacklist/global";
import Modal from "../../../Components/Common/Modal";
import { Button } from "antd/lib/radio";
import Creator from "./Creator";

export default function GlobalBlacklist() {
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
    "global-blacklist",
    GlobalBlackListAPI.getGlobalBlacklist,
    true
  );

  const columns = useBacklistGlobalColumns(ability);

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
