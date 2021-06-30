import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { rolesAPI } from "../../../services/queries/management/roles";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { useCheckEmailExist } from "../../../customHooks/checkEmailExist";
import { useCheckPhoneExist } from "../../../customHooks/checkPhoneExist";
import { partnersAPI } from "../../../services/queries/management/users/partners";
import { useMemo } from "react";

export default function Creator() {
  const queryClient = useQueryClient();

  const mutation = useMutation(groupsAPI.addMerchant, {
    onSuccess: () => {
      queryClient.invalidateQueries("merchants");
    },
  });

  const { run: checkEmail } = useCheckEmailExist();
  const { run: checkPhone } = useCheckPhoneExist();

  const { data: roles } = useQuery(["roles"], () =>
    rolesAPI.getRoles({ type: "group" })
  );

  const { data: partners } = useQuery(["partners"], () =>
    partnersAPI.getPartners()
  );

  const modifiedPartnersData = useMemo(() => {
    return partners
      ? partners.data.map((group) => ({
          ...group,
          name: group.group_name,
          guid: group.group_guid,
        }))
      : [];
  }, [partners]);

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
        monthly_amount_limit: "",
        phone: "",
        role: null,
        language: { name: "ENG", label: "ENG", value: "en", guid: "en" },
        enabled: true,
        send_mail: true,
        password: "",
        partner: "",
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
        monthly_amount_limit: Yup.number()
          .typeError("You must specify a number")
          .required("Required"),
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
            <Field name="name" type="text" label="Group name" />
            <Field name="type" type="text" label="Group type" />
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={12}>
            <Field
              name="monthly_amount_limit"
              type="text"
              label="Monthly amount limit"
            />
            <Field name="enabled" type="checkbox" label="Enable" />
            <Field name="send_mail" type="checkbox" label="Send mail" />
            <Field name="language" type="text" label="Language" />
            <Field name="partner" type="text" label="Partner" />
          </Col>
        </Row>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
