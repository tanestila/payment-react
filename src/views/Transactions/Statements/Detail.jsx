import { Card, Divider, Button, Descriptions } from "antd";
import StatementForm from "./common/StatmentForm";
import StatementTables from "./common/StatementTables";
import { useQuery } from "react-query";
import { statementsAPI } from "../../../services/queries/management/statements";
import { useParams } from "react-router-dom";
import { Loading, SuccessModal, ErrorModal } from "../../../Components/Common";
import { useState } from "react";
import { formatDate } from "../../../helpers/formatDate";

const StatementDetail = ({ statement }) => {
  return (
    <Descriptions
      column={{ xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      bordered
      size="small"
    >
      <Descriptions.Item label="Statement GUID">
        {statement.guid}
      </Descriptions.Item>
      <Descriptions.Item label="Merchant">
        {statement.merchant_name}
      </Descriptions.Item>
      <Descriptions.Item label="Group">
        {statement.group_name || "-"}
      </Descriptions.Item>
      <Descriptions.Item label="Partner">
        {statement.partner_name || "-"}
      </Descriptions.Item>
      <Descriptions.Item label="Status">{statement.status}</Descriptions.Item>
      <Descriptions.Item label="Summary amount">
        {statement.summary_amount}
      </Descriptions.Item>
      <Descriptions.Item label="Summary count">
        {statement.summary_count}
      </Descriptions.Item>
      {statement.parent_guid && (
        <Descriptions.Item label="Parent">
          {statement.parent_name}
        </Descriptions.Item>
      )}
      <Descriptions.Item label="From date">
        {formatDate(statement.from_date)}
      </Descriptions.Item>
      <Descriptions.Item label="To date">
        {formatDate(statement.to_date)}
      </Descriptions.Item>

      <Descriptions.Item label="Created at">
        {formatDate(statement.created_at)}
      </Descriptions.Item>
      <Descriptions.Item label="Created by">
        {statement.created_by_username}
      </Descriptions.Item>
      <Descriptions.Item label="Updated at">
        {formatDate(statement.updated_at) || "-"}
      </Descriptions.Item>
      <Descriptions.Item label="Updated by">
        {statement.updated_by_username || "-"}
      </Descriptions.Item>
    </Descriptions>
  );
};

const Detail = () => {
  let history = useParams();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const { data: statement, status } = useQuery(["statement", history.id], () =>
    statementsAPI.getStatement(history.id)
  );
  console.log(statement);

  if (status === "loading") return <Loading />;
  return (
    <div>
      <Card title="Interim statement">
        <Button onClick={() => setIsEditorOpen((init) => !init)}>
          Edit statement
        </Button>
        {isEditorOpen && <StatementForm />}
        <Divider />
        <StatementDetail statement={statement} />
      </Card>
      <Card title="Result">
        <StatementTables statement={statement} />
      </Card>
    </div>
  );
};
export default Detail;
