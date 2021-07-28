import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { Button } from "antd";
import {
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../../Components/Common";
import { parseError } from "../../../helpers/parseError";
import { ratesAPI } from "../../../services/queries/management/rates";

export default function Creator({ handleClose, guid }) {
  const queryClient = useQueryClient();

  const {
    data: template,
    status,
    isFetching,
    error,
  } = useQuery(["rate-template", guid], () => ratesAPI.getRatesTemplate(guid));

  const mutation = useMutation(ratesAPI.addRateTemplate, {
    onSuccess: () => {
      queryClient.invalidateQueries("rate-templates");
    },
  });

  if (status === "loading") return <FormLoading />;
  return (
    <Formik
      initialValues={{
        name: template.name,
        reason: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        reason: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            guid,
            name: values.name,
            reason: values.reason,
          };
          await mutation.mutateAsync(data);
          SuccessModal("Rate templates was updated");
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
