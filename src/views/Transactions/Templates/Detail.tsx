import {
  Card,
  Descriptions,
  Divider,
  Typography,
  Button,
  Row,
  Tabs,
} from "antd";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Loading } from "../../../Components/Common";
import { AbilityContext } from "../../../Components/Common/Can";
import {
  useLoginColumns,
  useShopsColumns,
  useMerchantAuditColumns,
  useGroupMerchantsColumns,
} from "../../../constants/columns";
import { gatewaysAPI } from "../../../services/queries/management/gateways";
import { templatesAPI } from "../../../services/queries/management/transactions/templates";
import { TemplateSteps } from "./TemplateSteps";
const { Text } = Typography;

export default function TemplatesDetail() {
  let history = useParams<{ id: string }>();

  const {
    data: template,
    status,
    error,
  } = useQuery(["template", history.id], () =>
    templatesAPI.getTemplate(history.id)
  );

  const { data: gateways, isLoading: gatewaysIsLoading } = useQuery(
    ["gateways", history.id],
    () => gatewaysAPI.getGateways()
  );

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    let errorObj = error as any;
    return <span>Error: {errorObj.message}</span>;
  }

  return (
    <>
      <Card title={template.name}>
        <Descriptions
          column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          bordered
          size="small"
        >
          <Descriptions.Item span={3} label="GUID">
            {template.guid}
          </Descriptions.Item>
          <Descriptions.Item label="Type">{template.type}</Descriptions.Item>
          <Descriptions.Item label="Spec rate">
            {template.spec_rate}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            {template.created_at}
          </Descriptions.Item>
          <Descriptions.Item label="Created by">
            {template.created_by_username}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {template.updated_at}
          </Descriptions.Item>
          <Descriptions.Item label="Updated by">
            {template.updated_by_username}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        {gatewaysIsLoading ? (
          <Loading />
        ) : (
          <Tabs defaultActiveKey="1">
            {gateways?.data?.map((gate) => (
              <Tabs.TabPane tab={gate.name} key={gate.guid}>
                <TemplateSteps
                  template_guid={history.id}
                  gateway_guid={gate.guid}
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
        )}
      </Card>
    </>
  );
}
