import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LineChart } from "../../../../Components/Common/Charts/LineChart";
import { backgroundColors, borderColors } from "../../../../constants/colors";
import { daysForLabels } from "../../../../helpers/formatDate";
import { basicReportAPI } from "../../../../services/queries/report/basicReport";
import { Loading } from "../../../../Components/Common";

export const TransactionHistoryLineChart = ({ data }) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [type, setType] = useState("Count");

  const {
    data: response,
    isLoading,
    status,
    isFetching,
  } = useQuery(
    [
      "transaction-types",
      data.partners,
      data.groups,
      data.merchants,
      data.from_date,
      data.to_date,
    ],
    () => basicReportAPI.getTransactionTypes({ ...data })
  );

  useEffect(() => {
    if (status === "success") {
      setLabels(daysForLabels(moment(data.from_date), moment(data.to_date)));
      let datasets = [];
      console.log(response);
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

      console.log(datasetsChart);
      setDatasets(datasetsChart);
    }
  }, [response]);

  if (status === "loading" || isFetching) return <Loading />;
  return (
    <>
      <LineChart labels={labels} datasets={datasets} />
    </>
  );
};
