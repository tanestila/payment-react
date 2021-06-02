import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { merchantAPI } from "../../services/queries/management/merchant";
import { roleAPI } from "../../services/queries/management/role";

export default function Creator() {
  const mutation = useMutation(merchantAPI.addMerchant);
  const {
    isLoading,
    isError,
    error,
    data: roles,
    isFetching,
  } = useQuery(["roles"], () => roleAPI.getRoles({ type: "merchant" }), {
    keepPreviousData: true,
  });
  console.log(roles);
  return (
    <Formik
      initialValues={{ first_name: "", last_name: "", email: "" }}
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
        monthlyFee: Yup.number()
          .typeError("You must specify a number")
          .required("Required"),
        monthlyFeeCurrency: Yup.string().required("Required"),
        monthlyFeeDate: Yup.string().required("Required"),
        monthlyAmountLimit: Yup.number()
          .typeError("You must specify a number")
          .required("Required"),
        phone: Yup.string().required().min(5).required("Required"),
        role: Yup.string().required("Required"),
        language: Yup.string().required("Required"),
        customAmountLimit: Yup.string()
          .typeError("You must specify a number")
          .max(15)
          .required("Required"),
        customDaysLimit: Yup.number()
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
      <Form>
        <Row>
          <Col xl={6} lg={12} md={12} sm={12} xs={12}>
            <Field name="email" type="email" label="Email" />
            <Field name="first_name" type="text" label="First Name" />
            <Field name="last_name" type="text" label="Last Name" />
            <Field name="role" type="text" label="Role" as="select" options>
              {roles.data.map((role) => (
                <option value={role.guid}>{role.name}</option>
              ))}
            </Field>
            <Field name="phone" type="text" label="Phone" />
            <Field name="company_name" type="text" label="Company name" />
            <Field name="company_address" type="text" label="Company address" />
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
            <Field name="send_mail" type="checkbox" label="Send mail" />
            <Field name="language" type="text" label="Language" />
            <Field name="group" type="text" label="Group" />
          </Col>
        </Row>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
