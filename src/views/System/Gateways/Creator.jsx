import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { currenciesAPI } from "../../../services/queries/management/currencies";

export const Creator = ({ handleClose }) => {
  const mutation = useMutation(currenciesAPI.addCurrency);
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(1).max(100).trim().required("Required"),
        description: Yup.string().trim().required("Required"),
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
              <Field name="name" type="text" label="Name" />
              <Field name="description" type="text" label="Description" />
            </Col>
          </Row>
          {mutation.isLoading && "loading"}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
