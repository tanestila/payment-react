import {
  Card,
  Descriptions,
  Divider,
  Button,
  Row,
  Space,
  Alert,
  Col,
} from "antd";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { AbilityContext } from "../../../Components/Common/Can";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { auditAPI } from "../../../services/queries/audit";
import {
  useLoginColumns,
  useGroupMerchantsColumns,
} from "../../../constants/columns";
import { chargebacksAPI } from "../../../services/queries/management/transactions/chargebacks";
import { formatDate } from "../../../helpers/formatDate";
import { Loading } from "../../../Components/Common";
import CustomModal from "../../../Components/Common/Modal";

import { useShopsColumnsForDetail } from "../../../constants/columns/shops";
import useGroupsAuditColumns from "../../../constants/columns/history/groups";
import { Table } from "react-bootstrap";

const columns = [
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

export default function ChargebackDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: chargeback,
    status,
    error,
  } = useQuery(["chargeback", history.id], () =>
    chargebacksAPI.getChargeback(history.id)
  );

  // const deleteGroupLoginMutation = useMutation(groupsAPI.deleteGroupLogin, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("group-logins");
  //   },
  // });

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    let errorObj = error as any;
    return (
      <Alert
        message="Error"
        description={errorObj.message}
        type="error"
        showIcon
      />
    );
  }

  return (
    <>
      <Card title={`Chargeback guid ${chargeback.guid}`}>
        <Table responsive className="detailInfo">
          <tbody>
            {columns.map((item) => (
              <tr key={item.label}>
                <th>{item.label}:</th>
                <td>{chargeback[item.path] ? chargeback[item.path] : null}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
