import { LineChart } from "../../../../Components/Common/Charts/LineChart";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { adminDashboardAPI } from "../../../../services/queries/report/adminDashboard";

export const Turnover = () => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [date, setDate] = useState(null);
  const [last_days, setLastDays] = useState(null);
  const {
    data: response,
    isLoading,
    status,
    isFetching,
  } = useQuery(
    ["turnover-line-chart", date?.date_from, date?.date_till, last_days],
    () => adminDashboardAPI.getTurnoverData()
  );

  useEffect(() => {
    if (status === "success") {
      let labels = [];
      let data = [];
      response?.forEach((element) => {
        // labels.push(element.merchant_name);
        // data.push(element.merchant_amount);
      });
      setDatasets([
        {
          label: "Total",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
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
        <LineChart
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
