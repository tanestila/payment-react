import { useEffect, useState } from "react";
import { PieChart } from "../../../../Components/Common/Charts/PieChart";
import { Loading } from "../../../../Components/Common";
import { backgroundColors, borderColors } from "../../../../constants/colors";

export const ErrorsPieChart = ({ response, status, isFetching }) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (status === "success") {
      let labels = [];
      let data = [];
      let datasetsPie = [];

      let colors = [];

      response.data.forEach((item, index) => {
        labels.push("Error: " + item.err_code);
        colors.push(backgroundColors[index]);
        data.push(parseInt(item.err_count, 10));
      });

      datasetsPie = data.length
        ? [{ data: data, backgroundColor: colors }]
        : [
            {
              data: [1],
              backgroundColor: "#CCC",
            },
          ];

      const labelsPie =
        labels.length !== 0 ? labels : ["There are no transactions yet"];
      setLabels(labelsPie);
      setDatasets(datasetsPie);
    }
  }, [response]);

  if (status === "loading" || isFetching) return <Loading />;
  return (
    <>
      <PieChart labels={labels} datasets={datasets} />
    </>
  );
};
