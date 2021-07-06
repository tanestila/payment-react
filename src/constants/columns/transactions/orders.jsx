import { useMemo } from "react";
import CustomModal from "../../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { AppAbility } from "../../../Components/Common/Can";
import { AdminType } from "../../../types/admins";
import { cutGuid } from "../../../helpers/cutGuid";
import { Copy } from "../../../Components/Common/CopyToClipboard";

export default function useOrdersColumns(ability: AppAbility) {
  return useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "guid",
        key: "guid",
        render: (text: any, record: any) => (
          <>
            <Copy text={text} />
            <Link className="link" to={`/about/order/${text}`}>
              {cutGuid(text)}
            </Link>
          </>
        ),
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        sorter: true,
      },
      {
        title: "Payment status",
        dataIndex: "status",
        key: "status",
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
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        sorter: true,
      },
      {
        title: "Currency",
        dataIndex: "currency",
        key: "currency",
        sorter: true,
      },
      {
        title: "Card schema",
        dataIndex: "card_schema",
        key: "card_schema",
      },
      {
        title: "Card holder",
        dataIndex: "card_holder",
        key: "card_holder",
      },
      {
        title: "Credit card",
        dataIndex: "card_number",
        key: "card_number",
      },
      {
        title: "Merchant name",
        dataIndex: "merchant_name",
        key: "merchant_name",
      },
      {
        title: "shop name",
        dataIndex: "shop_name",
        key: "shop_name",
      },
      {
        title: "merchant tracing id",
        dataIndex: "tracking_id",
        key: "tracking_id",
      },
    ],
    [ability]
  );
}
