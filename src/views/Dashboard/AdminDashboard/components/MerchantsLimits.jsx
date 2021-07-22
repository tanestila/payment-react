import { useEffect, useState } from "react";
import { HorizontalBar } from "../../../../Components/Common/Charts/HorizontalBar";
import { useQuery } from "react-query";
import { adminDashboardAPI } from "../../../../services/queries/report/adminDashboard";
import Checkbox from "antd/lib/checkbox/Checkbox";

export const MerchantsLimits = () => {
  const [isShowAll, setIsShowAll] = useState(false);
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
    if (status === "success") {
      let labels = [];
      let data = [];
      let backgroundColors = [];
      let borderColors = [];
      let hoverBackgroundColors = [];
      let limits = isShowAll ? response.limits : response.limits.slice(0, 5);
      limits.forEach((element) => {
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
  }, [response, isShowAll]);

  const onChange = () => {
    setIsShowAll(!isShowAll);
  };

  return (
    <div>
      <Checkbox onChange={onChange}>Show all</Checkbox>
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
