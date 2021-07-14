import { Table, Typography } from "antd";
import { useState, useEffect } from "react";

const colors = [
  "BlanchedAlmond",
  "HoneyDew",
  "Lavender",
  "PowderBlue",
  "LightCyan",
  "LightYellow",
];

export const columnsRatesDefault = [
  {
    dataIndex: "label",
    title: "",
    key: "name",
    style: { fontWeight: "bold", textAlign: "left", whiteSpace: "nowrap" },
  },
];

const defaultRatesRows = [
  { name: "turnover_amount", label: "Turnover amount" },
  { name: "reverse_amount", label: "Reversal amount" },
  { name: "refund_amount", label: "Refund amount" },
  { name: "chargeback_amount", label: "Chargeback amount" },
  { name: "pre_arbitration_amount", label: "Prearbitration amount" },
  { name: "chargeback_reversal_amount", label: "Chargeback reversal amount" },
  { name: "representment_amount", label: "Representment amount" },
  { name: "summary_amount", label: "Summary amount" },
  // { name: "success_turnover_fee", label: "Success turnover fee" },
  {
    name: "success_turnover_fee_fixed",
    label: "Success turnover fee (fixed)",
  },
  { name: "success_turnover_fee_pct", label: "Success turnover fee (%)" },
  { name: "failed_turnover_fee", label: "Failed turnover fee" },
  { name: "refund_fee", label: "Refund fee" },
  { name: "chargeback_fee", label: "Chargeback fee" },
  { name: "connection_fee", label: "Connection fee" },
  { name: "monthly_fee", label: "Monthly fee" },
  { name: "bank_wire_fee", label: "Bank wire fee" },
  { name: "summary_fees", label: "Summary fees" },
  { name: "hold_amount", label: "Hold amount" },
  { name: "hold_return", label: "Hold return" },
  { name: "for_payout", label: "For payout" },
];

export const RatesTable = ({
  additional_fees_names,
  currencies,
  statement_currency_code,
  entityData,
}) => {
  let [columnsRates, setColumnsRates] = useState([...columnsRatesDefault]);
  // let [collapsedHeader, setCollapsedHeader] = useState([
  //   { name: "", collapse: [""] },
  // ]);
  let [ratesRows, setRatesRows] = useState([...defaultRatesRows]);

  useEffect(() => {
    setColumnsRates([...columnsRatesDefault]);
    // setCollapsedHeader([{ name: "", collapse: [""] }]);
    setRatesRows([...defaultRatesRows]);
    let arr = [...ratesRows];

    if (additional_fees_names && additional_fees_names.length) {
      let spliceArr = arr.splice(16, 4);
      additional_fees_names.forEach((name) => {
        arr.push({ name, label: name });
      });
      arr.push(...spliceArr);
    }

    let columns = [...columnsRates];
    // let header = [...collapsedHeader];
    let rows = [...arr];
    for (let index = 0; index < currencies.length; index++) {
      try {
        let currency = currencies[index];
        columns.push({
          title: currency.name,
          children: [
            {
              title: "Merchant",
              dataIndex: currency.name,
              key: currency.name,
            },
            {
              title: "Processor",
              dataIndex: currency.name + "_processor",
              key: currency.name + "_processor",
            },
            {
              title: "Acquirer",
              dataIndex: currency.name + "_bank",
              key: currency.name + "_bank",
            },
          ],
        });

        for (let i = 0; i < rows.length; i++) {
          let element = rows[i];
          if (defaultRatesRows.map((row) => row.name).includes(rows[i].name)) {
            let currencyData = entityData[currency.name];
            let currencyDataProcessor =
              entityData[currency.name + "_processor"];
            let currencyDataAcquiring = entityData[currency.name + "_bank"];
            if (
              currency.name === "Summary" ||
              currency.name === statement_currency_code
            ) {
              element = {
                ...element,
                [currency.name]: currencyData[element.name]
                  ? currencyData[element.name]
                  : "-",
                [currency.name + "_processor"]: currencyDataProcessor[
                  element.name
                ]
                  ? currencyDataProcessor[element.name]
                  : "-",
                [currency.name + "_bank"]: currencyDataAcquiring[element.name]
                  ? currencyDataAcquiring[element.name]
                  : "-",
              };
            } else {
              element = {
                ...element,
                [currency.name]:
                  currencyData[element.name] ||
                  currencyData[element.name + "_eur"]
                    ? currencyData[element.name] +
                      " (" +
                      currencyData[element.name + "_eur"] +
                      ")"
                    : "-",
                [currency.name + "_processor"]:
                  currencyDataProcessor[element.name] ||
                  currencyDataProcessor[element.name + "_eur"]
                    ? currencyDataProcessor[element.name] +
                      " (" +
                      currencyDataProcessor[element.name + "_eur"] +
                      ")"
                    : "-",
                [currency.name + "_bank"]:
                  currencyDataAcquiring[element.name] ||
                  currencyDataAcquiring[element.name + "_eur"]
                    ? currencyDataAcquiring[element.name] +
                      " (" +
                      currencyDataAcquiring[element.name + "_eur"] +
                      ")"
                    : "-",
              };
            }
            if (
              element.name === "summary_amount" ||
              element.name === "for_payout" ||
              element.name === "summary_fees"
            )
              element = { ...element, colored: true };
            rows[i] = element;
          } else {
            let feesData = entityData[currency.name].additional_fees || {};
            let feesDataProcessor =
              entityData[currency.name + "_processor"].additional_fees || {};
            let feesDataAcquiring =
              entityData[currency.name + "_bank"].additional_fees || {};
            if (
              currency.name === "Summary" ||
              currency.name === statement_currency_code
            ) {
              element = {
                ...element,
                [currency.name]: feesData[element.name]
                  ? feesData[element.name]
                  : "-",
                [currency.name + "_processor"]: feesDataProcessor[element.name]
                  ? feesDataProcessor[element.name]
                  : "-",
                [currency.name + "_bank"]: feesDataAcquiring[element.name]
                  ? feesDataAcquiring[element.name]
                  : "-",
              };
            } else {
              element = {
                ...element,
                [currency.name]:
                  feesData[element.name] || feesData[element.name + "_eur"]
                    ? feesData[element.name] +
                      " (" +
                      feesData[element.name + "_eur"] +
                      ")"
                    : "-",
                [currency.name + "_processor"]:
                  feesDataProcessor[element.name] ||
                  feesDataProcessor[element.name + "_eur"]
                    ? feesDataProcessor[element.name] +
                      " (" +
                      feesDataProcessor[element.name + "_eur"] +
                      ")"
                    : "-",
                [currency.name + "_bank"]:
                  feesDataAcquiring[element.name] ||
                  feesDataAcquiring[element.name + "_eur"]
                    ? feesDataAcquiring[element.name] +
                      " (" +
                      feesDataAcquiring[element.name + "_eur"] +
                      ")"
                    : "-",
              };
            }
            rows[i] = element;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    setColumnsRates([...columns]);
    setRatesRows([...rows]);
  }, [additional_fees_names, currencies, statement_currency_code, entityData]);

  return (
    <>
      <Table
        columns={columnsRates}
        dataSource={ratesRows}
        pagination={false}
        bordered
      />
    </>
  );
};
