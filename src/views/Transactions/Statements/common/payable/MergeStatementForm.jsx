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
  const [statement_currency, setCurrency] = useState(null);

  const { data: merchants, isLoading: isLoadingMerchant } = useQuery(
    ["merchants"],
    () => merchantsAPI.getMerchants()
  );

  const modifiedMerchantsData = useMemo(() => {
    return merchants
      ? merchants.data.map((mer) => ({
          ...mer,
          name: mer.merchant_name,
          guid: mer.merchant_guid,
          label: mer.merchant_name,
          value: mer.merchant_guid,
        }))
      : [];
  }, [merchants]);

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
          bank_exchange_rate: cur.rate_to_eur,
          processor_exchange_rate: cur.rate_to_eur,
          exchange_markup_value: cur.exchange_markup_value,
          isFlat: cur.isFlat,
        }))
      : [];
  }, [modifiedCurrenciesData]);

  if (isLoadingMerchant || isLoadingCurrencies) return <Loading />;
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
            save: 0,
            is_payable_statement: 0,
          };
          await onSubmit(data);
          SuccessModal("Terminal was created");
        } catch (error) {
          ErrorModal(parseError(error));
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, errors, isSubmitting, setFieldValue }) => (
        <Form className="modal-form">
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
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
              statements
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
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

              <Field
                name="bank_wire_fee"
                type="number"
                label="Bank wire fee*"
              />
            </Col>
          </Row>
          <div>
            {isSubmitting ? (
              <Loading />
            ) : (
              <Space>
                <Button onClick={() => {}} type="primary" className="f-right">
                  Calculate
                </Button>
                <Button htmlType="submit" type="primary" className="f-right">
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
