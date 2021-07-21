import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Button } from "antd";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { gatewaysAPI } from "../../../services/queries/management/gateways";
import {
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../../Components/Common";
import { parseError } from "../../../helpers/parseError";

export const Editor = ({ handleClose, guid }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(gatewaysAPI.addGateway, {
    onSuccess: () => {
      queryClient.invalidateQueries("gateways");
    },
  });

  const {
    data: gateway,
    status,
    isFetching,
    error,
  } = useQuery(["gateway", guid], () => gatewaysAPI.getGateway(guid));

  if (status === "loading" || isFetching) return <FormLoading />;
  return (
    <Formik
      initialValues={{
        name: gateway.name,
        description: gateway.description,
        reason: gateway.reason,
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(1).max(100).trim().required("Required"),
        description: Yup.string().trim().required("Required"),
        reason: Yup.string().trim().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            guid,
            name: values.name,
            description: values.description,
            reason: values.reason,
          };
          await mutation.mutateAsync(data);
          SuccessModal("Gateway was created");
          handleClose();
        } catch (error) {
          ErrorModal(parseError(error));
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="name" type="text" label="Name" />
          <Field name="description" type="text" label="Description" />
          <Field name="reason" type="text" label="Reason" />
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
};
