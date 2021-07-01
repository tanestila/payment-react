import { Button, Row } from "antd";
import { Form, Formik } from "formik";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ErrorModal, Loading, SuccessModal } from "../../../Components/Common";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import * as Yup from "yup";
import { Field } from "../../../Components/Common/Formik/Field";
import { rolesAPI } from "../../../services/queries/management/roles";
import { adminsAPI } from "../../../services/queries/management/users/admins";

export const RowAddRole = ({ type, guid }) => {
  const [isShow, setIsShow] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(adminsAPI.addAdminRole, {
    onSuccess: () => {
      queryClient.invalidateQueries("admin-roles");
    },
  });

  const onClick = () => {
    setIsShow(!isShow);
  };

  const { data: roles, isLoading: merchantsIsLoading } = useQuery(
    ["roles"],
    () => rolesAPI.getRoles({ type })
  );

  return (
    <div>
      <Row justify="center">
        <Button onClick={onClick} className="m-b-15">
          Add role
        </Button>
      </Row>
      {isShow ? (
        <div>
          <Formik
            initialValues={{
              user: null,
              reason: "",
            }}
            validationSchema={Yup.object({
              user: Yup.object().typeError("Required").required("Required"),
              reason: Yup.string().required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                let data = {};

                data = {
                  merchant_guid: values.user.merchant_guid,
                  group_guid: guid,
                  reason: values.reason,
                };
                await mutation.mutateAsync(data);

                SuccessModal(`Role was added`);
              } catch (error) {
                ErrorModal("Error");
                console.log(error);
              }
              setSubmitting(false);
            }}
          >
            {({ errors, isSubmitting }) => (
              <Form className="modal-form">
                <Field
                  name="user"
                  inputType="select"
                  options={roles.data || []}
                  label="Roles"
                />
                <Field name="reason" type="text" label="Reason*" />

                {isSubmitting ? (
                  <Loading />
                ) : (
                  <Row justify="center">
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Row>
                )}
              </Form>
            )}
          </Formik>
        </div>
      ) : null}
    </div>
  );
};
