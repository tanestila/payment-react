import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "antd";
import {
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../../Components/Common";
import { parseError } from "../../../helpers/parseError";
import { additionalFeesAPI } from "../../../services/queries/management/rates/additionalFees";

export default function Creator({ handleClose, fee }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(additionalFeesAPI.addAdditionalFee, {
    onSuccess: () => {
      queryClient.invalidateQueries("additional-fees");
    },
  });

  return (
    <Formik
      initialValues={{
        name: fee.name,
        enabled: fee.enabled,
        reason: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        enabled: Yup.boolean(),
        reason: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            guid: fee.guid,
            fee_name: values.name,
            enabled: values.enabled,
            reason: values.reason,
          };
          await mutation.mutateAsync(data);
          SuccessModal("Additional fee was updated");
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
          <Field name="name" type="text" label="Name*" />
          <Field name="enabled" inputType="checkbox" label="Enable" />
          <Field name="reason" type="text" label="Reason*" />
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
