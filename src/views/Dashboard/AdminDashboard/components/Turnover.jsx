import { LineChart } from "../../../../Components/Common/Charts/LineChart";
import { Card } from "antd";
import { useEffect, useState, useMemo } from "react";
import { useQuery } from "react-query";
import { adminDashboardAPI } from "../../../../services/queries/report/adminDashboard";
import { Formik, Form } from "formik";
import { Field } from "../../../../Components/Common/Formik/Field";
import { Row, Col } from "react-bootstrap";
import { merchantsAPI } from "../../../../services/queries/management/users/merchnats";
import moment from "moment";
import { backgroundColors, borderColors } from "../../../../constants/colors";

const periods = [
  { name: "Period", guid: "0", value: "0", label: "Period" },
  { name: "Last week", guid: "7", value: "7", label: "Last week" },
  { name: "Last month", guid: "30", value: "30", label: "Last month" },
  { name: "Today", guid: "1", value: "1", label: "Today" },
];

export const Turnover = () => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [selected_merchants, setMerchants] = useState(null);
  const [last_days, setLastDays] = useState(null);
  const [dates, setDates] = useState({
    startDate: moment().startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
    endDate: moment().endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
  });
  const [period, setPeriod] = useState(null);
  const [totally_processed_flag, setTotallyFlag] = useState(true);
  const [grand_total_flag, setGrandFlag] = useState(true);
  const [cost_of_processed_payments_flag, setProcessedFlag] = useState(false);
  const [rate_flag, setRatePFlag] = useState(false);
  const [refund_flag, setRefundPFlag] = useState(false);
  const [chargeback_flag, setChargebackPFlag] = useState(false);

  const [summary, setSummary] = useState({
    totallyProcessed: [],
    costOfProcessedPaymentsTotal: [],
    grandTotal: [],
    rateTotal: [],
    refundTotal: [],
    chargebackTotal: [],
  });

  useEffect(() => {
    if (period)
      switch (period.guid) {
        case "0":
          setLastDays(null);
          break;
        case "7":
          setDates(null);
          setLastDays(7);
          break;
        case "30":
          setDates({
            startDate: moment().startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
            endDate: moment().endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
          });
          setLastDays(null);
          break;
        case 1:
          setDates({
            startDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
            endDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
          });
          setLastDays(null);
          break;
        default:
          break;
      }
  }, [period]);

  const {
    data: response,
    isLoading,
    status,
    isFetching,
  } = useQuery(
    [
      "turnover-line-chart",
      dates?.startDate,
      dates?.endDate,
      selected_merchants,
      last_days,
    ],
    () =>
      adminDashboardAPI.getTurnoverData({
        date_from: dates?.startDate,
        date_till: dates?.endDate,
        merchant_guid: selected_merchants
          ? selected_merchants.map((m) => m.guid)
          : undefined,
        last_days,
      })
  );

  const { data: merchants } = useQuery(["merchants"], () =>
    merchantsAPI.getMerchants()
  );

  const modifiedMerchantsData = useMemo(() => {
    return merchants
      ? merchants.data.map((mer) => ({
          ...mer,
          name: mer.merchant_name,
          guid: mer.merchant_guid,
        }))
      : [];
  }, [merchants]);

  useEffect(() => {
    if (status === "success") {
      let data = [];
      const sum = {
        totallyProcessed:
          response.total.totally_processed?.map((item) => {
            return `${item.amount} ${item.currency} (${item.passed_amount_percent}%) count ${item.transaction_count} (${item.passed_count_percent}%) `;
          }) || [],
        costOfProcessedPaymentsTotal:
          response.total.percent_fees
            ?.filter((item) => item.amount !== 0 && item.currency !== null)
            .map((item) => {
              return `${item.amount} ${item.currency} `;
            }) || [],
        grandTotal:
          response.total.total_fees
            ?.filter((item) => item.amount !== 0 && item.currency !== null)
            .map((item) => {
              return `${item.amount} ${item.currency} `;
            }) || [],
        rateTotal:
          response.total.fixed_fees
            ?.filter((item) => item.amount !== 0 && item.currency !== null)
            .map((item) => {
              return `${item.amount} ${item.currency} `;
            }) || [],
        refundTotal:
          response.total.refund
            ?.filter((item) => item.amount !== 0 && item.currency !== null)
            .map((item) => {
              return `${item.amount} ${item.currency} `;
            }) || [],
        chargebackTotal:
          response.total.chargeback
            ?.filter((item) => item.amount !== 0 && item.currency !== null)
            .map((item) => {
              return `${item.amount} ${item.currency} `;
            }) || [],
      };
      response.data &&
        response.data.forEach((item) => {
          if (totally_processed_flag) {
            data.push({
              label: item.merchant_name + " processed " + item.currency,
              values: item.totally_processed,
            });
          }
          if (grand_total_flag) {
            data.push({
              label: item.merchant_name + " grand total " + item.currency,
              values: item.grand_total,
            });
          }
          if (cost_of_processed_payments_flag) {
            data.push({
              label: item.merchant_name + " percent fee " + item.currency,
              values: item.percent_fees,
            });
          }
          if (rate_flag) {
            data.push({
              label: item.merchant_name + " fix fee " + item.currency,
              values: item.fixed_fees,
            });
          }
          if (refund_flag) {
            data.push({
              label: item.merchant_name + " refund " + item.currency,
              values: item.refund,
            });
          }
          if (chargeback_flag) {
            data.push({
              label: item.merchant_name + " chargeback " + item.currency,
              values: item.chargeback,
            });
          }
        });
      let labels = [];
      if (period && period.guid === "1") {
        labels = [
          "00:00",
          "1:00",
          "2:00",
          "3:00",
          "4:00",
          "5:00",
          "6:00",
          "7:00",
          "8:00",
          "9:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00",
        ];
      } else {
        labels = response.dates.map((date) =>
          moment(date, "YYYY-MM-DDThh:mm:ss").format("DD.MM")
        );
      }
      setLabels(labels);

      setSummary(sum);
      let datasets = data.map((arr, index) => {
        return {
          label: arr.label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: backgroundColors[index % backgroundColors.length],
          borderColor: borderColors[index % borderColors.length],
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: borderColors[index % borderColors.length],
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor:
            backgroundColors[index % backgroundColors.length],
          pointHoverBorderColor: "black",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: arr.values,
        };
      });
      setDatasets(datasets);
    }
  }, [
    response,
    totally_processed_flag,
    grand_total_flag,
    cost_of_processed_payments_flag,
    rate_flag,
    refund_flag,
    chargeback_flag,
  ]);

  return (
    <Formik
      initialValues={{
        totally_processed_flag: true,
        grand_total_flag: true,
        cost_of_processed_payments_flag: false,
        rate_flag: false,
        refund_flag: false,
        chargeback_flag: false,
        merchants: [],
        period: periods[0],
        dates: {
          startDate: moment().startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
          endDate: moment().endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
        },
      }}
    >
      {({ values }) => (
        <Form>
          <Card title="Turnover">
            <Row style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
              <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                <Field
                  name="totally_processed_flag"
                  inputType="checkbox-inverse"
                  label="Totally processed"
                  callback={(value) => setTotallyFlag(value)}
                />
                <p>Summary: {summary.totallyProcessed.join(" / ")}</p>
              </Col>
              <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                <Field
                  name="merchant"
                  inputType="multi-select"
                  label="merchants"
                  options={modifiedMerchantsData}
                  callback={(value) => setMerchants(value)}
                />
              </Col>
            </Row>
            <Card>
              <div>
                <Field
                  name="grand_total_flag"
                  inputType="checkbox-inverse"
                  label="Grand total"
                  callback={(value) => setGrandFlag(value)}
                />

                <p>
                  {values.grand_total_flag && (
                    <> Summary: {summary.grandTotal.join(" / ")}</>
                  )}
                </p>
              </div>
              <div>
                <Field
                  name="cost_of_processed_payments_flag"
                  inputType="checkbox-inverse"
                  label=" Cost of processed payments"
                  callback={(value) => setProcessedFlag(value)}
                />

                <p>
                  {values.cost_of_processed_payments_flag && (
                    <>
                      Summary:{" "}
                      {summary.costOfProcessedPaymentsTotal.join(" / ")}
                    </>
                  )}
                </p>
              </div>
              <div>
                <Field
                  name="rate_flag"
                  inputType="checkbox-inverse"
                  label="Successful transactions commissions"
                  callback={(value) => setRatePFlag(value)}
                />

                <p>
                  {values.rate_flag && (
                    <>Summary: {summary.rateTotal.join(" / ")}</>
                  )}
                </p>
              </div>
              <div>
                <Field
                  name="refund_flag"
                  inputType="checkbox-inverse"
                  label="Cost of refunds"
                  callback={(value) => setRefundPFlag(value)}
                />

                <p>
                  {values.refund_flag && (
                    <>Summary: {summary.refundTotal.join(" / ")}</>
                  )}
                </p>
              </div>
              <div>
                <Field
                  name="chargeback_flag"
                  inputType="checkbox-inverse"
                  label="Cost of chargebacks"
                  callback={(value) => setChargebackPFlag(value)}
                />

                <p>
                  {values.chargeback_flag && (
                    <>Summary: {summary.chargebackTotal.join(" / ")}</>
                  )}
                </p>
              </div>
            </Card>
          </Card>
          <Card title="Turnover">
            <Row style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
              <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                {values.period.guid === "0" && (
                  <Field
                    name="dates"
                    inputType="date-range"
                    label="Date"
                    callback={(dates) =>
                      setDates({
                        startDate: moment(dates.startDate).format(
                          "YYYY-MM-DDTHH:mm:ss"
                        ),
                        endDate: moment(dates.endDate).format(
                          "YYYY-MM-DDTHH:mm:ss"
                        ),
                      })
                    }
                  />
                )}
              </Col>

              <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                <Field
                  name="period"
                  inputType="select"
                  label="Time range"
                  options={periods}
                  callback={(value) => setPeriod(value)}
                />
              </Col>
            </Row>
            {isLoading || status === "loading" || isFetching ? (
              <>loading</>
            ) : (
              <LineChart labels={labels} datasets={datasets} />
            )}
          </Card>
        </Form>
      )}
    </Formik>
  );
};
