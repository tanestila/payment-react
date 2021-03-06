import { Card, Alert } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Loading } from "../../../Components/Common";
import { Table } from "react-bootstrap";
import { mismatchAPI } from "../../../services/queries/management/transactions/mismatch";

const parameters = [
  { path: "card_number", label: "card_number" },
  { path: "merchant_name", label: "merchant_name" },
  { path: "merchant_id", label: "merchant_id" },
  { path: "card_schema", label: "card_schema" },
  { path: "amount", label: "amount" },
  { path: "currency_code", label: "currency_code" },
  { path: "tr_type", label: "tr_type" },
  { path: "proc_code", label: "proc_code" },
  { path: "issuer_country", label: "issuer_country" },
  { path: "proc_region", label: "proc_region" },
  { path: "merchant_country", label: "merchant_country" },
  { path: "tran_region", label: "tran_region" },
  { path: "card_product_type", label: "card_product_class" },
];

export default function MismatchDetail() {
  let history = useParams<{ id: string }>();

  const {
    data: mismatchTransaction,
    status,
    error,
  } = useQuery(["mismatch-transaction", history.id], () =>
    mismatchAPI.getMismatchTransaction(history.id)
  );

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
      <Card title={`Chargeback guid ${mismatchTransaction.guid}`}>
        <Table responsive className="detailInfo">
          <tbody>
            <tr>
              <th>transaction_processing_guid:</th>
              <td>{mismatchTransaction.transaction_processing_guid}</td>
            </tr>
            <tr>
              <th>payment_id:</th>
              <td>{mismatchTransaction.payment_id}</td>
            </tr>
            <tr>
              <th>created_at:</th>
              <td>{mismatchTransaction.created_at}</td>
            </tr>
          </tbody>
        </Table>
      </Card>
      <Card title={`Info`}>
        <Table responsive className="detailInfo">
          <tbody>
            <tr>
              <th>parameters</th>
              <th>Our </th>
              <th>Decta </th>
            </tr>
            {parameters.map((item) => (
              <tr key={item.path}>
                <td>{item.label}</td>
                <td>{mismatchTransaction[item.path]}</td>
                <td>{mismatchTransaction.decta[item.path]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
