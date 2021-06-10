import { Link } from "react-router-dom";
import Table from "../../../Components/TableFactory/MainTable";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import Creator from "./Creator";
import Modal from "../../../Components/Common/Modal";
import { adminsAPI } from "../../../services/queries/management/users/admins";
import { PartnerType } from "../../../types/partners";

export default function Admins() {
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
  } = useTableQuery("admins", adminsAPI.getAdmins);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: true,
      search: "text",
      render: (text: string, record: PartnerType) => (
        <Link className="link" to={`/about/partner/${record.guid}`}>
          {text}
        </Link>
      ),
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
      render: (text: string, record: PartnerType) => (
        <i
          className={
            record.enabled ? "icon-success green icon" : "icon-failed red icon"
          }
        />
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",

    //   render: (text: any, record: any) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
    ability.can("EXECUTE", "USERADMIN") && {
      title: "Edit",
      key: "edit",
      render: (text: string, record: PartnerType) => (
        <Modal
          header="Edit merchant"
          content={<></>}
          contentProps={{ guid: record.partner_guid }}
          button={
            <i className="icon-edit icon gray" style={{ cursor: "pointer" }} />
          }
          // dialogClassName="modal-creator"
        />
      ),
    },
    ability.can("DELETE", "USERADMIN") && {
      title: "Delete",
      key: "delete",
      render: () => <span>delete</span>,
    },
  ];

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
