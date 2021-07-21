import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "antd";
import {
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../../Components/Common";
import { parseError } from "../../../helpers/parseError";
import { ratesAPI } from "../../../services/queries/management/rates";
import { gatewaysAPI } from "../../../services/queries/management/gateways";
import { useMemo } from "react";
import { currenciesAPI } from "../../../services/queries/management/currencies";
import moment from "moment";

export default function Creator({ handleClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(ratesAPI.addRate, {
    onSuccess: () => {
      queryClient.invalidateQueries("rates");
    },
  });

  const { data: gateways } = useQuery(["gateways"], () =>
    gatewaysAPI.getGateways()
  );

  const { data: rateTemplates } = useQuery(["rate-templates"], () =>
    ratesAPI.getRatesTemplates()
  );

  const { data: currencies } = useQuery(["currencies"], () =>
    currenciesAPI.getCurrencies()
  );

  const modifiedCurrenciesData = useMemo(() => {
    return currencies
      ? currencies.data.map((cur: any) => ({ ...cur, name: cur.code }))
      : [];
  }, [currencies]);

  return (
    <Formik
      initialValues={{
        name: "",
        gateway: null,
        currency: null,
        template: null,
        activation_date: moment(),
        hold_percent: "",
        hold_days: "",
        connection_fee: "",
        terminal_registration_fee: "",
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
            name="gateway"
            label="Gateway*"
            inputType="select"
            options={gateways?.data}
          />
          <Field
            name="currency"
            label="Currency*"
            inputType="select"
            options={modifiedCurrenciesData}
          />
          <Field
            name="template"
            label="Template*"
            inputType="select"
            options={rateTemplates?.data}
          />
          <Field
            name="activation_date"
            inputType="date-single"
            label="Activation date*"
          />
          <Field name="hold_percent" type="number" label="Hold percent*" />
          <Field name="hold_days" type="number" label="Hold days*" />
          <Field
            name="connection_fee"
            inputType="number"
            label="Connection fee*"
          />
          <Field
            name="terminal_registration_fee"
            inputType="number"
            label="Terminal registration fee*"
          />

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
