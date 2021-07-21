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

export default function Creator({ handleClose, guid }) {
  const queryClient = useQueryClient();

  const {
    data: rate,
    status,
    isFetching,
  } = useQuery(["rate"], () => ratesAPI.getRate(guid));

  const mutation = useMutation(ratesAPI.addRate, {
    onSuccess: () => {
      queryClient.invalidateQueries("rates");
    },
  });

  const { data: gateways } = useQuery(["gateways"], () =>
    gatewaysAPI.getGateways()
  );

  const modifiedGatewaysData = useMemo(() => {
    return gateways
      ? gateways.data.map((gateway) => ({
          ...gateway,
          label: gateway.name,
          value: gateway.guid,
        }))
      : [];
  }, [gateways]);

  if (status === "loading" || isFetching) return <FormLoading />;
  return (
    <Formik
      initialValues={{
        name: rate.name,
        gateway: modifiedGatewaysData.filter(
          (gateway) => gateway.guid === rate.gateway_guid
        )[0],
        reason: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        gateway: Yup.object().typeError("Required").required("Required"),
        reason: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            guid,
            name: values.name,
            gateway_guid: values.gateway.guid,
            reason: values.reason,
          };
          await mutation.mutateAsync(data);
          SuccessModal("Rate was updated");
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
            options={modifiedGatewaysData}
          />
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
