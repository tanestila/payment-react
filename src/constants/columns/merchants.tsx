import { useMemo } from "react";
import CustomModal from "../../Components/Common/Modal";
import Editor from "../../views/Users/Merchants/Editor";
import { MerchantType } from "../../types/merchants";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../Components/Common/DeleteModal";
import { AppAbility } from "../../Components/Common/Can";

export default function useMerchantsColumns(ability: AppAbility) {
  return useMemo(
    () => [
      {
        title: "Merchant name",
        dataIndex: "merchant_name",
        key: "merchant_name",
        sorter: true,
        search: "text",
        render: (text: any, record: MerchantType) => (
          <Link className="link" to={`/about/merchant/${record.merchant_guid}`}>
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
        width: 300,
        key: "gateways",
        search: "gateways",
        render: (text: any, record: MerchantType) => record.gateways.join(", "),
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
        align: "center",
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
        title: "",
        key: "edit",
        align: "center",
        render: (cellInfo: MerchantType) => (
          <CustomModal
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
        title: "",
        key: "delete",
        align: "center",
        render: (text: string, record: MerchantType) => (
          <i
            className="far fa-trash-alt  icon red"
            style={{ cursor: "pointer" }}
            onClick={() => DeleteModal(() => {}, record.merchant_guid)}
          />
        ),
      },
    ],
    [ability]
  );
}
