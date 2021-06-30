import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "antd";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { ErrorModal, Loading, SuccessModal } from "../../../Components/Common";
import { partnersAPI } from "../../../services/queries/management/users/partners";

export default function Editor({ handleClose, guid }) {
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
        <Loading />
      ) : (
        <Formik
          initialValues={{
            name: partner.partner_name,
            type: partner.partner_type,
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            type: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            alert(JSON.stringify(values, null, 2));
            try {
              let data = {
                guid,
                partner_name: values.name,
                partner_type: values.type,
              };
              await mutation.mutateAsync(data);
              SuccessModal("Partner was updated");
              handleClose();
            } catch (error) {
              ErrorModal("Error");
              console.log(error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form className="modal-form">
              {errors && errors}
              <Row>
                <Col>
                  <Field name="name" type="text" label="Merchant name*" />
                  <Field name="type" type="text" label="Merchant type*" />
                </Col>
              </Row>
              {isSubmitting ? (
                <Loading />
              ) : (
                <Button type="primary" style={{ float: "right" }}>
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
