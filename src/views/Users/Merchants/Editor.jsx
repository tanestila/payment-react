import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";

import { Col, Row, Form as BForm } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import { rolesAPI } from "../../../services/queries/management/roles";
import moment from "moment";
import { usersAPI } from "../../../services/queries/management/users/users";
import { useEffect, useMemo, useState } from "react";
import { currenciesAPI } from "../../../services/queries/management/currencies";
import { Button } from "antd";

export default function Editor({ guid }) {
  const [prevEmail, setPrevEmail] = useState("");
  const [isEmailExistEmail, setIsEmailExistEmail] = useState(false);
  const [error, setError] = useState(false);

  const mutation = useMutation(merchantsAPI.addMerchant);

  const { data: roles } = useQuery(
    ["roles"],
    () => rolesAPI.getRoles({ type: "merchant" }),
    {
      keepPreviousData: true,
    }
  );
  const { data: currencies } = useQuery(
    ["currencies"],
    () => currenciesAPI.getCurrencies(),
    {
      keepPreviousData: true,
    }
  );

  const modifiedData = useMemo(() => {
    return currencies
      ? currencies.data.map((cur) => ({ ...cur, name: cur.code }))
      : [];
  }, [currencies]);

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
        monthly_fee: "",
        monthly_fee_currency: null,
        monthly_fee_date: moment(),
        monthly_amount_limit: "",
        phone: "",
        role: null,
        language: { name: "ENG", label: "ENG", value: "en", guid: "en" },
        custom_amount_limit: "",
        custom_days_limit: "",
        enabled: true,
        send_mail: true,
        password: "",
        group: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        // .test("email", "Email exists", async (value) => {
        //   if (
        //     value &&
        //     value?.length > 8 &&
        //     value?.indexOf(".") !== -1 &&
        //     value?.indexOf("@") !== -1 &&
        //     prevEmail !== value
        //   ) {
        //     try {
        //       setPrevEmail(value);

        //       const { data: checkResponse } = await usersAPI.checkExists({
        //         email: value,
        //       });
        //       setIsEmailExistEmail(checkResponse.email_exists);
        //       console.log(!checkResponse.email_exists);

        //       return !checkResponse.email_exists;
        //     } catch (error) {
        //       return isEmailExistEmail;
        //     }
        //   }
        // }),
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
        monthly_fee_currency: Yup.object()
          .typeError("Required")
          .required("Required"),
        monthly_fee_date: Yup.string().required("Required"),
        monthly_amount_limit: Yup.number()
          .typeError("You must specify a number")
          .required("Required"),
        phone: Yup.string().required().min(5).required("Required"),
        role: Yup.object().typeError("Required").required("Required"),
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
          let data = {
            merchant_name: values.name,
            merchant_type: values.type,
            email: values.email,
            phone: values.phone,
            first_name: values.first_name,
            last_name: values.last_name,
            company_name: values.company_name,
            company_address: values.company_address,
            role_guid: values.role?.["guid"],
            password: values.send_mail ? undefined : values.password,
            send_mail: values.send_mail ? 1 : 0,
            language: values.language,
            enabled: values.enabled === true ? 1 : 0,
            monthly_fee_currency: values.monthly_fee_currency?.["name"],
            monthly_fee: +values.monthly_fee * 100,
            monthly_fee_date: values.monthly_fee_date,
            monthly_amount_limit: (
              +values.monthly_amount_limit * 100
            ).toString(),
            custom_amount_limit: (+values.custom_amount_limit * 100).toString(),
            custom_days_limit: values.custom_days_limit,
          };
          const todo = await mutation.mutateAsync(data);
          console.log(todo);
        } catch (error) {
          console.log(error);
        } finally {
          console.log("done");
        }
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, meta }) => (
        <Form className="modal-form">
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
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
              <Field name="name" type="text" label="Merchant name*" />
              <Field name="type" type="text" label="Merchant type*" />
              <Field
                name="role"
                label="Role*"
                inputType="select"
                options={roles?.data}
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <Field
                name="custom_days_limit"
                type="number"
                label="Merchant period limit* (days)"
              />
              <Field
                name="custom_amount_limit"
                type="number"
                label="Merchant amount limit*"
              />
              <Field
                name="monthly_amount_limit"
                type="number"
                label="Monthly amount limit*"
              />

              <Field name="monthly_fee" type="text" label="Monthly fee*" />
              <Field
                name="monthly_fee_currency"
                inputType="select"
                options={modifiedData}
                label="Monthly fee currency*"
              />
              <Field
                name="monthly_fee_date"
                type="text"
                label="Monthly fee date*"
                inputType="date-single"
                tip="From this date begins the payment of monthly fee."
              />
              <Field name="enabled" inputType="checkbox" label="Enable" />
              <Field
                name="send_mail"
                inputType="checkbox"
                label="Send mail"
                tip="We will send your generated username and password to your email."
              />
              {!values.send_mail ? (
                <Field name="password" type="text" label="Password" />
              ) : null}
              <Field
                name="language"
                label="Language*"
                inputType="select"
                options={[
                  { name: "ENG", guid: "en" },
                  { name: "RU", guid: "ru" },
                ]}
              />
              <Field name="group" type="text" label="Group" />
            </Col>
          </Row>
          {isSubmitting ? "lodaing" : <Button>Submit</Button>}
        </Form>
      )}
    </Formik>
  );
}
