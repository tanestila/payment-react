import { useContext, useMemo } from "react";
import Table from "../../../Components/TableFactory";
import { Link } from "react-router-dom";
import { AbilityContext } from "../../../Components/Common/Can";
import Modal from "../../../Components/Common/Modal";
import Editor from "./Editor";
import Creator from "./Creator";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { GroupType } from "../../../types/groups";
import { DeleteModal } from "../../../Components/Common/DeleteModal";

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
  } = useTableQuery("groups", groupsAPI.getGroups);

  const columns = useMemo(
    () => [
      {
        title: "Group name",
        dataIndex: "group_name",
        key: "group_name",
        sorter: true,
        search: "text",
        render: (text: string, record: GroupType) => (
          <Link className="link" to={`/about/group/${record.group_guid}`}>
            {text}
          </Link>
        ),
      },
      {
        title: "Group type",
        dataIndex: "group_type",
        key: "group_type",
        sorter: true,
        search: "text",
      },
      {
        title: "Partner",
        dataIndex: "partner_name",
        key: "partner_name",
        sorter: true,
        search: "text",
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "group_name",
        sorter: true,
        search: "text",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        sorter: true,
        search: "text",
      },
      {
        title: "Status",
        dataIndex: "enabled",
        key: "enabled",
        search: "bool",
        render: (text: any, record: any) => (
          <i
            className={
              record.enabled
                ? "icon-success green icon"
                : "icon-failed red icon"
            }
          />
        ),
      },

      ability.can("EXECUTE", "USERMERCHANT") && {
        title: "Edit",
        key: "edit",
        render: (text: string, record: GroupType) => (
          <Modal
            header="Edit merchant"
            content={Editor}
            contentProps={{ guid: record.group_guid }}
            button={
              <i
                className="icon-edit icon gray"
                style={{ cursor: "pointer" }}
              />
            }
            // dialogClassName="modal-creator"
          />
        ),
      },
      ability.can("DELETE", "USERMERCHANT") && {
        title: "Delete",
        key: "delete",
        render: (text: string, record: GroupType) => (
          <i
            className="far fa-trash-alt  icon red"
            style={{ cursor: "pointer" }}
            onClick={() => DeleteModal(() => {}, record.group_guid)}
          />
        ),
      },
    ],
    [ability]
  );

  return (
    <Table
      columns={columns}
      handleTableChange={handleTableChange}
      onSearch={onSearch}
      search={search}
      isFetching={isFetching}
      data={data}
      items={items}
      isLoading={isLoading}
      isError={isError}
      error={error}
      modalComponent={
        <Modal
          allowed={ability.can("EXECUTE", "USERMERCHANT")}
          // allowed={true}
          button={
            <button className="btn btn-fill btn-primary">Create partner</button>
          }
          content={Creator}
          header="Create merchant"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
