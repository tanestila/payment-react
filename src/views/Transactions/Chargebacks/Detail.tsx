import { Card, Alert } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { chargebacksAPI } from "../../../services/queries/management/transactions/chargebacks";
import { Loading } from "../../../Components/Common";
import { Table } from "react-bootstrap";
import { detailChargebackColumns } from "../../../constants/columns/transactions/chargebacks";

const columns = detailChargebackColumns;

export default function ChargebackDetail() {
  let history = useParams<{ id: string }>();

  const {
    data: chargeback,
    status,
    error,
  } = useQuery(["chargeback", history.id], () =>
    chargebacksAPI.getChargeback(history.id)
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
