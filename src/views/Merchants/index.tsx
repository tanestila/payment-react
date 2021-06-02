import { useContext, useMemo } from "react";
import Table from "../../Components/TableFactory";
import { merchantAPI } from "../../services/queries/management/merchant";
import { Link } from "react-router-dom";
import { AbilityContext } from "../../Components/Common/Can";
import Modal from "../../Components/Common/Modal";
import { MerchantType } from "../../types/merchants";
import Editor from "./Editor";
import Creator from "./Creator";
import useTableQuery from "../../Components/TableFactory/useTableQuery";

export default function Merchants() {
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
  } = useTableQuery("merchants", merchantAPI.getMerchants);

  // useEffect(() => {
  //   dispatch(setNewTable("merchant"));
  // }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        title: "Merchant name",
        dataIndex: "merchant_name",
        key: "merchant_name",
        sorter: true,
        search: "text",
        render: (text: any) => (
          <Link className="link" to={`/about/merchant/${text}`}>
            {text}
          </Link>
        ),
      },
      {
        title: "Merchant type",
        dataIndex: "merchant_type",
        key: "merchant_type",
        sorter: true,
        search: "text",
      },
      {
        title: "Group",
        dataIndex: "group_name",
        key: "group_name",
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
        title: "Gateways",
        dataIndex: "gateways",
        key: "gateways",
        search: "gateways",
        render: (text: any, record: any) => record.gateways.join(", "),
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
      {
        title: "Status",
        dataIndex: "enabled",
        key: "enabled",
        search: "bool",
        width: 70,
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
        render: (cellInfo: MerchantType) => (
          <Modal
            header="Edit merchant"
            content={Editor}
            contentProps={{ guid: cellInfo.merchant_guid }}
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
        render: () => <span>delete</span>,
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
      searchQuery={{ gateways: true }}
      modalComponent={
        <Modal
          allowed={ability.can("EXECUTE", "USERMERCHANT")}
          // allowed={true}
          button={
            <button className="btn btn-fill btn-primary">
              Create merchant
            </button>
          }
          content={Creator}
          header="Create merchant"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
