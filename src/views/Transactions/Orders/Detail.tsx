import {
  Card,
  Descriptions,
  Divider,
  Button,
  Row,
  Progress,
  Alert,
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
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { formatDate } from "../../../helpers/formatDate";
import { Loading } from "../../../Components/Common";
import CustomModal from "../../../Components/Common/Modal";

import { useShopsColumnsForDetail } from "../../../constants/columns/shops";
import useGroupsAuditColumns from "../../../constants/columns/history/groups";

export default function GroupDetail() {
  const ability = useContext(AbilityContext);
  let history = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: group,
    status,
    error,
  } = useQuery(["group", history.id], () => groupsAPI.getGroup(history.id));

  const deleteGroupLoginMutation = useMutation(groupsAPI.deleteGroupLogin, {
    onSuccess: () => {
      queryClient.invalidateQueries("group-logins");
    },
  });

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
      <Card title={`Order detail ${group.group_name}`}>
        <Divider />
      </Card>
    </>
  );
}
