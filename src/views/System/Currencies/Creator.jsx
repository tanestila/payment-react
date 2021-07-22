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
import { adminsAPI } from "../../../services/queries/management/users/admins";
import { parseError } from "../../../helpers/parseError";
import { currenciesAPI } from "../../../services/queries/management/currencies";

export default function Creator({ handleClose }) {
  const queryClient = useQueryClient();
  const mutation = useMutation(currenciesAPI.addCurrency, {
    onSuccess: () => {
      queryClient.invalidateQueries("currencies");
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        code: "",
        number: "",
        rate_to_eur: "",
        exchange_markup_value: "",
        isFlat: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(1).max(100).trim().required("Required"),
        code: Yup.string()
          .matches(/^[A-Z]{3}$/, "Must contain three uppercase characters")
          .required("Required"),
        number: Yup.string()
          .matches(/^[0-9]{3}$/, "Must contain three digits")
          .required("Required"),
        rate_to_eur: Yup.number().required("Required"),
        exchange_markup_value: Yup.number()
          .typeError("you must specify a number")
          .min(0)
          .max(100)
          .required("Required"),
        isFlat: Yup.boolean().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            name: values.name,
            code: values.code,
            number: values.number,
            rate_to_eur: values.rate_to_eur,
            exchange_markup_value: values.exchange_markup_value,
            isFlat: values.isFlat,
          };
          await mutation.mutateAsync(data);
          SuccessModal("Currency was created");
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
          <Field name="name" type="text" label="name" />
          <Field name="code" type="text" label="code" />
          <Field name="number" type="text" label="number" />
          <Field name="rate_to_eur" type="text" label="Rate to eur" />
          <Field
            name="exchange_markup_value"
            type="number"
            label="exchange_markup_value"
          />
          <Field name="isFlat" type="checkbox" label="isFlat" />
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
