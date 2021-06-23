import { useMemo } from "react";
import { AppAbility } from "../../Components/Common/Can";
import CustomModal from "../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { ShopType } from "../../types/shops";
import Editor from "../../views/Shops/Editor";

export default function useShopsColumns(ability: AppAbility) {
  return useMemo(
    () => [
      {
        title: "Merchant name",
        dataIndex: "merchant_name",
        key: "merchant_name",
        sorter: true,
        search: "text",
        render: (text: string, record: ShopType) => (
          <Link className="link" to={`/about/merchant/${record.merchant_guid}`}>
            {text}
          </Link>
        ),
      },
      {
        title: "Shop name",
        dataIndex: "name",
        key: "name",
        sorter: true,
        search: "text",
        render: (text: string, record: ShopType) => (
          <Link className="link" to={`/about/shop/${record.guid}`}>
            {text}
          </Link>
        ),
      },
      {
        title: "Terminal count",
        dataIndex: "terminal_count",
        key: "terminal_count",
        sorter: true,
        search: "text",
      },
      {
        title: "Status",
        dataIndex: "enabled",
        key: "enabled",
        search: "bool",
        align: "center",
        render: (text: string, record: ShopType) => (
          <i
            className={
              record.enabled
                ? "icon-success green icon"
                : "icon-failed red icon"
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
        align: "center",
        render: (text: string, record: ShopType) => (
          <CustomModal
            header="Edit merchant"
            content={Editor}
            contentProps={{ guid: record.guid }}
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
