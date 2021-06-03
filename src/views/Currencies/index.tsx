import Table from "../../Components/TableFactory";
import useTableQuery from "../../Components/TableFactory/useTableQuery";
import { useContext } from "react";
import { AbilityContext } from "../../Components/Common/Can";
import Creator from "./Creator";
import Modal from "../../Components/Common/Modal";
import { currenciesAPI } from "../../services/queries/management/currencies";
import { PartnerType } from "../../types/partners";

export default function Currencies() {
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
  } = useTableQuery("currencies", currenciesAPI.getCurrencies);

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      sorter: true,
      search: "text",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      search: "text",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      sorter: true,
      search: "text",
    },
    {
      title: "Rate (EUR)",
      dataIndex: "rate_to_eur",
      key: "rate_to_eur",
      sorter: true,
      search: "text",
    },
    {
      title: "Exchange markup value",
      dataIndex: "exchange_markup_value",
      key: "exchange_markup_value",
    },
    {
      title: "Exchange markup type",
      dataIndex: "isFlat",
      key: "isFlat",
      render: (text: any) => (text === true ? "Flat" : "Percent"),
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
          content={Creator}
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
            <button className="btn btn-fill btn-primary">
              Create currency
            </button>
          }
          content={Creator}
          header="Create currency"
          dialogClassName="modal-creator"
        />
      }
    />
  );
}
