import moment from "moment";
import { useEffect, useState } from "react";
import { LineChart } from "../../../../Components/Common/Charts/LineChart";
import { backgroundColors, borderColors } from "../../../../constants/colors";
import { daysForLabels } from "../../../../helpers/formatDate";
import { Loading } from "../../../../Components/Common";
import { Card } from "antd";

export const TransactionHistoryLineChart = ({
  response,
  data,
  status,
  isFetching,
}) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [type, setType] = useState("Count");

  useEffect(() => {
    if (status === "success") {
      let labels = daysForLabels(moment(data.from_date), moment(data.to_date));
      setLabels(labels);
      let datasets = [];
      let transactionTypes = Object.keys(response);
      transactionTypes.forEach((transactionType, index) => {
        datasets[index] = [];
        if (type === "Count") {
          response[transactionType].forEach((item) => {
            const findIndex = labels.findIndex(
              (itemD) => itemD === moment(item.date).format("DD.MM")
            );
            if (findIndex !== -1)
              datasets[index][findIndex] = parseInt(item.success, 10);
          });
        } else {
          response[transactionType].forEach((item) => {
            const findIndex = labels.findIndex(
              (itemD) => itemD === moment(item.date).format("DD.MM")
            );
            if (findIndex !== -1) datasets[index][findIndex] = item.amount;
          });
        }

        for (let i = 0; i < labels.length; i++) {
          if (!datasets[index][i]) datasets[index][i] = 0;
        }
      });
      const datasetsChart = datasets.map((dataset, index) => {
        return {
          label: transactionTypes[index],
          fill: false,
          lineTension: 0.1,
          backgroundColor: backgroundColors[index],
          borderColor: borderColors[index],
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: borderColors[index],
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: borderColors[index],
          pointHoverBorderColor: "black",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: dataset,
        };
      });
      setDatasets(datasetsChart);
    }
  }, [response, data.from_date, data.to_date, type]);

  if (status === "loading" || isFetching) return <Loading />;
  return (
    <Card>
      {datasets.length ? (
        <LineChart labels={labels} datasets={datasets} />
      ) : (
        <>There are not any transactions</>
      )}
    </Card>
  );
};
