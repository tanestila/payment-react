import { useMemo, useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { useQuery } from "react-query";
import { Field } from "../../../../../Components/Common/Formik/Field";
import { currenciesAPI } from "../../../../../services/queries/management/currencies";

export const Currency = () => {
  const [statement_currency, setCurrency] = useState(null);

  const { values, setFieldValue } = useFormikContext();

  const { data: currencies, isLoading: isLoadingCurrencies } = useQuery(
    ["currencies"],
    () => currenciesAPI.getCurrencies()
  );

  const modifiedCurrenciesData = useMemo(() => {
    return currencies
      ? currencies.data.map((cur: any) => ({
          ...cur,
          name: cur.code,
          label: cur.code,
          value: cur.guid,
        }))
      : [];
  }, [currencies]);

  const {
    data: currenciesRates,
    isLoading: isLoadingCurrenciesRates,
    isFetching: isFetchingCurrenciesRates,
  } = useQuery(["currencies-rates", statement_currency], () =>
    currenciesAPI.getCurrenciesRates({
      currency_from: statement_currency ? statement_currency.code : undefined,
    })
  );

  useEffect(() => {
    if (currenciesRates) {
      let newRatesValues = [...values.currencies_rates];
      currenciesRates.data?.forEach((rate) => {
        for (let index = 0; index < newRatesValues.length; index++) {
          if (newRatesValues[index].code === rate.currency_name) {
            let proc_rate = 0;
            if (rate.currency_name !== statement_currency.code)
              if (newRatesValues[index].isFlat)
                proc_rate =
                  rate.exchange_rate +
                  +newRatesValues[index].exchange_markup_value;
              else
                proc_rate =
                  rate.exchange_rate *
                  (newRatesValues[index].exchange_markup_value / 100 + 1);
            else proc_rate = rate.exchange_rate;

            newRatesValues[index] = {
              ...newRatesValues[index],
              bank_exchange_rate: rate.exchange_rate,
              processor_exchange_rate: proc_rate,
            };
          }
        }
      });
      setFieldValue("currencies_rates", newRatesValues);
    }
  }, [currenciesRates]);

  return (
    <>
      <Field
        name="statement_currency"
        inputType="select"
        label="Statement currency*"
        options={modifiedCurrenciesData}
        callback={(value) => {
          setCurrency(value);
        }}
      />
      <Field
        name="change_rates"
        inputType="checkbox"
        label="Set exchange currencies rates"
      />
      {values.change_rates && (
        <Field
          name="currencies_rates"
          inputType="rates"
          label=""
          disabledName={values.statement_currency?.name}
          isLoading={isLoadingCurrenciesRates || isFetchingCurrenciesRates}
        />
      )}
    </>
  );
};
