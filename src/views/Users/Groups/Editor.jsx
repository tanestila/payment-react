import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMemo } from "react";
import { currenciesAPI } from "../../../services/queries/management/currencies";
import { Button } from "antd";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import { ErrorModal, Loading, SuccessModal } from "../../../Components/Common";
import { partnersAPI } from "../../../services/queries/management/users/partners";

export default function Editor({ handleClose, guid }) {
  const queryClient = useQueryClient();
  const {
    data: group,
    status,
    isFetching,
    error,
  } = useQuery(["group", guid], () => groupsAPI.getGroup(guid));

  const merchantMutation = useMutation(groupsAPI.addGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("group");
    },
  });

  const { data: currencies } = useQuery(["currencies"], () =>
    currenciesAPI.getCurrencies()
  );
  const { data: partners } = useQuery(["partners"], () =>
    partnersAPI.getPartners()
  );

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
  const modifiedPartnersData = useMemo(() => {
    return partners
      ? partners.data.map((group) => ({
          ...group,
          name: group.group_name,
          guid: group.group_guid,
          label: group.group_name,
          value: group.group_guid,
        }))
      : [];
  }, [partners]);

  return (
    <>
      {status === "loading" || isFetching ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{
            name: group.merchant_name,
            type: group.merchant_type,
            monthly_fee: group.monthly_fee,
            monthly_fee_currency: modifiedCurrenciesData.filter(
              (cur) => group.monthly_fee_currency === cur.code
            )[0],
            monthly_fee_date: group.monthly_fee_date,
            monthly_amount_limit: group.monthly_amount_limit,
            custom_amount_limit: group.custom_amount_limit,
            custom_days_limit: group.custom_days_limit,
            partner: modifiedPartnersData.filter(
              (partner) => group.partner_guid === partner.partner_guid
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
                group_name: values.name,
                group_type: values.type,
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
                monthly_amount_limit: (
                  +values.monthly_amount_limit * 100
                ).toString(),
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
                    name="monthly_amount_limit"
                    type="number"
                    label="Monthly amount limit*"
                  />
                  <Field
                    name="partner"
                    inputType="select"
                    options={modifiedPartnersData}
                    label="Partner"
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
