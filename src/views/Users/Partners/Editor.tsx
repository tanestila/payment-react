import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Alert, Button } from "antd";
import {
  ErrorModal,
  FormLoading,
  SuccessModal,
} from "../../../Components/Common";
import { partnersAPI } from "../../../services/queries/management/users/partners";
import { parseError } from "../../../helpers/parseError";

export default function Editor({
  handleClose,
  guid,
}: {
  handleClose: () => {};
  guid: string;
}) {
  const queryClient = useQueryClient();
  const {
    data: partner,
    status,
    isFetching,
    error,
  } = useQuery(["partner", guid], () => partnersAPI.getPartner(guid));

  const mutation = useMutation(partnersAPI.addPartner, {
    onSuccess: () => {
      queryClient.invalidateQueries("partners");
    },
  });

  return (
    <>
      {status === "loading" || isFetching ? (
        <FormLoading />
      ) : (
        <Formik
          initialValues={{
            name: partner.partner_name,
            type: partner.partner_type,
            reason: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            type: Yup.string().required("Required"),
            reason: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              let data = {
                partner_guid: guid,
                partner_name: values.name,
                partner_type: values.type,
                reason: values.reason,
              };
              await mutation.mutateAsync(data);
              SuccessModal("Partner was updated");
              handleClose();
            } catch (error) {
              ErrorModal(parseError(error));
              console.log(error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="modal-form">
              {status === "error" && (
                <Alert
                  message="Error"
                  description={error.message}
                  type="error"
                  showIcon
                />
              )}
              <Row>
                <Col>
                  <Field name="name" type="text" label="Partner name*" />
                  <Field name="type" type="text" label="Partner type*" />
                  <Field name="reason" type="text" label="Reason*" />
                </Col>
              </Row>
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
      )}
    </>
  );
}
