import { ErrorModal, Loading, SuccessModal } from "../../../Components/Common";
import { Alert, Button } from "antd";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Field } from "../../../Components/Common/Formik/Field";
import { parseError } from "../../../helpers/parseError";

export const ModalChangeActiveStatus = ({ handleClose, guid }) => {
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
              reason: "",
            };
            // await merchantMutation.mutateAsync(data);
            SuccessModal("Merchant was updated");
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
