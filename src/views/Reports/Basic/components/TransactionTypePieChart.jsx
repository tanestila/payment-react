import { useEffect, useState } from "react";
import { PieChart } from "../../../../Components/Common/Charts/PieChart";
import { Loading } from "../../../../Components/Common";
import { backgroundColors, borderColors } from "../../../../constants/colors";

export const TransactionTypePieChart = ({ response, status, isFetching }) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (status === "success") {
      let datasetsPie = [];
      let labelsPie = [];
      let array = [];
      let colors = [];
      let transactionTypes = Object.keys(response);
      transactionTypes.forEach((transactionType, index) => {
        let count = 0;
        response[transactionType].forEach((item) => {
          count += parseInt(item.success, 10);
        });
        array.push(count);
        colors.push(backgroundColors[index]);
        labelsPie.push(transactionType);
      });
      datasetsPie = [
        {
          data: array,
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
      {datasets.length ? (
        <PieChart labels={labels} datasets={datasets} />
      ) : (
        <>There are not any transactions</>
      )}
    </>
  );
};
