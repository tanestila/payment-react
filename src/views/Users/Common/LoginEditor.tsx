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
import { useMemo } from "react";
import { useCheckEmailExist } from "../../../customHooks/checkEmailExist";
import { useCheckPhoneExist } from "../../../customHooks/checkPhoneExist";

export const LoginEditor = ({ handleClose, guid, type, login }) => {
  const queryClient = useQueryClient();

  const { run: checkEmail } = useCheckEmailExist();
  const { run: checkPhone } = useCheckPhoneExist();

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

  const { data: roles, isLoading } = useQuery(["roles"], () =>
    rolesAPI.getRoles({ type })
  );

  const modifiedRolesData = useMemo(() => {
    return roles
      ? roles.data.map((role) => ({
          ...role,
          value: role.guid,
          label: role.name,
        }))
      : [];
  }, [roles]);

  return (
    <>
      {isLoading ? (
        <>loading</>
      ) : (
        <Formik
          initialValues={{
            email: login.email,
            first_name: login.first_name,
            last_name: login.last_name,
            company_name: login.company_name,
            company_address: login.company_address,
            phone: login.phone,
            role: modifiedRolesData.filter(
              (role) => role.guid === login.role.guid
            )[0],
            language: { name: "ENG", label: "ENG", value: "en", guid: "en" },
            enabled: login.enabled,
            auth_type: "",
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
                  <Field
                    name="company_name"
                    type="text"
                    label="Company name*"
                  />
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
      )}
    </>
  );
};
