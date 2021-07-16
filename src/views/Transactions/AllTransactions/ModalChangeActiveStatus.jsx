import { ErrorModal, Loading, SuccessModal } from "../../../Components/Common";
import { Button } from "antd";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Field } from "../../../Components/Common/Formik/Field";
import { parseError } from "../../../helpers/parseError";
import { useMutation, useQueryClient } from "react-query";
import { transactionsAPI } from "../../../services/queries/management/transactions/processing";

export const ModalChangeActiveStatus = ({ handleClose, guid, active }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(transactionsAPI.activeTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });

  return (
    <div>
      <Formik
        initialValues={{
          reason: "",
        }}
        validationSchema={Yup.object().shape({
          reason: Yup.string().required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            let data = {
              guid,
              reason: values.reason,
              active: active ? 0 : 1,
            };
            await mutation.mutateAsync(data);
            SuccessModal("Transaction status changed");
            handleClose();
          } catch (error) {
            ErrorModal(parseError(error));
            console.log(error);
          }
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="modal-form">
            <Field name="reason" type="text" label="Reason*" />
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
    </div>
  );
};
