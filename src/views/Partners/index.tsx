import { Link } from "react-router-dom";
import Table from "../../Components/TableFactory";
import useTableQuery from "../../Components/TableFactory/useTableQuery";
import { Space } from "antd";
import { useContext } from "react";
import { AbilityContext } from "../../Components/Common/Can";
import Creator from "./Creator";
import Modal from "../../Components/Common/Modal";
import { partnerAPI } from "../../services/queries/management/partner";
import { PartnerType } from "../../types/partners";

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
  } = useTableQuery("partners", partnerAPI.getPartners);

  const columns = [
    {
      title: "Partner name",
      dataIndex: "partner_name",
      key: "partner_name",
      sorter: true,
      search: "text",
      render: (text: string, record: PartnerType) => (
        <Link className="link" to={`/about/partner/${record.partner_guid}`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Partner type",
      dataIndex: "partner_type",
      key: "partner_type",
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
    ability.can("EXECUTE", "USERMERCHANT") && {
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
    ability.can("DELETE", "USERMERCHANT") && {
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
