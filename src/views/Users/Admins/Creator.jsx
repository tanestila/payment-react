import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";

export default function Creator() {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        companyName: Yup.string().required("Required"),
        companyAddress: Yup.string().required("Required"),
        name: Yup.string().required("Required"),
        type: Yup.string().required("Required"),
        monthlyFee: Yup.number().required("Required"),
        monthlyFeeCurrency: Yup.string().required("Required"),
        monthlyFeeDate: Yup.string().required("Required"),
        monthlyAmountLimit: Yup.number().required("Required"),
        phone: Yup.string().required().min(5).required("Required"),
        role: Yup.string().required("Required"),
        language: Yup.string().required("Required"),
        customAmountLimit: Yup.string().max(15).required("Required"),
        customDaysLimit: Yup.number().max(1000).required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <Row>
          <Col xl={6} lg={12} md={12} sm={12} xs={12}>
            <Field name="email" type="email" label="Email" />
            <Field name="firstName" type="text" label="First Name" />
            <Field name="lastName" type="text" label="Last Name" />
            <Field name="role" type="text" label="Role" />
            <Field name="phone" type="text" label="Phone" />
            <Field name="companyName" type="text" label="Company name" />
            <Field name="companyAddress" type="text" label="Company address" />
            <Field name="name" type="text" label="Merchant name" />
            <Field name="type" type="text" label="Merchant type" />
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={12}>
            <Field
              name="customDaysLimit"
              type="text"
              label="Merchant period limit (days)"
            />
            <Field
              name="customAmountLimit"
              type="text"
              label="Merchant amount limit"
            />
            <Field
              name="monthlyAmountLimit"
              type="text"
              label="Monthly amount limit"
            />
            <Field name="monthlyFee" type="text" label="Monthly fee" />
            <Field
              name="monthlyFeeCurrency"
              type="text"
              label="Monthly fee curr"
            />
            <Field name="monthlyFeeDate" type="text" label="Monthly fee date" />
            <Field name="enabled" type="checkbox" label="Enable" />
            <Field name="sendMail" type="checkbox" label="Send mail" />
            <Field name="language" type="text" label="Language" />
            <Field name="group" type="text" label="Group" />
          </Col>
        </Row>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
