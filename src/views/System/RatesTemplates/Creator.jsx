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

  const card_region = [
    { name: "ANY", guid: "ANY" },
    { name: "EU", guid: "EU" },
    { name: "Other", guid: "Other" },
  ];

  const transaction_statuses = [
    { name: "ANY", guid: "ANY" },
    { name: "3Dwaiting", guid: "3Dwaiting" },
    { name: "Failed", guid: "Failed" },
    { name: "Success", guid: "Success" },
    { name: "Pending", guid: "Pending" },
    { name: "Other", guid: "Other" },
  ];

  const transaction_types = [
    { name: "ANY", guid: "ANY" },
    { name: "Representment", guid: "Representment" },
    { name: "Payment", guid: "Payment" },
    { name: "Chargeback", guid: "Chargeback" },
    { name: "Reverse", guid: "Reverse" },
    { name: "Retrieval", guid: "Retrieval" },
    { name: "Charge", guid: "Charge" },
    { name: "Refund", guid: "Refund" },
    { name: "Cancel", guid: "Cancel" },
    { name: "Prearbitration", guid: "Prearbitration" },
    { name: "Recurring", guid: "Recurring" },
    { name: "Capture", guid: "Capture" },
    { name: "Authorization", guid: "Authorization" },
    { name: "Other", guid: "Other" },
  ];

  const card_types = [
    { name: "ANY", guid: "ANY" },
    { name: "credit", guid: "credit" },
    { name: "debit", guid: "debit" },
    { name: "premium", guid: "premium" },
    { name: "corporate", guid: "corporate" },
    { name: "Other", guid: "Other" },
  ];

  const card_schema = [
    { name: "ANY", guid: "ANY" },
    { name: "Visa", guid: "Visa" },
    { name: "MC", guid: "MC" },
    { name: "Other", guid: "Other" },
  ];

  return (
    <Formik
      initialValues={{
        name: "",
        transaction_statuses: null,
        transaction_types: null,
        card_currencies: null,
        card_types: null,
        card_schema: null,
        card_region: null,
        is_plain: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        gateway: Yup.object().typeError("Required").required("Required"),
        currency: Yup.object().typeError("Required").required("Required"),
        template: Yup.object().typeError("Required").required("Required"),
        activation_date: Yup.string().required("Required"),
        hold_percent: Yup.string().required("Required"),
        hold_days: Yup.string().required("Required"),
        connection_fee: Yup.string().required("Required"),
        terminal_registration_fee: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            gateway_guid: values.gateway.guid,
            name: values.name,
            activation_date: values.activation_date,
            template_guid: values.template.guid,
            currency_guid: values.currency.guid,
            hold_percent: values.hold_percent,
            hold_days: values.hold_days,
            connection_fee: values.connection_fee,
            terminal_registration_fee: values.terminal_registration_fee,
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
          <Field
            name="transaction_statuses"
            label="Transaction statuses*"
            inputType="multi-select"
            options={transaction_statuses}
          />
          <Field
            name="transaction_types"
            label="Transaction types*"
            inputType="multi-select"
            options={transaction_types}
          />
          <Field
            name="card_types"
            label="Card types*"
            inputType="multi-select"
            options={card_types}
          />
          <Field
            name="card_schema"
            label="Card schema*"
            inputType="multi-select"
            options={card_schema}
          />
          <Field
            name="card_region"
            label="Card region*"
            inputType="multi-select"
            options={card_region}
          />
          <Field name="is_plain" inputType="checkbox" label="Is plain*" />
          {/* another input */}

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
