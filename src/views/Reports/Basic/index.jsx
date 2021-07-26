import moment from "moment";
import { useState } from "react";
import { ReportForm } from "../ReportForm";
import { TransactionHistoryLineChart } from "./components/TransactionHistoryLineChart";
import { CurrenciesPieChart } from "../Common/CurrenciesPieChart";
import { PassabilityPieChart } from "./components/PassabilityPieChart";
import { TransactionTypePieChart } from "./components/TransactionTypePieChart";
import { CardsPieChart } from "../Common/CardsPieChart";
import { Totals } from "./components/Totals";
import { ShopTotals } from "./components/ShopTotals";
import { Orders } from "./components/Orders";
import { Card } from "antd";
import { Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { basicReportAPI } from "../../../services/queries/report/basicReport";

const BasicReport = () => {
  const [data, setData] = useState({
    merchant_guid_array: [],
    group_guid_array: [],
    partner_guid_array: [],
    shop_guid_array: [],
    terminal_guid_array: [],
    from_date: moment().startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
    to_date: moment().endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
    exportType: null,
  });

  const handleSubmit = (data) => {
    setData(data);
  };

  const {
    data: response,
    status,
    isFetching,
  } = useQuery(
    [
      "transaction-types",
      data.partner_guid_array,
      data.group_guid_array,
      data.merchant_guid_array,
      data.shop_guid_array,
      data.terminal_guid_array,
      data.from_date,
      data.to_date,
    ],
    () => basicReportAPI.getTransactionTypes({ ...data })
  );

  return (
    <>
      <ReportForm handleSubmit={handleSubmit} />
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
            <CurrenciesPieChart data={data} />
          </Card>
        </Col>
        <Col lg={3} md={6} sm={6} xs={12}>
          <Card title="Transactions Type">
            <TransactionTypePieChart
              response={response}
              status={status}
              isFetching={isFetching}
            />{" "}
          </Card>
        </Col>
        <Col lg={3} md={6} sm={6} xs={12}>
          <Card title="Card Type">
            <CardsPieChart data={data} />
          </Card>
        </Col>
      </Row>
      <Card title="Totals">
        <Totals data={data} />
      </Card>
      <Card title="Shop Totals">
        <ShopTotals data={data} />
      </Card>
      <Card title="Orders">
        <Orders data={data} />
      </Card>
    </>
  );
};
export default BasicReport;
