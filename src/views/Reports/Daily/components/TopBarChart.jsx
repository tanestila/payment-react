import { HorizontalBar } from "../../../../Components/Common/Charts/HorizontalBar";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { dailyReportAPI } from "../../../../services/queries/report/dailyReport";

export const TopBarChart = ({ data, type }) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const { data: topMerchants, isLoading: isMerchantsLoading } = useQuery(
    [
      "top-merchants",
      data.partner_guid_array,
      data.group_guid_array,
      data.merchant_guid_array,
      data.shop_guid_array,
      data.terminal_guid_array,
      data.from_date,
      data.to_date,
    ],
    () => dailyReportAPI.getTopMerchants({ ...data, days: 1 }),
    { enabled: type === "merchants" }
  );

  const { data: topGroups, isLoading: isGroupsLoading } = useQuery(
    [
      "top-groups",
      data.partner_guid_array,
      data.group_guid_array,
      data.merchant_guid_array,
      data.shop_guid_array,
      data.terminal_guid_array,
      data.from_date,
      data.to_date,
    ],
    () => dailyReportAPI.getTopGroups({ ...data, days: 1 }),
    { enabled: type === "groups" }
  );

  const { data: topPartners, isLoading: isPartnersLoading } = useQuery(
    [
      "top-partners",
      data.partner_guid_array,
      data.group_guid_array,
      data.merchant_guid_array,
      data.shop_guid_array,
      data.terminal_guid_array,
      data.from_date,
      data.to_date,
    ],
    () => dailyReportAPI.getTopPartners({ ...data, days: 1 }),
    { enabled: type === "partners" }
  );

  useEffect(() => {
    let labels = [];
    let array = [];
    if (!isPartnersLoading || !isGroupsLoading || !isMerchantsLoading) {
      switch (type) {
        case "merchants":
          topMerchants &&
            topMerchants.forEach((item) => {
              labels.push(item.name);
              array.push(item.count);
            });
          break;
        case "partners":
          topPartners &&
            topPartners.forEach((item) => {
              labels.push(item.name);
              array.push(item.count);
            });
          break;
        case "groups":
          topGroups &&
            topGroups.forEach((item) => {
              labels.push(item.name);
              array.push(item.count);
            });
          break;

        default:
          break;
      }
    }

    const dataset = array.map((count, index) => {
      return {
        label: labels[index],
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [count],
      };
    });
    setDatasets(dataset);
    setLabels(labels);
  }, [topPartners, topGroups, topMerchants]);

  return (
    <>
      <HorizontalBar
        labels={labels}
        datasets={datasets}
        options={{
          indexAxis: "y",
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </>
  );
};
