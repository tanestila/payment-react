import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "antd";
import { adminsAPI } from "../../../services/queries/management/users/admins";
import { Loading, SuccessModal } from "../../../Components/Common";

export default function Editor({ handleClose, guid }) {
  const queryClient = useQueryClient();
  const {
    data: merchant,
    status,
    isFetching,
    error,
  } = useQuery(["admin"], () => adminsAPI.getAdmin(guid));

  const mutation = useMutation(adminsAPI.addAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries("admins");
    },
  });

  return (
    <>
      {status === "loading" || isFetching ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{
            name: merchant.merchant_name,
            type: merchant.merchant_type,
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            first_name: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            last_name: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            company_name: Yup.string().required("Required"),
            company_address: Yup.string().required("Required"),
            name: Yup.string().required("Required"),
            type: Yup.string().required("Required"),
            monthly_fee: Yup.number()
              .typeError("You must specify a number")
              .required("Required"),
            monthly_fee_currency: Yup.object()
              .typeError("Required")
              .required("Required"),
            monthly_fee_date: Yup.string().required("Required"),
            monthly_amount_limit: Yup.number()
              .typeError("You must specify a number")
              .required("Required"),
            phone: Yup.string().required().min(5).required("Required"),
            role: Yup.object().typeError("Required").required("Required"),
            language: Yup.object().required("Required"),
            custom_amount_limit: Yup.string()
              .typeError("You must specify a number")
              .max(15)
              .required("Required"),
            custom_days_limit: Yup.number()
              .typeError("You must specify a number")
              .max(1000)
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            alert(JSON.stringify(values, null, 2));
            try {
              let data = {
                merchant_name: values.name,
                merchant_type: values.type,
                email: values.email,
                phone: values.phone,
                first_name: values.first_name,
                last_name: values.last_name,
                company_name: values.company_name,
                company_address: values.company_address,
                role_guid: values.role?.["guid"],
                password: values.send_mail ? undefined : values.password,
                send_mail: values.send_mail ? 1 : 0,
                language: values.language,
                enabled: values.enabled === true ? 1 : 0,
              };
              await mutation.mutateAsync(data);
              SuccessModal("Merchant was updated");
              handleClose();
            } catch (error) {
              console.log(error);
            } finally {
              console.log("done");
            }
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, meta }) => (
            <Form className="modal-form">
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
