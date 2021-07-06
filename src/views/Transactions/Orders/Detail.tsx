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
import Table from "../../../Components/TableFactory/Table";
import {
  useLoginColumns,
  useGroupMerchantsColumns,
} from "../../../constants/columns";
import { ordersAPI } from "../../../services/queries/report/orders";
import { formatDate } from "../../../helpers/formatDate";
import { Loading } from "../../../Components/Common";
import CustomModal from "../../../Components/Common/Modal";

import { useShopsColumnsForDetail } from "../../../constants/columns/shops";
import useGroupsAuditColumns from "../../../constants/columns/history/groups";

export default function OrderDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: order,
    status,
    error,
  } = useQuery(["order", history.id], () => ordersAPI.getOrder(history.id));

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
    <Row>
      <Space>
        <Col>
          <Card title={`Transaction guid ${order.guid}`}>
            <h5>Payment info</h5>
            <Descriptions
              // column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
              size="small"
            >
              <Descriptions.Item span={3} label="Type">
                {order.guid}
              </Descriptions.Item>
              <Descriptions.Item label="Test transaction">
                {order.type}
              </Descriptions.Item>
              <Descriptions.Item label="Recurring">
                {order.recurring}
              </Descriptions.Item>
              <Descriptions.Item label="Active">
                {order.active}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {order.spec_rate}
              </Descriptions.Item>
              <Descriptions.Item label="payment status">
                {order.payment_status}
              </Descriptions.Item>
              <Descriptions.Item label="TrackingId">
                {order.created_by_username}
              </Descriptions.Item>
              <Descriptions.Item label="Date">{order.date}</Descriptions.Item>
              <Descriptions.Item label="Amount">
                {order.amount}
              </Descriptions.Item>
              <Descriptions.Item label="Currency">
                {order.currency}
              </Descriptions.Item>
              <Descriptions.Item label="Merchant">
                {order.merchant_name}
              </Descriptions.Item>
              <Descriptions.Item label="Shop">
                {order.updated_by_username}
              </Descriptions.Item>
              <Descriptions.Item label="Terminal">
                {order.updated_by_username}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {order.description}
              </Descriptions.Item>
              <Descriptions.Item label="Hold release date">
                {order.hold_date}
              </Descriptions.Item>
              <Descriptions.Item label="Bank ID">
                {order.bank_id}
              </Descriptions.Item>
              <Descriptions.Item label="Client ID">
                {order.client_id}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col>
          <Space direction="vertical">
            <Card title={"Customer details"}>
              <Descriptions
                // column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                size="small"
              >
                <Descriptions.Item span={3} label="GUID">
                  {order.guid}
                </Descriptions.Item>
                <Descriptions.Item label="Type">{order.type}</Descriptions.Item>
                <Descriptions.Item label="Spec rate">
                  {order.spec_rate}
                </Descriptions.Item>
                <Descriptions.Item label="Created at">
                  {order.created_at}
                </Descriptions.Item>
                <Descriptions.Item label="Created by">
                  {order.created_by_username}
                </Descriptions.Item>
                <Descriptions.Item label="Updated at">
                  {order.updated_at}
                </Descriptions.Item>
                <Descriptions.Item label="Updated by">
                  {order.updated_by_username}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card title={"Billng addresss"}>
              <Descriptions
                // column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                size="small"
              >
                <Descriptions.Item span={3} label="GUID">
                  {order.guid}
                </Descriptions.Item>
                <Descriptions.Item label="Type">{order.type}</Descriptions.Item>
                <Descriptions.Item label="Spec rate">
                  {order.spec_rate}
                </Descriptions.Item>
                <Descriptions.Item label="Created at">
                  {order.created_at}
                </Descriptions.Item>
                <Descriptions.Item label="Created by">
                  {order.created_by_username}
                </Descriptions.Item>
                <Descriptions.Item label="Updated at">
                  {order.updated_at}
                </Descriptions.Item>
                <Descriptions.Item label="Updated by">
                  {order.updated_by_username}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Space>
        </Col>
      </Space>
    </Row>
  );
}
