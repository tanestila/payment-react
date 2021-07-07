import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../Components/Common/Formik/Field";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "antd";
import { Loading, SuccessModal, ErrorModal } from "../../Components/Common";
import { shopsAPI } from "../../services/queries/management/shops";
import { merchantsAPI } from "../../services/queries/management/users/merchnats";
import { parseError } from "../../helpers/parseError";

export default function Creator({ handleClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(shopsAPI.addShop, {
    onSuccess: () => {
      queryClient.invalidateQueries("shops");
    },
  });

  const { data: merchants } = useQuery(["merchants"], () =>
    merchantsAPI.getMerchants()
  );

  const modifiedMerchantsData = useMemo(() => {
    return merchants
      ? merchants.data.map((mer) => ({
          ...mer,
          name: mer.merchant_name,
          guid: mer.merchant_guid,
        }))
      : [];
  }, [merchants]);

  const risks = [
    { guid: 1, name: "Low" },
    { guid: 2, name: "Medium" },
    { guid: 3, name: "High" },
  ];

  return (
    <Formik
      initialValues={{
        name: "",
        billing_descriptor: "",
        routing_string: "",
        payment_amount_limit: "",
        monthly_amount_limit: "",
        transaction_count_limit: "",
        supported_brands: "",
        currency: null,
        gateway: null,
        rate: null,
        enabled: false,
        three_d: false,
        enable_checkout: false,
        checkout_method: "",
        antifraud_monitor: false,
        antifraud_monitor_value: "",
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
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {};
          await mutation.mutateAsync(data);
          SuccessModal("Terminal was created");
          handleClose();
        } catch (error) {
          ErrorModal(parseError(error));
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="modal-form">
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <Field name="name" type="text" label="Name*" />
              <Field
                name="gateway"
                inputType="select"
                label="Gateway*"
                options={[]}
              />
              <Field
                name="rate"
                inputType="select"
                label="Rate*"
                options={[]}
              />
              <Field
                name="currency"
                inputType="select"
                label="Currency*"
                options={[]}
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
