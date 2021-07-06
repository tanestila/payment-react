import { useMemo } from "react";
import CustomModal from "../../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { AppAbility } from "../../../Components/Common/Can";
import { AdminType } from "../../../types/admins";
import { cutGuid } from "../../../helpers/cutGuid";
import { Copy } from "../../../Components/Common/CopyToClipboard";

export default function useMismatchTransactionsColumns(ability: AppAbility) {
  return useMemo(
    () => [
      {
        title: "Transaction ID",
        dataIndex: "guid",
        key: "guid",
        render: (text: any, record: any) => (
          <>
            {/* <Copy text={transaction.guid} /> */}
            <Link className="link" to={`/about/mismatch/${text}`}>
              {cutGuid(text)}
            </Link>
          </>
        ),
      },
      {
        title: "Payment ID",
        dataIndex: "payment_id",
        key: "payment_id",
        sorter: true,
      },
      {
        title: "Card number",
        dataIndex: "card_number",
        key: "card_number",
        sorter: true,
        render: (text: string, record: any) =>
          text.substr(0, 4) + "****" + text.substr(text.length - 4, 4),
      },
      {
        title: "Card schema",
        dataIndex: "card_schema",
        key: "card_schema",
        sorter: true,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        sorter: true,
      },
      {
        title: "Currency",
        dataIndex: "currency_code",
        key: "currency_code",
        sorter: true,
      },
      {
        title: "Card number decta",
        dataIndex: "card_number_decta",
        key: "card_number_decta",
        sorter: true,
        render: (text: string, record: any) =>
          text.substr(0, 4) + "****" + text.substr(text.length - 4, 4),
      },
      {
        title: "Card schema decta",
        dataIndex: "card_schema_decta",
        key: "card_schema_decta",
        sorter: true,
      },
      {
        title: "Amount decta",
        dataIndex: "amount_decta",
        key: "amount_decta",
        sorter: true,
      },
      {
        title: "Currency decta",
        dataIndex: "currency_code_decta",
        key: "currency_code_decta",
        sorter: true,
      },
      {
        title: "Created at",
        dataIndex: "created_at",
        key: "created_at",
        sorter: true,
      },
    ],
    [ability]
  );
}
