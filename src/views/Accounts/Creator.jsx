import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";

import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import { rolesAPI } from "../../../services/queries/management/roles";
import { Button } from "antd";
import { SuccessModal } from "../../../Components/Common/SuccessModal";
import { ErrorModal } from "../../../Components/Common/ErrorModal";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { partnersAPI } from "../../../services/queries/management/users/partners";

export const AccountCreator = ({ handleClose, guid, type }) => {
  const queryClient = useQueryClient();

  const merchantMutation = useMutation(merchantsAPI.addMerchantLogin, {
    onSuccess: () => {
      queryClient.invalidateQueries("merchant-logins");
    },
  });

  const groupMutation = useMutation(groupsAPI.addGroupLogin, {
    onSuccess: () => {
      queryClient.invalidateQueries("group-logins");
    },
  });

  const partnerMutation = useMutation(partnersAPI.addPartnerLogin, {
    onSuccess: () => {
      queryClient.invalidateQueries("partner-logins");
    },
  });

  const { data: roles } = useQuery(["roles"], () =>
    rolesAPI.getRoles({ type })
  );

  return (
    <Formik
      initialValues={{
        email: "",
        first_name: "",
        last_name: "",
        company_name: "",
        company_address: "",
        phone: "",
        role: null,
        language: { name: "ENG", label: "ENG", value: "en", guid: "en" },
        enabled: true,
        send_mail: true,
        password: "",
        auth_type: "",
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
        phone: Yup.string().required().min(5).required("Required"),
        role: Yup.object().typeError("Required").required("Required"),
        language: Yup.object().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        try {
          let data = {
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
          };

          switch (type) {
            case "merchant": {
              await merchantMutation.mutateAsync({ guid, body: data });
              break;
            }
            case "group": {
              await groupMutation.mutateAsync({ guid, body: data });
              break;
            }
            case "partner": {
              await partnerMutation.mutateAsync({ guid, body: data });
              break;
            }
            default:
              break;
          }
          SuccessModal("Login was created");
          handleClose();
        } catch (error) {
          console.log(error);
          ErrorModal("Error", error);
          alert(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="modal-form">
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
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
            </Col>
          </Row>
          {isSubmitting ? (
            "lodaing"
          ) : (
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};
