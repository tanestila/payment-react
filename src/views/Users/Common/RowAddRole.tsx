import { Button, Row } from "antd";
import { Form, Formik } from "formik";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ErrorModal, Loading, SuccessModal } from "../../../Components/Common";
import * as Yup from "yup";
import { Field } from "../../../Components/Common/Formik/Field";
import { rolesAPI } from "../../../services/queries/management/roles";
import { adminsAPI } from "../../../services/queries/management/users/admins";
import { parseError } from "../../../helpers/parseError";
import { RoleType } from "../../../types/roles";
export const RowAddRole = ({
  type,
  guid,
  adminRoles,
}: {
  type: string;
  guid: string;
  adminRoles: Array<any>;
}) => {
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

  const { data: roles } = useQuery(["roles"], () =>
    rolesAPI.getRoles({ type })
  );

  const modifiedRolesData = useMemo(() => {
    return roles
      ? roles.data
          .map((role: RoleType) => ({
            ...role,
            value: role.guid,
            label: role.name,
          }))
          .filter(
            (x: RoleType) =>
              !adminRoles.includes(
                adminRoles.filter((y) => y.guid === x.guid)[0]
              )
          )
      : [];
  }, [roles, adminRoles]);

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
              role: null,
              reason: "",
            }}
            validationSchema={Yup.object({
              role: Yup.object().typeError("Required").required("Required"),
              reason: Yup.string().required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                let data = {
                  guid: values.role!["guid"],
                  reason: values.reason,
                };
                await mutation.mutateAsync({ guid, body: data });

                SuccessModal(`Role was added`);
              } catch (error) {
                ErrorModal(parseError(error));
                console.log(error);
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="modal-form">
                <Field
                  name="role"
                  inputType="select"
                  options={modifiedRolesData || []}
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
