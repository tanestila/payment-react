import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import { rolesAPI } from "../../../services/queries/management/roles";
import { Button } from "antd";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { partnersAPI } from "../../../services/queries/management/users/partners";
import { useEffect, useMemo, useState } from "react";
import { useCheckEmailExist } from "../../../customHooks/checkEmailExist";
import { useCheckPhoneExist } from "../../../customHooks/checkPhoneExist";
import { ErrorModal, Loading, SuccessModal } from "../../../Components/Common";
import { parseError } from "../../../helpers/parseError";

type LoginEditorProps = {
  handleClose: Function;
  guid: string;
  type: string;
  login: any;
  ability: any;
};

export const LoginEditor: React.FC<LoginEditorProps> = ({
  handleClose,
  guid,
  type,
  login,
  ability,
}) => {
  const [privilege, setPrivilege] = useState(false);
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
      ? roles.data.map((role: any) => ({
          ...role,
          value: role.guid,
          label: role.name,
        }))
      : [];
  }, [roles]);

  useEffect(() => {
    switch (type) {
      case "partner":
        setPrivilege(ability.can("EXECUTE", "PARTNERLOGINEMAIL"));
        break;
      case "group":
        setPrivilege(ability.can("EXECUTE", "GROUPLOGINEMAIL"));
        break;
      case "merchant":
        setPrivilege(ability.can("EXECUTE", "MERCHANTLOGINEMAIL"));
        break;
      default:
        setPrivilege(false);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
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
              (role: any) => role.guid === login.role.guid
            )[0],
            language: { name: "ENG", label: "ENG", value: "en", guid: "en" },
            enabled: login.enabled,
            auth_type: "",
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
                  value !== login.email
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
                if (value && value?.length > 5 && value !== login.phone) {
                  const res = await checkPhone(value);
                  return !!res;
                }
                return true;
              }),
            role: Yup.object().typeError("Required").required("Required"),
            language: Yup.object().required("Required"),
            reason: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              let data = {
                login_guid: login.guid,
                email: values.email,
                phone: values.phone,
                first_name: values.first_name,
                last_name: values.last_name,
                company_name: values.company_name,
                company_address: values.company_address,
                role_guid: values.role?.["guid"],
                language: values.language.guid,
                enabled: values.enabled === true ? 1 : 0,
                reason: values.reason,
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
              ErrorModal(parseError(error));
            }
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form className="modal-form">
              <Row>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Field
                    name="email"
                    type="email"
                    label="Email*"
                    disabled={!privilege}
                  />
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
                  <Field name="reason" type="text" label="Reason*" />
                </Col>
              </Row>
              {isSubmitting ? (
                <Loading />
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
};
