import { useEffect, useState } from "react";
import { HorizontalBar } from "../../../../Components/Common/Charts/HorizontalBar";
import { useQuery } from "react-query";
import { adminDashboardAPI } from "../../../../services/queries/report/adminDashboard";

export const MerchantsTotal = () => {
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
    ["merchants-total-bar", date?.date_from, date?.date_till, last_days],
    () => adminDashboardAPI.getMerchantTotalsData()
  );

  useEffect(() => {
    if (status === "success") {
      let labels = [];
      let data = [];
      response.amounts?.forEach((element) => {
        labels.push(element.merchant_name);
        data.push(element.merchant_amount);
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
