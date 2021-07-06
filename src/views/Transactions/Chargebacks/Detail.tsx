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
import { chargebacksAPI } from "../../../services/queries/management/transactions/chargebacks";
import { formatDate } from "../../../helpers/formatDate";
import { Loading } from "../../../Components/Common";
import CustomModal from "../../../Components/Common/Modal";

import { useShopsColumnsForDetail } from "../../../constants/columns/shops";
import useGroupsAuditColumns from "../../../constants/columns/history/groups";

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
        <Descriptions
          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          size="small"
        >
          <Descriptions.Item label="GUID">{chargeback.guid}</Descriptions.Item>
          <Descriptions.Item label="Type">{chargeback.type}</Descriptions.Item>
          <Descriptions.Item label="Spec rate">
            {chargeback.spec_rate}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {chargeback.created_at}
          </Descriptions.Item>
          <Descriptions.Item label="Created by">
            {chargeback.created_by_username}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {chargeback.updated_at}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {chargeback.updated_by_username}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
}
