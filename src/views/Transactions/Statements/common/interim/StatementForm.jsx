import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../../../Components/Common/Formik/Field";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, Space } from "antd";
import {
  Loading,
  SuccessModal,
  ErrorModal,
} from "../../../../../Components/Common";
import { parseError } from "../../../../../helpers/parseError";
import { shopsAPI } from "../../../../../services/queries/management/shops";
import { additionalFeesAPI } from "../../../../../services/queries/management/rates/additionalFees";
import { merchantsAPI } from "../../../../../services/queries/management/users/merchnats";
import { terminalsAPI } from "../../../../../services/queries/management/terminals";
import { currenciesAPI } from "../../../../../services/queries/management/currencies";
import moment from "moment";

export default function StatementForm({ onSubmit }) {
  const [selected_merchant, setMerchant] = useState(null);
  const [selected_shops, setShops] = useState(null);
  const [selected_currencies, setCurrencies] = useState(null);
  const [statement_currency, setCurrency] = useState(null);
  const [isSave, setIsSave] = useState(0);

  const { data: merchants, isLoading: isLoadingMerchant } = useQuery(
    ["merchants"],
    () => merchantsAPI.getMerchants()
  );

  const modifiedMerchantsData = useMemo(() => {
    let data = [];
    if (merchants) {
      data = merchants.data.map((mer) => ({
        ...mer,
        name: mer.merchant_name,
        guid: mer.merchant_guid,
        label: mer.merchant_name,
        value: mer.merchant_guid,
      }));
      setMerchant(data[0]);
      return data;
    }
  }, [merchants]);

  const { data: shops } = useQuery(["shops", selected_merchant], () =>
    shopsAPI.getShops({
      merchant_guid: selected_merchant
        ? selected_merchant.merchant_guid
        : undefined,
    })
  );

  const modifiedShopsData = useMemo(() => {
    return shops
      ? shops.data.map((shop) => ({
          ...shop,
          label: shop.name,
          value: shop.guid,
        }))
      : [];
  }, [shops]);

  const { data: terminals } = useQuery(
    ["terminals", selected_shops, selected_currencies, selected_merchant],
    () =>
      terminalsAPI.getTerminals({
        shop_guid_array: selected_shops
          ? selected_shops.map((shop) => shop.guid)
          : undefined,
        currency_code_array: selected_currencies
          ? selected_currencies.map((currency) => currency.code)
          : undefined,
        merchant_guid: selected_merchant
          ? selected_merchant.merchant_guid
          : undefined,
      })
  );

  const modifiedTerminalsData = useMemo(() => {
    return terminals
      ? terminals.data.map((terminal) => ({
          ...terminal,
          label: terminal.name,
          value: terminal.guid,
        }))
      : [];
  }, [terminals]);

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

  const modifiedRatesData = useMemo(() => {
    return modifiedCurrenciesData
      ? modifiedCurrenciesData.map((cur: any) => ({
          guid: cur.guid,
          name: cur.code,
          code: cur.code,
          bank_exchange_rate: cur.rate_to_eur,
          processor_exchange_rate: cur.rate_to_eur,
          exchange_markup_value: cur.exchange_markup_value,
          isFlat: cur.isFlat,
        }))
      : [];
  }, [modifiedCurrenciesData]);

  const { data: additionalFees, isLoading: isLoadingAdditionalFees } = useQuery(
    ["additional-fees"],
    () => additionalFeesAPI.getAdditionalFees({ enabled: true })
  );

  const modifiedAdditionalFeesData = useMemo(() => {
    return additionalFees
      ? additionalFees.data.map((fee: any) => ({
          ...fee,
          name: fee.fee_name,
          label: fee.fee_name,
          value: fee.fee_name,
        }))
      : [];
  }, [additionalFees]);

  if (isLoadingMerchant || isLoadingCurrencies || isLoadingAdditionalFees)
    return <Loading />;
  return (
    <Formik
      initialValues={{
        merchant: null,
        shops: [],
        terminals: [],
        date: {
          startDate: moment().startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
          endDate: moment().endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
        },
        statement_currency: modifiedCurrenciesData.filter(
          (cur) => cur.code === "EUR"
        )[0],
        bank_wire_fee: 0,
        name: "",
        additional_fees: [],
        // reason: "",
        currencies_rates: modifiedRatesData,

        //
        change_name: false,
        currencies_filter: "",
        change_bank_currencies_rates: false,
        change_processor_currencies_rates: false,
      }}
      validationSchema={Yup.object({
        merchant: Yup.object().typeError("Required"),
        shops: Yup.array(),
        terminals: Yup.array()
          .of(Yup.object().typeError("Required").required("Required"))
          .typeError("Required")
          .min(1)
          .required("Required"),
        date: Yup.object().typeError("Required"),
        name: Yup.string(),
        additional_fees: Yup.array()
          .of(
            Yup.object({
              name: Yup.object().typeError("Required").required("Required"),
              value: Yup.number().typeError("Required").required("Required"),
              currency: Yup.object().typeError("Required").required("Required"),
            })
              .typeError("Required")
              .required("Required")
          )
          .typeError("Required")
          .required("Required"),
        currencies_rates: Yup.array()
          .of(
            Yup.object({
              guid: Yup.string(),
              name: Yup.string(),
              bank_exchange_rate: Yup.number()
                .typeError("Required")
                .required("Required"),
              processor_exchange_rate: Yup.number()
                .typeError("Required")
                .required("Required"),
              exchange_markup_value: Yup.number()
                .typeError("Required")
                .required("Required"),
              isFlat: Yup.boolean(),
            })
              .typeError("Required")
              .required("Required")
          )
          .typeError("Required")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            merchant_guid: values.merchant.guid,
            terminals: values.terminals.map((element) => {
              return element.guid;
            }),
            from_date: values.date.startDate,
            to_date: values.date.endDate,
            statement_currency: values.statement_currency.code,
            currency_rates: values.currencies_rates,
            bank_wire_fee: values.bank_wire_fee,
            additional_fees: values.additional_fees.map((item) => ({
              ...item,
              currency: item.currency.code,
              name: item.name.fee_name,
            })),
            save: isSave,
            is_payable_statement: 0,
          };
          await onSubmit(data, isSave);
          SuccessModal("Terminal was created");
        } catch (error) {
          ErrorModal(parseError(error));
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, errors, isSubmitting, setFieldValue, submitForm }) => (
        <Form className="modal-form">
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              {console.log(values.merchant)}
              <Field
                name="merchant"
                inputType="select"
                label="Merchant*"
                options={modifiedMerchantsData}
                callback={(value) => {
                  setMerchant(value);
                  setFieldValue("shops", []);
                  setFieldValue("terminals", []);
                }}
              />
              <Field
                name="shops"
                inputType="multi-select"
                label="Shop*"
                options={modifiedShopsData}
                callback={(value) => {
                  setShops(value);
                  setFieldValue("terminals", []);
                }}
              />
              <Field
                name="select_all_shops"
                inputType="checkbox"
                label="Select all shops"
                callback={(value) => {
                  if (value) setFieldValue("shops", modifiedShopsData);
                  else setFieldValue("shops", []);
                }}
              />
              <Field
                name="terminals"
                inputType="multi-select"
                label="Terminals*"
                options={modifiedTerminalsData}
              />
              <Field
                name="select_all_terminals"
                inputType="checkbox"
                label="Select all terminals"
                callback={(value) => {
                  if (value) setFieldValue("terminals", modifiedTerminalsData);
                  else setFieldValue("terminals", []);
                }}
              />
              <Field
                name="currencies_filter"
                inputType="multi-select"
                label="Filter terminals by currencies"
                options={modifiedCurrenciesData}
                callback={(value) => {
                  setCurrencies(value);
                  setFieldValue("terminals", []);
                }}
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <Field name="date" inputType="date-range" label="Date range*" />
              <Field
                name="change_name"
                inputType="checkbox"
                label="Change Name"
              />
              {values.change_name && (
                <Field name="name" type="text" label="Name*" />
              )}
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
                name="change_bank_currencies_rates"
                inputType="checkbox"
                label="Set bank exchange currencies rates"
              />
              {values.change_bank_currencies_rates && (
                <Field
                  name="currencies_rates"
                  inputType="rates"
                  label=""
                  disabledName={values.statement_currency?.name}
                />
              )}
              {/* <Field
                name="change_processor_currencies_rates"
                inputType="checkbox"
                label="Set processor exchange currencies rates"
              />
              {values.change_processor_currencies_rates && (
                <>
                  <Field
                    name="currencies_rates"
                    inputType="rates"
                    label=""
                    disabledName={values.statement_currency?.name}
                    propName="processor_exchange_rate"
                  />
                </>
              )} */}
              <Field
                name="bank_wire_fee"
                type="number"
                label="Bank wire fee*"
              />
              <Field
                name="additional_fees"
                inputType="additional-fee"
                label=""
                options={modifiedAdditionalFeesData}
                currencyOptions={modifiedCurrenciesData}
              />
              {/* <Field name="reason" type="text" label="Reason*" /> */}
            </Col>
          </Row>
          <div>
            {isSubmitting ? (
              <Loading />
            ) : (
              <Space>
                <Button htmlType="submit" type="primary" className="f-right">
                  Calculate
                </Button>
                <Button
                  onClick={() => {
                    setIsSave(1);
                    submitForm();
                  }}
                  type="primary"
                  className="f-right"
                >
                  Save
                </Button>
              </Space>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
