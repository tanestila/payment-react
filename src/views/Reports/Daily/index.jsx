import { useState } from "react";
import { ReportForm } from "../ReportForm";
import { TransactionHistoryLineChart } from "./components/TransactionHistoryLineChart";
import { CurrenciesPieChart } from "../Common/CurrenciesPieChart";
import { PassabilityPieChart } from "./components/PassabilityPieChart";
import { TransactionTypePieChart } from "./components/TransactionTypePieChart";
import { TopBarChart } from "./components/TopBarChart";
import { CardsPieChart } from "../Common/CardsPieChart";
import { Card, Tabs } from "antd";
import { Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { dailyReportAPI } from "../../../services/queries/report/dailyReport";
const { TabPane } = Tabs;

const DailyReport = () => {
  const [data, setData] = useState({
    merchant_guid_array: [],
    group_guid_array: [],
    partner_guid_array: [],
    shop_guid_array: [],
    terminal_guid_array: [],
    days: 1,
    exportType: null,
  });

  const handleSubmit = (data) => {
    setData({ ...data, days: 1 });
  };

  const {
    data: response,
    status,
    isFetching,
  } = useQuery(
    [
      "transaction-history",
      data.partner_guid_array,
      data.group_guid_array,
      data.merchant_guid_array,
      data.shop_guid_array,
      data.terminal_guid_array,
      data.from_date,
      data.to_date,
    ],
    () => dailyReportAPI.getTransactionHistory({ ...data })
  );

  return (
    <>
      <ReportForm
        handleSubmit={handleSubmit}
        isSelectDate={false}
        isSelectCurrency={false}
      />
      <TransactionHistoryLineChart
        data={data}
        response={response}
        status={status}
        isFetching={isFetching}
      />
      <Row>
        <Col lg={3} md={6} sm={6} xs={12}>
          <Card title="Passability">
            <PassabilityPieChart
              response={response}
              status={status}
              isFetching={isFetching}
            />
          </Card>
        </Col>
        <Col lg={3} md={6} sm={6} xs={12}>
          <Card title="Currency">
            <CurrenciesPieChart data={{ ...data, days: 1 }} />
          </Card>
        </Col>
        <Col lg={3} md={6} sm={6} xs={12}>
          <Card title="Transactions Type">
            <TransactionTypePieChart
              response={response}
              status={status}
              isFetching={isFetching}
            />
          </Card>
        </Col>
        <Col lg={3} md={6} sm={6} xs={12}>
          <Card title="Card Type">
            <CardsPieChart data={{ ...data, days: 1 }} />
          </Card>
        </Col>
      </Row>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Top merchants" key="1">
            <TopBarChart data={data} type="merchants" />
          </TabPane>
          <TabPane tab="Top groups" key="2">
            <TopBarChart data={data} type="groups" />
          </TabPane>
          <TabPane tab="Top partners" key="3">
            <TopBarChart data={data} type="partners" />
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};
export default DailyReport;
