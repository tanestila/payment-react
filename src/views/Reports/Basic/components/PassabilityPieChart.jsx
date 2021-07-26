import { useEffect, useState } from "react";
import { PieChart } from "../../../../Components/Common/Charts/PieChart";
import { Loading } from "../../../../Components/Common";

export const PassabilityPieChart = ({ response, status, isFetching }) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (status === "success") {
      let success = 0;
      let failed = 0;
      let transactionTypes = Object.keys(response);
      transactionTypes.forEach((transactionType, index) => {
        response[transactionType].forEach((item) => {
          success += parseInt(item.success, 10);
          failed += parseInt(item.failed, 10);
        });
      });
      const datasetsPie =
        success > 0 || failed > 0
          ? [
              {
                data: [success, failed],
                backgroundColor: ["rgba(75,192,192,1)", "rgba(255,99,132,1)"],
              },
            ]
          : [{ data: [1], backgroundColor: "#CCC" }];

      const labelsPie =
        datasetsPie[0].data.length !== 1
          ? ["Success", "Failed"]
          : ["There are no transactions yet"];
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
