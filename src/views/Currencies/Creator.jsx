import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { currencyAPI } from "../../services/queries/management/currency";

export default function Creator({ handleClose }) {
  const mutation = useMutation(currencyAPI.addCurrency);
  return (
    <Formik
      initialValues={{
        name: "",
        code: "",
        number: "",
        rate_to_eur: "",
        exchange_markup_value: "",
        isFlat: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(1).max(100).trim().required("Required"),
        code: Yup.string()
          .matches(/^[A-Z]{3}$/, "Must contain three uppercase characters")
          .required("Required"),
        number: Yup.string()
          .matches(/^[0-9]{3}$/, "Must contain three digits")
          .required("Required"),
        rate_to_eur: Yup.number().required("Required"),
        exchange_markup_value: Yup.number()
          .typeError("you must specify a number")
          .min(0)
          .max(100)
          .required("Required"),
        isFlat: Yup.boolean().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const todo = await mutation.mutateAsync(values);
          console.log(todo);
          handleClose();
        } catch (error) {
          console.log(error.response.data.description.message);
        } finally {
          console.log("done");
        }
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col xl={6} lg={12} md={12} sm={12} xs={12}>
              <Field name="name" type="text" label="name" />
              <Field name="code" type="text" label="code" />
              <Field name="number" type="text" label="number" />
              <Field name="rate_to_eur" type="text" label="Rate to eur" />
              <Field
                name="exchange_markup_value"
                type="number"
                label="exchange_markup_value"
              />
              <Field name="isFlat" type="checkbox" label="isFlat" />
            </Col>
          </Row>
          {mutation.isLoading && "loading"}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
