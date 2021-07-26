import { useEffect, useState } from "react";
import { PieChart } from "../../../../Components/Common/Charts/PieChart";
import { Loading } from "../../../../Components/Common";
import { backgroundColors, borderColors } from "../../../../constants/colors";

export const TransactionTypePieChart = ({ response, status, isFetching }) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (status === "success") {
      let datasets = [];
      let labelsPie = [];
      let obj = {};
      let colors = [];

      response.data.forEach((item, index) => {
        obj[item.type] = obj[item.type] + parseInt(item.success, 10);
        colors.push(backgroundColors[index]);
        labelsPie.push(item.type);
      });
      labelsPie.forEach((item) => {
        datasets = [...datasets, obj[item]];
      });

      const datasetsPie = [
        {
          data: datasets,
          backgroundColor: colors,
        },
      ];

      setLabels(labelsPie);
      setDatasets(datasetsPie);
    }
  }, [response]);

  if (status === "loading" || isFetching) return <Loading />;
  return (
    <>
      <PieChart
        labels={
          labels.length !== 0 ? labels : ["There are no transactions yet"]
        }
        datasets={
          datasets[0].data.length !== 0
            ? datasets
            : [
                {
                  data: [1],
                  backgroundColor: "#CCC",
                },
              ]
        }
      />
    </>
  );
};
