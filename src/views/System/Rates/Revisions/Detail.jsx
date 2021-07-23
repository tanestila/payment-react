import { Card, Descriptions, Alert, Divider, Row, Button } from "antd";
import Table from "../../../Components/TableFactory/Table";
import { useQuery } from "react-query";
import { ratesAPI } from "../../../services/queries/management/rates";
import { useParams } from "react-router-dom";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import { Loading } from "../../../Components/Common";
import { formatDate } from "../../../helpers/formatDate";
import CustomModal from "../../../Components/Common/Modal";
import RevisionCreator from "./Revisions/Creator";

const columns = [
  {
    title: "Guid",
    key: "guid",
    dataIndex: "guid",
  },
  {
    title: "activation date",
    key: "activation_date",
    dataIndex: "activation_date",
  },
  {
    title: "Currency",
    key: "currency_code",
    dataIndex: "currency_code",
  },
  {
    title: "Hold Percent",
    key: "hold_percent",
    dataIndex: "hold_percent",
  },
  {
    title: "Hold days",
    key: "hold_days",
    dataIndex: "hold_days",
  },
  {
    title: "Connection fee",
    key: "connection_fee",
    dataIndex: "connection_fee",
  },
  {
    title: "Terminal registration fee",
    key: "terminal_registration_fee",
    dataIndex: "terminal_registration_fee",
  },
  {
    title: "Delete",
    key: "terminal_registration_fee",
    dataIndex: "terminal_registration_fee",
  },
];

const RevisionDetail = () => {
  let history = useParams();

  const {
    data: rate,
    status,
    error,
  } = useQuery(["rate", history.id], () => ratesAPI.getRate(history.id));

  const {
    isFetching: isFetchingRateRevisions,
    isLoading: isLoadingRateRevisions,
    isError: isErrorRateRevisions,
    error: RateRevisionsError,
    data: RateRevisions,
    items: RateRevisionsItems,
    handleTableChange: handleRateRevisionsTableChange,
  } = useTableQuery(
    "rate-revisions",
    (args) => ratesAPI.getRateRevisions(history.id, args),
    false,
    10,
    [history.id]
  );
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    let errorObj = error;
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
    <Card title={`Connected RateRevisions`}>
      <Descriptions
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        bordered
        size="small"
      >
        <Descriptions.Item label="name">{rate.name}</Descriptions.Item>
        <Descriptions.Item label="Gateway">
          {rate.gateway_name}
        </Descriptions.Item>
      </Descriptions>

      <Divider />
      <h5>Revisions</h5>
      <Table
        columns={columns}
        handleTableChange={handleRateRevisionsTableChange}
        isFetching={isFetchingRateRevisions}
        data={RateRevisions}
        items={RateRevisionsItems}
        isLoading={isLoadingRateRevisions}
        isError={isErrorRateRevisions}
        error={RateRevisionsError}
        // isPaginated={false}
      />
      <Row justify="center">
        <CustomModal
          header="Create revisions"
          content={RevisionCreator}
          contentProps={{ guid: rate.guid }}
          button={<Button>Create revisions</Button>}
          // dialogClassName="modal-creator"
        />
      </Row>
    </Card>
  );
};
export default RevisionDetail;
