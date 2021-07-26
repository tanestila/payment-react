import { useEffect, useState } from "react";
import { LineChart } from "../../../../Components/Common/Charts/LineChart";
import { backgroundColors, borderColors } from "../../../../constants/colors";
import { Loading } from "../../../../Components/Common";
import { Card } from "antd";

const labels = [
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
  "00:00",
];

export const TransactionHistoryLineChart = ({
  response,
  data,
  status,
  isFetching,
}) => {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (status === "success") {
      let datasets = [];

      let transactionTypes = [];
      console.log(response);
      response.data.forEach((transaction, index) => {
        datasets[index] = [];
        transactionTypes.push(transaction.type);
        if (transaction.time === 0 || transaction.time === "0")
          datasets[index][0] += transaction.success;
        else datasets[index][transaction.time - 1] += transaction.success;
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
  }, [response, data.from_date, data.to_date]);

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
