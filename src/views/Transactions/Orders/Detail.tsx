import { Card, Button, Alert } from "antd";
import { Row, Col, Badge } from "react-bootstrap";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { ordersAPI } from "../../../services/queries/report/orders";
import { Loading } from "../../../Components/Common";
import { Table } from "react-bootstrap";
import { formatDateForTable } from "../../../helpers/formatDate";
import BLButton from "./BLButton";

export default function OrderDetail() {
  let history = useParams<{ id: string }>();

  const {
    data: order,
    status,
    error,
  } = useQuery(["order", history.id], () => ordersAPI.getOrder(history.id));

  const countryClasses = useMemo(() => {
    return {
      ipFlagClasses: order
        ? ` flag ${order.billing_address.ip_country_code.toLowerCase()}`
        : "",
      binFlagClasses: order
        ? ` flag ${order.customer_details.bin_country.toLowerCase()}`
        : "",
      countryFlagClasses: order
        ? ` flag ${order.billing_address.country.toLowerCase()}`
        : "",
    };
  }, [order]);

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
    <Row>
      <Col>
        <Card title={`Transaction guid ${order.transaction_details.guid}`}>
          <h5>Payment info</h5>
          <Table responsive className="detailInfo">
            <tbody>
              <tr>
                <th>Type:</th>
                <td>{order.transaction_details.type}</td>
              </tr>
              <tr>
                <th>Test transaction:</th>
                <td>{order.transaction_details.test.toString()}</td>
              </tr>
              {order.transaction_details.three_d ? (
                <tr>
                  <th>3D:</th>
                  <td>{order.transaction_details.three_d.toString()}</td>
                </tr>
              ) : null}
              <tr>
                <th>Status:</th>
                <td>{order.transaction_details.status}</td>
              </tr>
              {order.transaction_details.status_code ? (
                <tr>
                  <th>Error:</th>
                  <td>
                    {order.transaction_details.status_code +
                      " " +
                      order.transaction_details.status_message}
                  </td>
                </tr>
              ) : null}
              <tr>
                <th>Payment status:</th>
                <td>
                  <Badge
                    className={`badge-order-${order.transaction_details.payment_status}`}
                  >
                    {order.transaction_details.payment_status}
                  </Badge>
                </td>
              </tr>
              <tr>
                <th>TrackingID:</th>
                <td>{order.transaction_details.tracking_id}</td>
              </tr>
              <tr>
                <th>Date:</th>
                <td>{formatDateForTable(order.transaction_details.date)}</td>
              </tr>
              <tr>
                <th>Amount:</th>
                <td>{order.transaction_details.amount}</td>
              </tr>
              <tr>
                <th>Currency:</th>
                <td>{order.transaction_details.currency}</td>
              </tr>
              <tr>
                <th>Merchant:</th>
                <td>
                  <Link
                    className="link"
                    to={`/about/merchant/${order.transaction_details.merchant_guid}`}
                  >
                    {order.transaction_details.merchant_name}
                  </Link>
                </td>
              </tr>
              <tr>
                <th>Shop:</th>
                <td>
                  <Link
                    className="link"
                    to={`/about/shop/${order.transaction_details.shop_guid}`}
                  >
                    {order.transaction_details.shop_name}
                  </Link>
                </td>
              </tr>
              <tr>
                <th>Terminal:</th>
                <td>
                  <Link
                    className="link"
                    to={`/about/${order.transaction_details.shop_guid}/terminal/${order.transaction_details.terminal_guid}`}
                  >
                    {order.transaction_details.terminal_name}
                  </Link>
                </td>
              </tr>
              <tr>
                <th>Description:</th>
                <td>{order.transaction_details.description}</td>
              </tr>
              {order.transaction_details.type === "Recurring" && (
                <tr>
                  <th>Recurring:</th>
                  <td>
                    {order.transaction_details.recurring ? "true" : "false"}
                  </td>
                </tr>
              )}
              {order.transaction_details.type === "Recurring" && (
                <tr>
                  <th>Recurring:</th>
                  <td>
                    {order.transaction_details.recurring_period_length}
                    {order.transaction_details.recurring_period_unit}
                  </td>
                </tr>
              )}
              {order.transaction_details.hold_date && (
                <tr>
                  <th>Hold release date:</th>
                  <td>
                    {formatDateForTable(order.transaction_details.hold_date)}
                  </td>
                </tr>
              )}

              {order.transaction_details.bank_id && (
                <tr>
                  <th>Bank ID:</th>
                  <td>{order.transaction_details.bank_id}</td>
                </tr>
              )}
              {order.transaction_details.client_id && (
                <tr>
                  <th>Client ID:</th>
                  <td>{order.transaction_details.client_id}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </Col>
      <Col>
        <Card title={"Customer details"}>
          <Table responsive className="detailInfo">
            <tbody>
              <tr>
                <th>Card holder:</th>
                <td>{order.customer_details.card_holder}</td>
                <td>
                  <BLButton
                    value={order.customer_details.card_number}
                    blType="mask"
                  />
                </td>
              </tr>
              <tr>
                <th>Card number:</th>
                <td>{order.customer_details.card_number}</td>
                <td>
                  <BLButton
                    value={order.customer_details.card_number}
                    blType="mask"
                    name={`order-tr-GUID-${order.transaction_details.guid}-mask`}
                    merchant_guid={order.transaction_details.merchant_guid}
                  />
                </td>
              </tr>
              <tr>
                <th>Card schema:</th>
                <td>{order.customer_details.card_schema}</td>
                <td></td>
              </tr>
              <tr>
                <th>Card type:</th>
                <td>{order.customer_details.card_type}</td>
                <td></td>
              </tr>
              <tr>
                <th>Euro card:</th>
                <td>{order.customer_details.card_eu}</td>
                <td></td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{order.customer_details.email}</td>
                <td>
                  <BLButton value={order.customer_details.email} type="email" />
                </td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td>{order.customer_details.phone}</td>
                <td></td>
              </tr>
              <tr>
                <th>IP:</th>
                <td>
                  <Row>
                    <Col>
                      {order.customer_details.ip}(
                      {order.billing_address.ip_country_code})
                    </Col>
                    <Col className="react-tel-input">
                      <div className={countryClasses.ipFlagClasses} />
                    </Col>
                  </Row>
                </td>
                <td>
                  <Button
                    value={order.customer_details.ip}
                    type="ip"
                    name={`order-tr-GUID-${order.transaction_details.guid}-ip`}
                    merchant_guid={order.transaction_details.merchant_guid}
                  />
                </td>
              </tr>
              <tr>
                <th>BIN country:</th>
                <td>
                  <Row>
                    <Col>{order.customer_details.bin_country}</Col>
                    <Col className="react-tel-input">
                      <div className={countryClasses.binFlagClasses} />
                    </Col>
                  </Row>
                </td>
                <td>
                  <Button
                    value={order.customer_details.bin_country}
                    type="country"
                    name={`order-tr-GUID-${order.transaction_details.guid}-country`}
                    merchant_guid={order.transaction_details.merchant_guid}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>
        <Card title={"Billng addresss"}>
          <Table responsive className="detailInfo">
            <tbody>
              <tr>
                <th>First name:</th>
                <td>{order.billing_address.first_name}</td>
              </tr>
              <tr>
                <th>Last name:</th>
                <td>{order.billing_address.last_name}</td>
              </tr>
              <tr>
                <th>Country:</th>
                <td>
                  <Row>
                    <Col>{order.billing_address.country}</Col>
                    <Col className="react-tel-input">
                      <div className={countryClasses.countryFlagClasses} />
                    </Col>
                  </Row>
                </td>
              </tr>
              <tr>
                <th>City</th>
                <td>{order.billing_address.city}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>{order.billing_address.address}</td>
              </tr>
              <tr>
                <th>Zip:</th>
                <td>{order.billing_address.zip}</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  );
}
