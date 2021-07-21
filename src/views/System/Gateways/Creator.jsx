import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Button } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { gatewaysAPI } from "../../../services/queries/management/gateways";
import {
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../../Components/Common";
import { parseError } from "../../../helpers/parseError";

export const Creator = ({ handleClose }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(gatewaysAPI.addGateway, {
    onSuccess: () => {
      queryClient.invalidateQueries("gateways");
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(1).max(100).trim().required("Required"),
        description: Yup.string().trim().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            name: values.name,
            description: values.description,
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
