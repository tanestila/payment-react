import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../Components/Common/Formik/Field";
import { SelectField } from "../../Components/Common/Formik/SelectField";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { merchantsAPI } from "../../services/queries/management/merchants";
import { rolesAPI } from "../../services/queries/management/roles";

export default function Creator() {
  const mutation = useMutation(merchantsAPI.addMerchant);

  const { data: roles } = useQuery(
    ["roles"],
    () => rolesAPI.getRoles({ type: "merchant" }),
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
        name: "",
        type: "",
        monthly_fee: "",
        monthly_fee_currency: "",
        monthly_fee_date: "",
        monthly_amount_limit: "",
        phone: "",
        role: "",
        language: { name: "ENG", label: "ENG", value: "en", guid: "en" },
        custom_amount_limit: "",
        custom_days_limit: "",
        enabled: false,
        send_mail: false,
        group: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        // .test("ip", "Invalid IP address", (value) => {
        //   return value.split(".").find((i) => parseInt(i, 10) > 255);
        // })
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
        monthly_fee: Yup.number()
          .typeError("You must specify a number")
          .required("Required"),
        monthly_fee_currency: Yup.string().required("Required"),
        monthly_fee_date: Yup.string().required("Required"),
        monthly_amount_limit: Yup.number()
          .typeError("You must specify a number")
          .required("Required"),
        phone: Yup.string().required().min(5).required("Required"),
        role: Yup.object().required("Required"),
        language: Yup.object().required("Required"),
        custom_amount_limit: Yup.string()
          .typeError("You must specify a number")
          .max(15)
          .required("Required"),
        custom_days_limit: Yup.number()
          .typeError("You must specify a number")
          .max(1000)
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        try {
          const todo = await mutation.mutateAsync(values);
          console.log(todo);
        } catch (error) {
          console.error(error);
        } finally {
          console.log("done");
        }
        setSubmitting(false);
      }}
    >
      <Form className="modal-form">
        <Row>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <Field name="email" type="email" label="Email" />
            <Field name="first_name" type="text" label="First Name" />
            <Field name="last_name" type="text" label="Last Name" />
            <Field name="phone" type="text" label="Phone" />
            <Field name="company_name" type="text" label="Company name" />
            <Field name="company_address" type="text" label="Company address" />
            <Field name="name" type="text" label="Merchant name" />
            <Field name="type" type="text" label="Merchant type" />
            <SelectField name="role" label="Role" options={roles?.data} />
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <Field
              name="custom_days_limit"
              type="text"
              label="Merchant period limit (days)"
            />
            <Field
              name="custom_amount_limit"
              type="text"
              label="Merchant amount limit"
            />
            <Field
              name="monthly_amount_limit"
              type="text"
              label="Monthly amount limit"
            />
            <Field name="monthly_fee" type="text" label="Monthly fee" />
            <Field
              name="monthly_fee_currency"
              type="text"
              label="Monthly fee currency"
            />
            <Field
              name="monthly_fee_date"
              type="text"
              label="Monthly fee date"
            />
            <Field name="enabled" type="checkbox" label="Enable" />
            <Field name="send_mail" type="checkbox" label="Send mail" />
            {/* <Field name="language" type="text" label="Language" /> */}
            <SelectField
              name="language"
              label="Language"
              options={[
                { name: "ENG", guid: "en" },
                { name: "RU", guid: "ru" },
              ]}
            />
            <Field name="group" type="text" label="Group" />
          </Col>
        </Row>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
