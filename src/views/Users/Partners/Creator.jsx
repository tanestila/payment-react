import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { rolesAPI } from "../../../services/queries/management/roles";

export default function Creator() {
  const { data: roles } = useQuery(
    ["roles"],
    () => rolesAPI.getRoles({ type: "partner" }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <Formik
      initialValues={{
        email: "",
        first_name: "",
        last_name: "",
        company_name: "",
        company_address: "",
        name: "",
        type: "",
        phone: "",
        role: null,
        language: { name: "ENG", label: "ENG", value: "en", guid: "en" },
        enabled: true,
        send_mail: true,
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        first_name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        last_name: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        company_name: Yup.string().required("Required"),
        company_address: Yup.string().required("Required"),
        name: Yup.string().required("Required"),
        type: Yup.string().required("Required"),
        phone: Yup.string().required().min(5).required("Required"),
        role: Yup.object().typeError("Required").required("Required"),
        language: Yup.object().required("Required"),
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
            <Field name="email" type="email" label="Email*" />
            <Field name="first_name" type="text" label="First Name*" />
            <Field name="last_name" type="text" label="Last Name*" />
            <Field name="phone" inputType="phone" label="Phone*" />
            <Field name="company_name" type="text" label="Company name*" />
            <Field
              name="company_address"
              type="text"
              label="Company address*"
            />
            <Field
              name="role"
              label="Role*"
              inputType="select"
              options={roles?.data}
            />
            <Field name="name" type="text" label="Partner name" />
            <Field name="type" type="text" label="Partner type" />
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={12}>
            <Field name="enabled" type="checkbox" label="Enable" />
            <Field name="send_mail" type="checkbox" label="Send mail" />
            <Field name="language" type="text" label="Language" />
          </Col>
        </Row>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
