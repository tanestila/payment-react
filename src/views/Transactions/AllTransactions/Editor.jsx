import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { transactionsAPI } from "../../../services/queries/management/transactions/processing";
import { Alert, Button } from "antd";
import { ErrorModal, Loading, SuccessModal } from "../../../Components/Common";
import { parseError } from "../../../helpers/parseError";

const statuses = [
  { name: "Success", guid: "1", label: "Success", value: "1" },
  { name: "Failed", guid: "2", label: "Failed", value: "2" },
  { name: "Pending", guid: "3", label: "Pending", value: "3" },
  { name: "3Dwaiting", guid: "4", label: "3Dwaiting", value: "4" },
];

export default function Editor({ handleClose, guid }) {
  const queryClient = useQueryClient();
  const {
    data: transaction,
    status,
    isFetching,
    error,
  } = useQuery(["transaction", guid], () =>
    transactionsAPI.getTransaction(guid)
  );

  const merchantMutation = useMutation(transactionsAPI.updateTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });

  return (
    <>
      {status === "loading" || isFetching ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{
            status: statuses.filter(
              (status) => status.name === transaction.status
            )[0],
            date: transaction.date_time,
            bin_country: transaction.bin_country,
            amount: transaction.amount,
            to_processor_pct: transaction.rate.to_processor_pct,
            to_processor_fixed: transaction.rate.to_processor_fixed,
            to_bank_pct: transaction.rate.to_bank_pct,
            need_rates_changes: false,
            to_bank_fixed: transaction.rate.to_bank_fixed,
            to_client: transaction.rate.to_client,
            hold: transaction.rate.hold,
            hold_date: transaction.rate.hold_date,
            hold_flag: transaction.rate.hold_flag,
            reason: "",
          }}
          validationSchema={() => {
            return Yup.lazy((values) => {
              let schema = {
                status: Yup.object().typeError("Required").required("Required"),
                date: Yup.string().typeError("Required").required("Required"),
                bin_country: Yup.string().required("Required"),
                amount: Yup.number()
                  .typeError("You must specify a number")
                  .required("Required"),
                reason: Yup.string().required("Required"),
              };
              let schema_with_rates = {
                to_processor_pct: Yup.number()
                  .typeError("You must specify a number")
                  .required("Required"),
                to_processor_fixed: Yup.number()
                  .typeError("You must specify a number")
                  .required("Required"),
                to_bank_pct: Yup.number()
                  .typeError("You must specify a number")
                  .required("Required"),
                to_bank_fixed: Yup.number()
                  .typeError("You must specify a number")
                  .required("Required"),
                to_client: Yup.number()
                  .typeError("You must specify a number")
                  .required("Required"),
                hold: Yup.number()
                  .typeError("You must specify a number")
                  .required("Required"),
                hold_date: Yup.string().required("Required"),
                hold_flag: Yup.boolean(),
              };
              if (values.need_rates_changes) {
                return Yup.object().shape({ ...schema, ...schema_with_rates });
              } else {
                return Yup.object().shape({ ...schema });
              }
            });
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              let data = {
                guid,
                status: values.status.name,
                date: values.date,
                bin_country: values.bin_country,
                amount: values.amount.toString(),
                to_processor_pct: values.to_processor_pct,
                to_processor_fixed: values.to_processor_fixed,
                to_bank_pct: values.to_bank_pct,
                to_bank_fixed: values.to_bank_fixed,
                hold: values.hold,
                hold_date: values.hold_date,
                hold_flag: values.hold_flag,
                reason: values.reason,
              };
              await merchantMutation.mutateAsync(data);
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
              {status === "error" && (
                <Alert
                  message="Error"
                  description={error.message}
                  type="error"
                  showIcon
                />
              )}
              <Row>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Field
                    name="status"
                    inputType="select"
                    options={statuses}
                    label="Status*"
                  />
                  <Field name="date" inputType="date-time" label="Date*" />
                  <Field name="bin_country" type="text" label="BIN country*" />
                  <Field name="amount" type="number" label="Amount*" />
                  <Field name="reason" type="text" label="Reason*" />
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Field
                    name="need_rates_changes"
                    inputType="checkbox"
                    label="Change rates"
                  />
                  {values.need_rates_changes && (
                    <>
                      <Field name="hold" type="number" label="Hold*" />
                      <Field
                        name="hold_date"
                        inputType="date-single"
                        label="Hold date*"
                      />
                      <Field
                        name="hold_flag"
                        inputType="checkbox"
                        label="Hold flag*"
                      />
                      <Field
                        name="to_processor_pct"
                        type="number"
                        label="To processor(%)*"
                      />
                      <Field
                        name="to_processor_fixed"
                        type="number"
                        label="To processor(fixed)*"
                      />
                      <Field
                        name="to_bank_pct"
                        type="number"
                        label="To bank(%)*"
                      />
                      <Field
                        name="to_bank_fixed"
                        type="number"
                        label="To bank(fixed)*"
                      />
                    </>
                  )}
                </Col>
              </Row>
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
      )}
    </>
  );
}
