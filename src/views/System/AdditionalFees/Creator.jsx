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

export default function Creator({ handleClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(additionalFeesAPI.addAdditionalFee, {
    onSuccess: () => {
      queryClient.invalidateQueries("additional-fees");
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        enabled: true,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        enabled: Yup.boolean(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            fee_name: values.name,
            enabled: values.enabled,
          };
          await mutation.mutateAsync(data);
          SuccessModal("Additional fee was created");
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
