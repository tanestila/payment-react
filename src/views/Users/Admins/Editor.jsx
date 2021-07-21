import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Alert, Button } from "antd";
import { adminsAPI } from "../../../services/queries/management/users/admins";
import {
  ErrorModal,
  FormLoading,
  Loading,
  SuccessModal,
} from "../../../Components/Common";
import { parseError } from "../../../helpers/parseError";
import { AbilityContext } from "../../../Components/Common/Can";
import { useContext } from "react";
import { useCheckEmailExist } from "../../../customHooks/checkEmailExist";
import { useCheckPhoneExist } from "../../../customHooks/checkPhoneExist";

export default function Editor({ handleClose, guid }) {
  const ability = useContext(AbilityContext);
  const queryClient = useQueryClient();
  const {
    data: admin,
    status,
    isFetching,
    error,
  } = useQuery(["admin"], () => adminsAPI.getAdmin(guid));

  const { run: checkEmail } = useCheckEmailExist();
  const { run: checkPhone } = useCheckPhoneExist();

  const mutation = useMutation(adminsAPI.addAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries("admins");
    },
  });

  return (
    <>
      {status === "loading" || isFetching ? (
        <FormLoading />
      ) : (
        <Formik
          initialValues={{
            email: admin.email,
            first_name: admin.first_name,
            last_name: admin.last_name,
            username: admin.username,
            phone: admin.phone,
            enabled: admin.enabled,
            auth_type: admin.auth_type === "login-password-mail",
            reason: "",
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
                  value?.indexOf("@") !== -1 &&
                  value !== admin.email
                ) {
                  const res = await checkEmail(value);
                  return !!res;
                }
                return true;
              }),
            first_name: Yup.string().required("Required"),
            last_name: Yup.string().required("Required"),
            username: Yup.string().required("Required"),
            phone: Yup.string()
              .required()
              .min(5)
              .required("Required")
              .test("phoneExist", "Phone exists", async (value) => {
                if (value && value?.length > 5 && value !== admin.phone) {
                  const res = await checkPhone(value);
                  return !!res;
                }
                return true;
              }),
            reason: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              let data = {
                guid,
                email: ability.can("EXECUTE", "USERADMINEMAIL")
                  ? values.email
                  : undefined,
                first_name: values.first_name,
                last_name: values.last_name,
                username: values.username,
                phone: values.phone,
                enabled: values.enabled ? 1 : 0,
                auth_type: ability.can("EXECUTE", "USERADMINAUTHTYPE")
                  ? values.auth_type
                    ? "login-password-mail"
                    : "login-password"
                  : undefined,
                reason: values.reason,
              };
              await mutation.mutateAsync(data);
              SuccessModal("Admin was updated");
              handleClose();
            } catch (error) {
              ErrorModal(parseError(error));
              console.log(error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="modal-form">
              {status === "error" && (
                <Alert
                  message="Error"
                  description={error.message}
                  type="error"
                  showIcon
                />
              )}
              <Row>
                <Col>
                  <Field
                    name="email"
                    type="email"
                    label="Email*"
                    disabled={!ability.can("EXECUTE", "USERADMINEMAIL")}
                  />
                  <Field name="username" type="text" label="Username*" />
                  <Field name="first_name" type="text" label="First Name*" />
                  <Field name="last_name" type="text" label="Last Name*" />
                  <Field name="phone" inputType="phone" label="Phone*" />
                  <Field name="enabled" inputType="checkbox" label="Enable" />
                  <Field
                    name="auth_type"
                    inputType="checkbox"
                    label="Two-factor authentication"
                    disabled={!ability.can("EXECUTE", "USERADMINAUTHTYPE")}
                  />
                  <Field name="reason" type="text" label="Reason*" />
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
      )}
    </>
  );
}
