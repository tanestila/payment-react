import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import { useMemo } from "react";
import { currenciesAPI } from "../../../services/queries/management/currencies";
import { Button } from "antd";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { ErrorModal, Loading, SuccessModal } from "../../../Components/Common";

export default function Editor({ handleClose, guid }) {
  const queryClient = useQueryClient();
  const {
    data: merchant,
    status,
    isFetching,
    error,
  } = useQuery(["merchant", guid], () => merchantsAPI.getMerchant(guid));

  const merchantMutation = useMutation(merchantsAPI.addMerchant, {
    onSuccess: () => {
      queryClient.invalidateQueries("merchants");
    },
  });

  const { data: currencies } = useQuery(["currencies"], () =>
    currenciesAPI.getCurrencies()
  );
  const { data: groups } = useQuery(["groups"], () => groupsAPI.getGroups());

  const modifiedCurrenciesData = useMemo(() => {
    return currencies
      ? currencies.data.map((cur) => ({
          ...cur,
          name: cur.code,
          label: cur.code,
          value: cur.guid,
        }))
      : [];
  }, [currencies]);
  const modifiedGroupsData = useMemo(() => {
    return groups
      ? groups.data.map((group) => ({
          ...group,
          name: group.group_name,
          guid: group.group_guid,
          label: group.group_name,
          value: group.group_guid,
        }))
      : [];
  }, [groups]);

  return (
    <>
      {status === "loading" || isFetching ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{
            name: merchant.merchant_name,
            type: merchant.merchant_type,
            monthly_fee: merchant.monthly_fee,
            monthly_fee_currency: modifiedCurrenciesData.filter(
              (cur) => merchant.monthly_fee_currency === cur.code
            )[0],
            monthly_fee_date: merchant.monthly_fee_date,
            monthly_amount_limit: merchant.monthly_amount_limit,
            custom_amount_limit: merchant.custom_amount_limit,
            custom_days_limit: merchant.custom_days_limit,
            group: modifiedGroupsData.filter(
              (group) => merchant.group_guid === group.group_guid
            )[0],
          }}
          validationSchema={Yup.object({
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
                guid,
                merchant_name: values.name,
                merchant_type: values.type,
                email: values.email,
                phone: values.phone,
                first_name: values.first_name,
                last_name: values.last_name,
                company_name: values.company_name,
                company_address: values.company_address,
                password: values.send_mail ? undefined : values.password,
                send_mail: values.send_mail ? 1 : 0,
                language: values.language,
                enabled: values.enabled === true ? 1 : 0,
                monthly_fee_currency: values.monthly_fee_currency?.["name"],
                monthly_fee: +values.monthly_fee * 100,
                monthly_fee_date: values.monthly_fee_date,
                monthly_amount_limit: (
                  +values.monthly_amount_limit * 100
                ).toString(),
                custom_amount_limit: (
                  +values.custom_amount_limit * 100
                ).toString(),
                custom_days_limit: values.custom_days_limit,
              };
              await merchantMutation.mutateAsync(data);
              SuccessModal("Merchant was updated");
              handleClose();
            } catch (error) {
              ErrorModal("Error");
              console.log(error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="modal-form">
              {error && error}
              <Row>
                <Col>
                  <Field name="name" type="text" label="Merchant name*" />
                  <Field name="type" type="text" label="Merchant type*" />

                  <Field
                    name="custom_days_limit"
                    type="number"
                    label="Merchant period limit* (days)"
                  />
                  <Field
                    name="custom_amount_limit"
                    type="number"
                    label="Merchant amount limit*"
                  />
                  <Field
                    name="monthly_amount_limit"
                    type="number"
                    label="Monthly amount limit*"
                  />

                  <Field name="monthly_fee" type="text" label="Monthly fee*" />
                  <Field
                    name="monthly_fee_currency"
                    inputType="select"
                    options={modifiedCurrenciesData}
                    label="Monthly fee currency*"
                  />
                  <Field
                    name="monthly_fee_date"
                    type="text"
                    label="Monthly fee date*"
                    inputType="date-single"
                    tip="From this date begins the payment of monthly fee."
                  />
                  <Field
                    name="group"
                    inputType="select"
                    options={modifiedGroupsData}
                    label="Group"
                  />
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
