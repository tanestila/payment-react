import { useMemo } from "react";
import CustomModal from "../../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { AppAbility } from "../../../Components/Common/Can";
import { AdminType } from "../../../types/admins";
import { cutGuid } from "../../../helpers/cutGuid";
import { Copy } from "../../../Components/Common/CopyToClipboard";

export default function useAllTransactionsColumns(ability: AppAbility) {
  return useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "guid",
        key: "guid",
        search: "text",
        render: (text: any, record: any) => (
          <>
            <Copy text={text} />
            <Link className="link" to={`/about/processing/${text}`}>
              {cutGuid(text)}
            </Link>
          </>
        ),
      },
      {
        title: "Type",
        dataIndex: "transaction_type",
        key: "transaction_type",
        sorter: true,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (text: any, record: any) => (
          <i
            className={
              text === "Success"
                ? "icon-success icon green"
                : text === "Failed"
                ? "icon-failed icon red"
                : "far fa-pause-circle icon orange"
            }
          />
        ),
      },
      {
        title: "Active",
        dataIndex: "active",
        key: "active",
        align: "center",
        render: (text: any, record: any) => (
          <i
            className={
              text ? "icon-success icon green" : "icon-failed icon red"
            }
          />
        ),
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        align: "right",
        sorter: true,
      },
      {
        title: "Currency",
        dataIndex: "currency",
        key: "currency",
        align: "center",
        sorter: true,
      },
      {
        title: "Shop",
        dataIndex: "shop_name",
        key: "shop_name",
        sorter: true,
      },
      {
        title: "Terminal",
        dataIndex: "terminal_name",
        key: "terminal_name",
        sorter: true,
      },
      {
        title: "Created at",
        dataIndex: "created_at",
        key: "created_at",
        align: "center",
      },
      // ability.can("READ", "TRANSACTIONSPROCESSINGRATES") &&
      {
        title: "Rates",
        dataIndex: "rates",
        key: "rates",
        align: "center",
        // render: (text: any, record: any) => (
        //   <button type="button" className="btn btn-table">
        //     Show
        //   </button>
        // ),
      },
    ],
    [ability]
  );
}
