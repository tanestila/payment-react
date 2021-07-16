import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../Components/Common/Formik/Field";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMemo, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, Alert } from "antd";
import { Loading, SuccessModal, ErrorModal } from "../../Components/Common";
import { parseError } from "../../helpers/parseError";
import { gatewaysAPI } from "../../services/queries/management/gateways";
import { ratesAPI } from "../../services/queries/management/rates";
import { terminalsAPI } from "../../services/queries/management/terminals";

export default function Editor({ shop_guid, terminal_guid, handleClose }) {
  const queryClient = useQueryClient();
  const [gateway, setGateway] = useState(null);

  const {
    data: terminal,
    status,
    isFetching,
    error,
  } = useQuery(["terminal", shop_guid, terminal_guid], () =>
    terminalsAPI.getTerminal(shop_guid, terminal_guid)
  );

  const mutation = useMutation(terminalsAPI.addTerminal, {
    onSuccess: () => {
      queryClient.invalidateQueries("shop-terminals");
    },
  });

  const {
    data: gateways,
    isLoading: isGatewayLoading,
    isFetching: isGatewayFetching,
  } = useQuery(["gateways"], () => gatewaysAPI.getGateways());

  const { data: rates } = useQuery(
    ["rates", gateway],
    () =>
      ratesAPI.getRates({
        gateway_guid: gateway.guid,
      }),
    { enabled: gateway !== null }
  );

  const modifiedGatewaysData = useMemo(() => {
    return gateways
      ? gateways.data.map((gateway) => ({
          ...gateway,
          currencies: gateway.currencies.map((currency) => ({
            ...currency,
            name: currency.code,
            label: currency.code,
            value: currency.guid,
          })),
          label: gateway.name,
          value: gateway.guid,
        }))
      : [];
  }, [gateways]);

  const modifiedRatesData = useMemo(() => {
    return rates
      ? rates.data.map((rate) => ({
          ...rate,
          name: rate.name,
          guid: rate.guid,
          label: rate.name,
          value: rate.guid,
        }))
      : [];
  }, [rates]);

  useEffect(() => {
    if (modifiedGatewaysData && terminal) {
      const gate = modifiedGatewaysData.filter(
        (gate) => gate.guid === terminal.gateway_guid
      )[0];
      setGateway(gate);
    }
  }, [modifiedGatewaysData, terminal]);

  if (
    status === "loading" ||
    isFetching ||
    isGatewayLoading ||
    isGatewayFetching
  )
    return <Loading />;
  return (
    <Formik
      initialValues={{
        name: terminal.name,
        billing_descriptor: terminal.billing_descriptor,
        routing_string: terminal.routing_string,
        payment_amount_limit: terminal.payment_amount_limit,
        monthly_amount_limit: terminal.monthly_amount_limit,
        transaction_count_limit: terminal.transaction_count_limit,
        supported_brands: terminal.supported_brands,
        gateway: modifiedGatewaysData.filter(
          (gate) => gate.guid === terminal.gateway_guid
        )[0],
        currency: modifiedGatewaysData
          .filter((gate) => gate.guid === terminal.gateway_guid)[0]
          .currencies.filter((cur) => cur.name === terminal.currency_code)[0],

        rate: modifiedRatesData.filter(
          (rate) => rate.guid === terminal.rate_guid
        )[0],
        enabled: terminal.enabled,
        three_d: terminal.three_d,
        enable_checkout: terminal.enable_checkout,
        checkout_method: terminal.checkout_method,
        antifraud_monitor: terminal.antifraud_monitor,
        antifraud_monitor_value: terminal.antifraud_monitor_value,
        reason: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        billing_descriptor: Yup.string().required("Required"),
        routing_string: Yup.string().required("Required"),
        payment_amount_limit: Yup.number()
          .typeError("You must specify a number")
          .required("Required"),
        monthly_amount_limit: Yup.number()
          .typeError("You must specify a number")
          .required("Required"),
        transaction_count_limit: Yup.number()
          .typeError("You must specify a number")
          .required("Required"),
        supported_brands: Yup.string().required("Required"),
        currency: Yup.object().typeError("Required").required("Required"),
        gateway: Yup.object().typeError("Required").required("Required"),
        rate: Yup.object().typeError("Required").required("Required"),
        checkout_method: Yup.string().required("Required"),
        antifraud_monitor_value: Yup.number()
          .typeError("You must specify a number")
          .required("Required"),
        reason: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            guid: terminal_guid,
            shop_guid,
            name: values.name,
            billing_descriptor: values.billing_descriptor,
            routing_string: values.routing_string,
            payment_amount_limit: values.payment_amount_limit.toString(),
            monthly_amount_limit: values.monthly_amount_limit.toString(),
            transaction_count_limit: values.transaction_count_limit,
            supported_brands: values.supported_brands,
            currency_guid: values.currency?.["guid"],
            gateway_guid: values.gateway?.["guid"],
            rate_guid: values.rate?.["guid"],
            enabled: values.enabled,
            three_d: values.three_d,
            enable_checkout: values.enable_checkout,
            checkout_method: values.checkout_method,
            antifraud_monitor: values.antifraud_monitor,
            antifraud_monitor_value: values.antifraud_monitor_value.toString(),
            reason: values.reason,
          };
          await mutation.mutateAsync(data);
          SuccessModal("Terminal was updated");
          handleClose();
        } catch (error) {
          ErrorModal(parseError(error));
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form className="modal-form">
          {status === "error" && (
            <Alert
              message="Error"
              description={error.message}
              type="error"
              showIcon
            />
          )}
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <Field name="name" type="text" label="Name*" />
              <Field
                name="gateway"
                inputType="select"
                label="Gateway*"
                options={modifiedGatewaysData}
                callback={(value) => {
                  setGateway(value);
                  setFieldValue("currency", null);
                }}
              />
              <Field
                name="rate"
                inputType="select"
                label="Rate*"
                options={modifiedRatesData}
              />
              <Field
                name="currency"
                inputType="select"
                label="Currency*"
                options={values.gateway?.currencies}
              />
              <Field name="three_d" inputType="checkbox" label="3D" />
              <Field
                name="payment_amount_limit"
                type="number"
                label="Payment amount limit*"
              />
              <Field
                name="monthly_amount_limit"
                type="number"
                label="Monthly amount limit*"
              />
              <Field
                name="transaction_count_limit"
                type="number"
                label="Transaction count limit*"
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <Field
                name="billing_descriptor"
                type="text"
                label="Billing descriptor*"
              />
              <Field
                name="routing_string"
                type="text"
                label="Routing string*"
              />
              <Field
                name="supported_brands"
                type="text"
                label="Supported brands*"
              />
              <Field name="enabled" inputType="checkbox" label="Enabled" />
              <Field
                name="checkout_method"
                type="text"
                label="Checkout method*"
              />
              <Field
                name="enable_checkout"
                inputType="checkbox"
                label="Enabled checkout"
              />
              <Field
                name="antifraud_monitor_value"
                type="number"
                label="Antifraud monitor value*"
              />

              <Field
                name="antifraud_monitor"
                inputType="checkbox"
                label="Antifraud monitor"
              />
              <Field name="reason" type="text" label="Reason" />
            </Col>
          </Row>
          {isSubmitting ? (
            <Loading />
          ) : (
            <Button htmlType="submit" type="primary" className="f-right">
              Submit
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
}
