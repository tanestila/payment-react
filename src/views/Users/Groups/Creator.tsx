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
import { Button } from "antd";
import {
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../../Components/Common";
import { parseError } from "../../../helpers/parseError";
import { roundMultiplyNumber } from "../../../helpers/formatNumber";
import { PartnerType } from "../../../types/partners";

export default function Creator({ handleClose }: { handleClose: () => {} }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(groupsAPI.addGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
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
      ? partners.data.map((partner: PartnerType) => ({
          ...partner,
          name: partner.partner_name,
          guid: partner.partner_guid,
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
        partner: null,
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Required")
          .test("emailExist", "Email exists", async (value) => {
            if (
              value &&
              value?.length > 8 &&
              value?.indexOf(".") !== -1 &&
              value?.indexOf("@") !== -1
            ) {
              const res = await checkEmail(value);
              return !!res;
            }
            return true;
          }),
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
        phone: Yup.string()
          .required()
          .min(5)
          .required("Required")
          .test("phoneExist", "Phone exists", async (value) => {
            if (value && value?.length > 5) {
              const res = await checkPhone(value);
              return !!res;
            }
            return true;
          }),
        role: Yup.object().typeError("Required").required("Required"),
        language: Yup.object().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            group_name: values.name,
            group_type: values.type,
            email: values.email,
            phone: values.phone,
            first_name: values.first_name,
            last_name: values.last_name,
            company_name: values.company_name,
            company_address: values.company_address,
            role_guid: values.role?.["guid"],
            password: values.send_mail ? undefined : values.password,
            send_mail: values.send_mail ? 1 : 0,
            language: values.language.guid,
            enabled: values.enabled === true ? 1 : 0,
            partner_guid: values.partner?.["partner_guid"],
            monthly_amount_limit: roundMultiplyNumber(
              values.monthly_amount_limit
            ).toString(),
          };
          await mutation.mutateAsync(data);
          SuccessModal("Group was created");
          handleClose();
        } catch (error) {
          ErrorModal(parseError(error));
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
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
                inputType="number"
                label="Monthly amount limit"
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
              <Field
                name="partner"
                inputType="select"
                options={modifiedPartnersData}
                label="Partner"
              />
            </Col>
          </Row>
          {isSubmitting ? (
            <FormLoading />
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
