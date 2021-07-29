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
import { merchantsAPI } from "../../../../../services/queries/management/users/merchnats";
import { currenciesAPI } from "../../../../../services/queries/management/currencies";
import { statementsAPI } from "../../../../../services/queries/management/statements";
import { Currency } from "../component/Currency";
import { MerchantForSelectType } from "../../../../../types/merchants";
import { CurrencyForSelectType } from "../../../../../types/currencies";

export default function StatementForm({ onSubmit }) {
  const [selected_merchant, setMerchant] =
    useState<MerchantForSelectType | null>(null);
  const [isSave, setIsSave] = useState(0);

  const { data: merchants, isLoading: isLoadingMerchant } = useQuery(
    ["merchants"],
    () => merchantsAPI.getMerchants()
  );

  const { data: statements } = useQuery(["statements", selected_merchant], () =>
    statementsAPI.getStatements({
      merchant_guid: selected_merchant
        ? selected_merchant.merchant_guid
        : undefined,
      status: "Payment Due",
      merge_statement_flag: false,
    })
  );

  const modifiedMerchantsData = useMemo(() => {
    return merchants
      ? merchants.data.map((mer: MerchantForSelectType) => ({
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
          code: cur.code,
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
        statements: [],
        statement_currency: modifiedCurrenciesData.filter(
          (cur: CurrencyForSelectType) => cur.code === "EUR"
        )[0],
        bank_wire_fee: 0,
        name: "",
        // reason: "",
        currencies_rates: modifiedRatesData,
        //
        change_name: false,
        change_rates: false,
      }}
      validationSchema={Yup.object({
        merchant: Yup.object().typeError("Required"),
        statements: Yup.array()
          .of(Yup.object().typeError("Required").required("Required"))
          .typeError("Required")
          .min(1)
          .required("Required"),
        name: Yup.string(),
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
            merchant_guid: values.merchant!.guid,
            statements: values.statements.map((element: any) => element.guid),
            statement_currency: values.statement_currency.code,
            currency_rates: values.currencies_rates,
            bank_wire_fee: values.bank_wire_fee,
            save: isSave,
            is_payable_statement: 1,
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
      {({ values, errors, isSubmitting, setFieldValue, submitForm }) => (
        <Form className="modal-form">
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <Field
                name="merchant"
                inputType="select"
                label="Merchant*"
                options={modifiedMerchantsData}
                callback={(value: MerchantForSelectType) => {
                  setMerchant(value);
                  setFieldValue("statements", []);
                }}
              />
              <Field
                name="statements"
                inputType="multi-select"
                label="Statements*"
                options={statements?.data}
              />
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
              <Currency />

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
