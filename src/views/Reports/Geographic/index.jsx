import { useState, useEffect } from "react";
import { ReportForm } from "../ReportForm";

import { Card, Tabs } from "antd";
import { Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { dailyReportAPI } from "../../../services/queries/report/dailyReport";

import { TandCReportAPI } from "../../../services/queries/report/TandCReport";
import useTableQuery from "../../../Components/TableFactory/useTableQuery";
import Table from "../../../Components/TableFactory/Table";
import { formatDateForTable } from "../../../helpers/formatDate";
import Loading from "../../../Components/Common/Loading/MainLoading";
import moment from "moment";
import { geographicAPI } from "../../../services/queries/report/geographic";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const columns = [
  {
    title: "country code",
    key: "country_code",
    render: (row) => `${row.country_name} (${row.country_code})`,
  },
  {
    title: "transaction count",
    key: "transaction_count",
    render: (row) => `${row.transaction_count} (${row.percent}%)`,
  },
];

const Geographic = () => {
  const [data, setData] = useState({
    merchant_guid_array: [],
    group_guid_array: [],
    partner_guid_array: [],
    shop_guid_array: [],
    terminal_guid_array: [],
    from_date: moment().startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
    to_date: moment().endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
    exportType: null,
  });
  const [maxPercent, setMaxPercent] = useState(100);

  const handleSubmit = (data) => {
    setData({ ...data });
  };

  const {
    isFetching,
    isLoading,
    isError,
    error,
    data: response,
    status,
    items,
    handleTableChange,
  } = useTableQuery(
    "geographic",
    () => geographicAPI.get({ ...data }),
    false,
    10,
    [
      data.partner_guid_array,
      data.group_guid_array,
      data.merchant_guid_array,
      data.shop_guid_array,
      data.terminal_guid_array,
      data.from_date,
      data.to_date,
    ]
  );

  useEffect(() => {
    if (status === "success") setMaxPercent(response.max_percent);
  }, [response]);

  const colorScale = scaleLinear()
    .domain([0, maxPercent])
    .range(["#ffedea", "#ff5233"]);

  return (
    <>
      <ReportForm handleSubmit={handleSubmit} />
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <>
          <ComposableMap
            projectionConfig={{
              scale: 120,
              rotation: [-10, 0, 0],
            }}
            width={800}
            height={400}
            style={{ width: "100%", height: "auto" }}
          >
            <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
            {response.data.length > 0 && (
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const d = response.data.find(
                      (s) => s.country_code === geo.properties.ISO_A2
                    );
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={d ? colorScale(d.percent) : "#F5F4F6"}
                      />
                    );
                  })
                }
              </Geographies>
            )}
          </ComposableMap>
          Summary
          <Table
            columns={columns}
            handleTableChange={handleTableChange}
            isFetching={isFetching}
            data={response.data}
            items={items}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isPaginated={false}
          />
        </>
      )}
    </>
  );
};
export default Geographic;
