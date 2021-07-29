import { useMemo } from "react";
import CustomModal from "../../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { AppAbility } from "../../../Components/Common/Can";
import { AdminType } from "../../../types/admins";
import { cutGuid } from "../../../helpers/cutGuid";
import { Copy } from "../../../Components/Common/CopyToClipboard";

export default function useChargebacksColumns(ability: AppAbility) {
  return useMemo(
    () => [
      {
        title: "Chargeback ID",
        dataIndex: "guid",
        key: "guid",
        render: (text: any, record: any) => (
          <>
            {/* <Copy text={transaction.guid} /> */}
            <Link className="link" to={`/about/chargeback/${text}`}>
              {cutGuid(text)}
            </Link>
          </>
        ),
      },
      {
        title: "Created at",
        dataIndex: "created_at",
        key: "created_at",
        sorter: true,
      },
      {
        title: "Transaction ID",
        dataIndex: "transaction_processing_guid",
        key: "transaction_processing_guid",
        sorter: true,
        render: (text: any, record: any) => (
          <>
            {/* <Copy text={transaction.guid} /> */}
            <Link className="link" to={`/about/order/${text}`}>
              {cutGuid(text)}
            </Link>
          </>
        ),
      },
      {
        title: "Card type",
        dataIndex: "card_type",
        key: "card_type",
        sorter: true,
      },
      {
        title: "Reason code",
        dataIndex: "reason_code",
        key: "reason_code",
        sorter: true,
      },
      {
        title: "Merchant name",
        dataIndex: "merchant_name",
        key: "merchant_name",
        sorter: true,
        render: (text: any, record: any) => (
          <>
            {/* <Copy text={transaction.guid} /> */}
            <Link className="link" to={`/about/merchant/${text}`}>
              {cutGuid(text)}
            </Link>
          </>
        ),
      },
      {
        title: "Shop",
        dataIndex: "shop_name",
        key: "shop_name",
        sorter: true,
        render: (text: any, record: any) => (
          <>
            {/* <Copy text={transaction.guid} /> */}
            <Link className="link" to={`/about/shop/${text}`}>
              {cutGuid(text)}
            </Link>
          </>
        ),
      },
      {
        title: "Terminal",
        dataIndex: "terminal_guid",
        key: "terminal_guid",
        sorter: true,
        render: (text: any, record: any) => (
          <>
            {/* <Copy text={transaction.guid} /> */}
            <Link className="link" to={`/about/terminal/${text}`}>
              {cutGuid(text)}
            </Link>
          </>
        ),
      },
      {
        title: "Chargeback amount",
        dataIndex: "chb_amount",
        key: "chb_amount",
        sorter: true,
      },
      {
        title: "Chargeback process date",
        dataIndex: "chb_proc_date",
        key: "chb_proc_date",
        sorter: true,
      },
      {
        title: "Transaction amount",
        dataIndex: "tr_amount",
        key: "tr_amount",
        sorter: true,
      },
      {
        title: "Transaction process date",
        dataIndex: "tr_date_time",
        key: "tr_date_time",
        sorter: true,
      },
    ],
    [ability]
  );
}

export const detailChargebackColumns = [
  { label: "Payment ID", path: "payment_id" },
  { label: "Type", path: "type" },
  { label: "Amount", path: "amount" },
  { label: "Currency", path: "ccy" },
  { label: "Card", path: "card" },
  { label: "Card acceptor ID", path: "card_acceptor_id" },
  { label: "Card type", path: "card_type_chargeback" },
  { label: "Transaction date", path: "chb_tr_date" },
  {
    label: "Transaction processing guid",
    path: "transaction_processing_guid",
  },
  { label: "Settlement date", path: "settlement_date" },
  { label: "Transaction amount", path: "tr_amount" },
  { label: "Transaction currency", path: "tr_ccy" },
  { label: "Transaction date", path: "tr_date" },
  { label: "Transaction date time", path: "tr_date_time" },
  { label: "Chargeback amount", path: "chb_amount" },
  { label: "Chargeback currency", path: "chb_ccy" },
  {
    label: "Chargeback amount transaction currency",
    path: "chb_amount_transaction_ccy",
  },
  { label: "Chargeback processing date", path: "chb_proc_date" },
  { label: "Chargeback reference number", path: "chb_refer_num" },
  {
    label: "Chargeback amount in Acquirer scheme settlement currency",
    path: "chb_settl_amount",
  },
  { label: "Acquirer scheme settlement currency", path: "chb_settl_ccy" },
  {
    label: "Representment response amount in Chargeback currency",
    path: "repr_amount",
  },
  { label: "Representment currency", path: "repr_ccy" },
  {
    label: "Representment  response amount in original Transaction currency",
    path: "repr_amount_transaction_ccy",
  },
  { label: "Representment response processing date", path: "repr_proc_date" },
  { label: "Reversal amount", path: "rev_amount" },
  { label: "Reversal currency", path: "rev_ccy" },
  { label: "Reversal date", path: "rev_date_time" },

  { label: "Function code", path: "function_code" },
  { label: "Function code name", path: "function_code_name" },
  { label: "Merchant ID", path: "merchant_id" },
  { label: "Merchant legal name", path: "merchant_legal_name" },
  { label: "Parent merchant ID", path: "parent_mrch_id" },
  { label: "Parent merchant name", path: "parent_mrch_name" },
  {
    label: "Indicator of Chargeback/Dispute supporting documentation",
    path: "doc_indicator",
  },
  { label: "Merchant name documentation", path: "merchant_name_doc" },
  { label: "Reversal indicator", path: "rev_indicator" },
  { label: "Case date", path: "case_date" },
  { label: "Case status", path: "case_stage" },
  {
    label: "Deadline when Merchant decisions should be provided to DECTA",
    path: "deadline_for_answers",
  },
  { label: "Merchant decision", path: "merchant_decision" },
  { label: "Merchant response date", path: "merchant_resp_date" },
  { label: "Merchant response", path: "merchant_response" },
  {
    label: "Date when Pre-Arbitration/Arbitration case received by DECTA",
    path: "financial_date",
  },

  { label: "Reason", path: "reason" },
  { label: "Reason code", path: "reason_code" },

  { label: "Acquirer BIN", path: "acq_bin" },
  { label: "Acquirer reference number", path: "acq_ref_nr" },
  {
    label: "Retrieval request reference number as provided by Issuer",
    path: "rr_refer_num",
  },
  { label: "Merchant IBAN", path: "merchant_iban_code" },
  { label: "Electronic Commerce Indicator for Visa cards", path: "eci" },
  {
    label:
      "Electronic Commerce Indicator (for Visa cards) Security Level Indicator (for Mastercard cards)",
    path: "eci_sli",
  },
  { label: "IPSP", path: "ipsp" },
  { label: "Transaction Identifier", path: "xid" },
  { label: "Transaction retrieval reference number", path: "tr_ret_ref_nr" },

  { label: "Merchant category code", path: "mcc_code" },
  { label: "Company name", path: "company_name" },

  { label: "Merchant comments", path: "merchant_comments" },
  { label: "Decta comments", path: "decta_comments" },
  { label: "Comments", path: "comments" },
  { label: "Source file", path: "source_file" },

  { label: "Terminal guid", path: "terminal_guid" },
  { label: "Shop", path: "shop_name" },
  { label: "Merchant", path: "merchant_name" },
  { label: "Group", path: "group_name" },
  { label: "Partner", path: "partner_name" },

  { label: "Created at", path: "created_at" },
  { label: "Created by", path: "created_by_username" },
  { label: "Updated at", path: "updated_at" },
  { label: "Updated by", path: "updated_by_username" },
];
