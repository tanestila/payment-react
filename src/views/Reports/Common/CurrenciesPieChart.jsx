import { useEffect, useState } from "react";
import { PieChart } from "../../../Components/Common/Charts/PieChart";
import { Loading } from "../../../Components/Common";
import { useQuery } from "react-query";
import { basicReportAPI } from "../../../services/queries/report/basicReport";
import { backgroundColors } from "../../../constants/colors";

export const CurrenciesPieChart = ({ data }) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const {
    data: response,
    status,
    isFetching,
  } = useQuery(
    [
      "transaction-currencies",
      data.partner_guid_array,
      data.group_guid_array,
      data.merchant_guid_array,
      data.shop_guid_array,
      data.terminal_guid_array,
      data.from_date,
      data.to_date,
    ],
    () => basicReportAPI.getCurrencies({ ...data })
  );

  useEffect(() => {
    if (status === "success") {
      let datasetsPie = [];
      let labelsPie = [];
      let array = [];
      let colors = [];
      response.forEach((currency, index) => {
        array.push(currency.count);
        colors.push(backgroundColors[index]);
        labelsPie.push(currency.currency);
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
