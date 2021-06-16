import { useMemo } from "react";
import { AppAbility } from "../../Components/Common/Can";
import { DeleteModal } from "../../Components/Common/DeleteModal";
import CustomModal from "../../Components/Common/Modal";
import { Creator } from "../../views/Currencies/Creator";

export default function useCurrenciesColumns(ability: AppAbility) {
  return useMemo(
    () => [
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
          <CustomModal
            header="Edit merchant"
            content={Creator}
            contentProps={{ guid: record.partner_guid }}
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
        render: (text: string, record: PartnerType) => (
          <i
            className="far fa-trash-alt  icon red"
            style={{ cursor: "pointer" }}
            onClick={() => DeleteModal(() => {}, record.guid)}
          />
        ),
      },
    ],
    [ability]
  );
}
