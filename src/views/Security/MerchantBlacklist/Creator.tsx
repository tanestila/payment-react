import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { rolesAPI } from "../../../services/queries/management/roles";
import { useCheckEmailExist } from "../../../customHooks/checkEmailExist";
import { useCheckPhoneExist } from "../../../customHooks/checkPhoneExist";
import { Button } from "antd";
import {
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../../Components/Common";
import { adminsAPI } from "../../../services/queries/management/users/admins";
import { parseError } from "../../../helpers/parseError";

export default function Creator({ handleClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(adminsAPI.addAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries("admins");
    },
  });

  const { data: merchants } = useQuery(["merchants"], () =>
    rolesAPI.getRoles({ type: "admin" })
  );

  const types = [
    { name: "allow", guid: "allow", label: "allow", value: "allow" },
    { name: "deny", guid: "deny", label: "deny", value: "deny" },
  ];

  return (
    <Formik
      initialValues={{
        blacklist_rule: null,
        type: types[0],
        merchant: "",
      }}
      validationSchema={Yup.object({
        blacklist_rule: Yup.object().typeError("Required").required("Required"),
        type: Yup.object().typeError("Required").required("Required"),
        merchant: Yup.object().typeError("Required").required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            blacklist_rule_guid: values.blacklist_rule!["guid"],
            type: values.type!["name"],
          };
          await mutation.mutateAsync(data);
          SuccessModal("Record was created");
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
          <Field
            name="blacklist_rule"
            label="Rule*"
            inputType="select"
            options={[]}
          />
          <Field name="type" label="Rule*" inputType="select" options={types} />
          <Field
            name="merchant"
            label="Merchant*"
            inputType="select"
            options={[]}
          />
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
