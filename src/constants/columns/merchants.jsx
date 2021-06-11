import { useMemo } from "react";
import CustomModal from "../../Components/Common/Modal";
import { Button } from "antd";
import Editor from "../../views/Users/Merchants/Editor";
import { MerchantType } from "../../types/merchants";
import { Link } from "react-router-dom";

export default function useMerchantsColumns(ability) {
  return useMemo(
    () => [
      {
        title: "Merchant name",
        dataIndex: "merchant_name",
        key: "merchant_name",
        sorter: true,
        search: "text",
        render: (text: any, record: any) => (
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
        title: "Edit",
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
        title: "Delete",
        key: "delete",
        align: "center",
        render: () => <span>delete</span>,
      },
    ],
    [ability]
  );
}
