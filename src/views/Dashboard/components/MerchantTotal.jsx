import { useEffect, useState } from "react";
import { HorizontalBar } from "../../../Components/Common/Charts/HorizontalBar";
import { useQuery } from "react-query";
import { adminDashboardAPI } from "../../../services/queries/report/adminDashboard";

export const MerchantsLimits = () => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const {
    data: response,
    isLoading,
    status,
    isFetching,
  } = useQuery(
    ["merchants-limits-bar"],
    () => adminDashboardAPI.getMerchantLimitsData(),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    console.log("re");
    if (status === "success") {
      let labels = [];
      let data = [];
      let backgroundColors = [];
      let borderColors = [];
      let hoverBackgroundColors = [];

      response.limits.forEach((element) => {
        labels.push(element.merchant_name);
        data.push(element.used_percent);
      });
      data.forEach((item, index) => {
        let red = (item / 100) * 255;
        let green = 255 - (item / 100) * 255;
        backgroundColors.push("rgba(" + red + "," + green + ",0,0.2)");
        borderColors.push("rgba(" + red + "," + green + ",0,1)");
        hoverBackgroundColors.push("rgba(" + red + "," + green + ",0,0.4)");
      });
      setDatasets([
        {
          label: labels,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
          hoverBackgroundColor: hoverBackgroundColors,
          hoverBorderColor: borderColors,
          data: data,
        },
      ]);
      setLabels(labels);
    }
  }, [response]);

  return (
    <div>
      {isLoading || status === "loading" || isFetching ? (
        <>loading</>
      ) : (
        <HorizontalBar
          labels={labels}
          datasets={datasets}
          options={{
            indexAxis: "y",
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                display: false,
                callbacks: {
                  label: function (context) {
                    return context.raw + "%";
                  },
                },
              },
            },
            scales: {
              x: {
                max: 100,
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};
