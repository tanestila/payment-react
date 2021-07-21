import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../Components/Common/Formik/Field";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMemo } from "react";
import { Button } from "antd";
import {
  Loading,
  SuccessModal,
  ErrorModal,
  FormLoading,
} from "../../Components/Common";
import { shopsAPI } from "../../services/queries/management/shops";
import { merchantsAPI } from "../../services/queries/management/users/merchnats";
import { parseError } from "../../helpers/parseError";

export default function Creator({ handleClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(shopsAPI.addShop, {
    onSuccess: () => {
      queryClient.invalidateQueries("shops");
    },
  });

  const { data: merchants } = useQuery(["merchants"], () =>
    merchantsAPI.getMerchants()
  );

  const modifiedMerchantsData = useMemo(() => {
    return merchants
      ? merchants.data.map((mer) => ({
          ...mer,
          name: mer.merchant_name,
          guid: mer.merchant_guid,
        }))
      : [];
  }, [merchants]);

  const risks = [
    { guid: 1, name: "Low" },
    { guid: 2, name: "Medium" },
    { guid: 3, name: "High" },
  ];

  return (
    <Formik
      initialValues={{
        name: "",
        risk: "",
        merchant: null,
        display_name: "",
        email: "",
        url: [],
        phone: "",
        note: "",
        enabled: true,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        risk: Yup.object().typeError("Required").required("Required"),
        merchant: Yup.object().typeError("Required").required("Required"),
        display_name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        url: Yup.array()
          .of(
            Yup.string()
              .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                "Enter correct url!"
              )
              .required("Please enter website")
          )
          .min(1)
          .required("Required"),
        phone: Yup.string().min(5).required("Required"),
        note: Yup.string(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {
            name: values.name,
            risk_category: values.risk?.["name"],
            merchant_guid: values.merchant?.["merchant_guid"],
            display_name: values.display_name,
            email: values.email,
            url: values.url,
            phone: values.phone,
            note: values.note,
            enabled: values.enabled ? 1 : 0,
          };
          await mutation.mutateAsync(data);
          SuccessModal("Shop was created");
          handleClose();
        } catch (error) {
          ErrorModal(parseError(error));
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="modal-form">
          <Field name="name" type="text" label="Name*" />
          <Field name="display_name" type="text" label="Display name*" />
          <Field name="risk" inputType="select" label="Risk*" options={risks} />
          <Field name="enabled" inputType="checkbox" label="Enabled" />
          <Field
            name="merchant"
            inputType="select"
            label="merchant*"
            options={modifiedMerchantsData}
          />
          <Field name="url" inputType="array" label="URL*" />
          <Field name="email" type="text" label="Email*" />
          <Field name="phone" inputType="phone" label=" Phone*" />
          <Field name="note" type="text" label="Note" />

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
