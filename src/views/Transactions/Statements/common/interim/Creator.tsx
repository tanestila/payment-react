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
import moment, { Moment } from "moment";
import { Currency } from "../component/Currency";
import { roundMultiplyNumber } from "../../../../../helpers/formatNumber";
import { MerchantForSelectType } from "../../../../../types/merchants";
import { ShopForSelectType } from "../../../../../types/shops";
import { TerminalForSelectType } from "../../../../../types/terminals";
import { CurrencyForSelectType } from "../../../../../types/currencies";

export type formDataType = {
  merchant: MerchantForSelectType;
  shops: ShopForSelectType;
  terminals: TerminalForSelectType;
  date: {
    startDate: Moment;
    endDate: Moment;
  };
  statement_currency: CurrencyForSelectType;
  bank_wire_fee: number;
  name: string;
  additional_fees: Array<any>;
  currencies_rates: Array<any>;
  change_name: boolean;
  change_rates: boolean;
  currencies_filter: Array<any>;
};

export default function StatementForm({
  onSubmit,
}: {
  onSubmit: (data: any, isSave: number) => {};
}) {
  const [selected_merchant, setMerchant] =
    useState<MerchantForSelectType | null>(null);
  const [selected_shops, setShops] = useState<Array<ShopForSelectType> | null>(
    null
  );
  const [selected_currencies, setCurrencies] =
    useState<Array<CurrencyForSelectType> | null>(null);
  const [isSave, setIsSave] = useState(0);

  const { data: merchants, isLoading: isLoadingMerchant } = useQuery(
    ["merchants"],
    () => merchantsAPI.getMerchants()
  );

  const modifiedMerchantsData = useMemo(() => {
    let data = [];
    if (merchants) {
      data = merchants.data.map((mer: MerchantForSelectType) => ({
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

  const {
    data: shops,
    isLoading: shopsIsLoading,
    isFetching: shopsIsFetching,
  } = useQuery(["shops", selected_merchant], () =>
    shopsAPI.getShops({
      merchant_guid: selected_merchant
        ? selected_merchant.merchant_guid
        : undefined,
    })
  );

  const modifiedShopsData = useMemo(() => {
    return shops
      ? shops.data.map((shop: ShopForSelectType) => ({
          ...shop,
          label: shop.name,
          value: shop.guid,
        }))
      : [];
  }, [shops]);

  const {
    data: terminals,
    isLoading: terminalsIsLoading,
    isFetching: terminalsIsFetching,
  } = useQuery(
    ["terminals", selected_shops, selected_currencies, selected_merchant],
    () =>
      terminalsAPI.getTerminals({
        shop_guid_array: selected_shops
          ? selected_shops.map((shop: ShopForSelectType) => shop.guid)
          : undefined,
        currency_code_array: selected_currencies
          ? selected_currencies.map(
              (currency: CurrencyForSelectType) => currency.code
            )
          : undefined,
        merchant_guid: selected_merchant
          ? selected_merchant.merchant_guid
          : undefined,
      })
  );

  const modifiedTerminalsData = useMemo(() => {
    return terminals
      ? terminals.data.map((terminal: TerminalForSelectType) => ({
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
      ? currencies.data.map((cur: CurrencyForSelectType) => ({
          ...cur,
          name: cur.code,
          label: cur.code,
          value: cur.guid,
        }))
      : [];
  }, [currencies]);

  const modifiedRatesData = useMemo(() => {
    if (modifiedCurrenciesData) {
      let result = modifiedCurrenciesData.map((cur: CurrencyForSelectType) => {
        let proc_rate = 0;
        if (cur.code !== "EUR")
          if (cur.isFlat)
            proc_rate = cur.rate_to_eur + +cur.exchange_markup_value;
          else
            proc_rate = cur.rate_to_eur * (cur.exchange_markup_value / 100 + 1);
        else proc_rate = cur.rate_to_eur;
        return {
          guid: cur.guid,
          name: cur.code,
          code: cur.code,
          bank_exchange_rate: cur.rate_to_eur,
          processor_exchange_rate: proc_rate,
          exchange_markup_value: cur.exchange_markup_value,
          isFlat: cur.isFlat,
        };
      });
      return result;
    } else return [];
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
        merchant: selected_merchant,
        shops: [],
        terminals: [],
        date: {
          startDate: moment().startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
          endDate: moment().endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
        },
        statement_currency: modifiedCurrenciesData.filter(
          (cur: CurrencyForSelectType) => cur.code === "EUR"
        )[0],
        bank_wire_fee: 0,
        name: "",
        additional_fees: [],
        // reason: "",
        currencies_rates: modifiedRatesData,

        //
        change_name: false,
        change_rates: false,
        currencies_filter: "",
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
            merchant_guid: values.merchant!.guid,
            terminals: values.terminals.map(
              (element: TerminalForSelectType) => element.guid
            ),
            from_date: values.date.startDate,
            to_date: values.date.endDate,
            statement_currency: values.statement_currency.code,
            currency_rates: values.currencies_rates,
            bank_wire_fee: roundMultiplyNumber(values.bank_wire_fee, 2),
            additional_fees: values.additional_fees.map((item: any) => ({
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
      {({ values, isSubmitting, setFieldValue, submitForm }) => (
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
                  setFieldValue("shops", []);
                  setFieldValue("terminals", []);
                }}
                isLoading={isLoadingMerchant}
              />
              <Field
                name="shops"
                inputType="multi-select"
                label="Shop*"
                options={modifiedShopsData}
                callback={(value: Array<ShopForSelectType>) => {
                  setShops(value);
                  setFieldValue("terminals", []);
                }}
                isLoading={shopsIsLoading || shopsIsFetching}
              />
              <Field
                name="select_all_shops"
                inputType="checkbox"
                label="Select all shops"
                callback={(value: boolean) => {
                  if (value) setFieldValue("shops", modifiedShopsData);
                  else setFieldValue("shops", []);
                }}
              />
              <Field
                name="terminals"
                inputType="multi-select"
                label="Terminals*"
                options={modifiedTerminalsData}
                isLoading={terminalsIsLoading || terminalsIsFetching}
              />
              <Field
                name="select_all_terminals"
                inputType="checkbox"
                label="Select all terminals"
                callback={(value: boolean) => {
                  if (value) setFieldValue("terminals", modifiedTerminalsData);
                  else setFieldValue("terminals", []);
                }}
              />
              <Field
                name="currencies_filter"
                inputType="multi-select"
                label="Filter terminals by currencies"
                options={modifiedCurrenciesData}
                callback={(value: Array<CurrencyForSelectType>) => {
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
              <Currency />
              <Field
                name="bank_wire_fee"
                inputType="number"
                precision={2}
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
