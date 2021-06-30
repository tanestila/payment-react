import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { partnersAPI } from "../../services/queries/management/users/partners";
import { ErrorModal, Loading, SuccessModal } from "../../Components/Common";
import { Button } from "antd";
import { shopsAPI } from "../../services/queries/management/shops";
import { accountsAPI } from "../../services/queries/management/accounts";

export default function Creator({ handleClose, guid }) {
  const queryClient = useQueryClient();
  const mutation = useMutation(accountsAPI.addAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries("accounts");
    },
  });

  const { data: shops } = useQuery(["shops"], () =>
    shopsAPI.getShops({ merchant_guid: guid })
  );

  return (
    <Formik
      initialValues={{
        number: "",
        shop: null,
        holder_name: "",
        holder_country: "",
        bank_name: "",
        bank_address: "",
      }}
      validationSchema={Yup.object({
        number: Yup.string().required("Required"),
        holder_name: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        holder_country: Yup.string().required("Required"),
        bank_name: Yup.string().required("Required"),
        bank_address: Yup.string().required("Required"),
        shop: Yup.object().typeError("Required").required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            number: values.number,
            holder_name: values.holder_name,
            holder_country: values.holder_country,
            bank_name: values.bank_name,
            bank_address: values.bank_address,
            shop_guid: values.shop,
          };
          await mutation.mutateAsync({ body: data, guid });
          SuccessModal("Account was created");
          handleClose();
        } catch (error) {
          ErrorModal("Error");
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Field name="number" type="text" label="Number*" />
          <Field name="holder_name" type="text" label="Holder name*" />
          <Field name="holder_country" type="text" label="Holder country*" />
          <Field name="bank_name" inputType="phone" label="Bank name*" />
          <Field name="bank_address" type="text" label="Bank address*" />
          <Field
            name="shop"
            label="Shop*"
            inputType="select"
            options={shops?.data}
          />
          <Field name="name" type="text" label="Partner name" />
          <Field name="type" type="text" label="Partner type" />

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
  );
}
