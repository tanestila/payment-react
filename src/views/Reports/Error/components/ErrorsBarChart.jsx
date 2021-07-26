import { useEffect, useState } from "react";
import { HorizontalBar } from "../../../../Components/Common/Charts/HorizontalBar";
import { Loading } from "../../../../Components/Common";
import { backgroundColors } from "../../../../constants/colors";

export const ErrorsBarChart = ({ response, status, isFetching }) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (status === "success") {
      let labels = [];
      let data = [];

      let colors = [];

      response.data.forEach((item, index) => {
        labels.push("Error: " + item.err_code);
        colors.push(backgroundColors[index]);
        data.push(parseInt(item.err_count, 10));
      });

      labels = labels.length ? labels : ["There are no errors"];
      let datasets = [
        {
          label: labels,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1,
          hoverBackgroundColor: backgroundColors,
          hoverBorderColor: backgroundColors,
          data: data,
        },
      ];
      setDatasets(datasets);
      setLabels(labels);
    }
  }, [response]);

  if (status === "loading" || isFetching) return <Loading />;
  return (
    <>
      <HorizontalBar labels={labels} datasets={datasets} />
    </>
  );
};
