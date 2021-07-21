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
import { ratesAPI } from "../../../services/queries/management/rates";

export default function Creator({ handleClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(ratesAPI.addRate, {
    onSuccess: () => {
      queryClient.invalidateQueries("rates");
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            name: values.name,
          };
          await mutation.mutateAsync(data);
          SuccessModal("Rate was created");
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
