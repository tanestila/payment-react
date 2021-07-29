import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { merchantsAPI } from "../../../services/queries/management/users/merchnats";
import { useMemo } from "react";
import { currenciesAPI } from "../../../services/queries/management/currencies";
import { Alert, Button } from "antd";
import { groupsAPI } from "../../../services/queries/management/users/groups";
import {
  ErrorModal,
  FormLoading,
  SuccessModal,
} from "../../../Components/Common";
import { parseError } from "../../../helpers/parseError";
import {
  roundMultiplyNumber,
  roundDivisionNumber,
} from "../../../helpers/formatNumber";
import { CurrencyForSelectType, CurrencyType } from "../../../types/currencies";
import { GroupForSelectType, GroupType } from "../../../types/groups";

export default function Editor({
  handleClose,
  guid,
}: {
  handleClose: () => {};
  guid: string;
}) {
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
      ? currencies.data.map((cur: CurrencyType) => ({
          ...cur,
          name: cur.code,
          label: cur.code,
          value: cur.guid,
        }))
      : [];
  }, [currencies]);
  const modifiedGroupsData = useMemo(() => {
    return groups
      ? groups.data.map((group: GroupType) => ({
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
        <FormLoading />
      ) : (
        <Formik
          initialValues={{
            name: merchant.merchant_name,
            type: merchant.merchant_type,
            monthly_fee: roundDivisionNumber(merchant.monthly_fee),
            monthly_fee_currency: modifiedCurrenciesData.filter(
              (cur: CurrencyForSelectType) =>
                merchant.monthly_fee_currency === cur.code
            )[0],
            monthly_fee_date: merchant.monthly_fee_date,
            monthly_amount_limit: merchant.monthly_amount_limit,
            custom_amount_limit: merchant.custom_amount_limit,
            custom_days_limit: merchant.custom_days_limit,
            group: modifiedGroupsData.filter(
              (group: GroupForSelectType) =>
                merchant.group_guid === group.group_guid
            )[0],
            reason: "",
          }}
          validationSchema={Yup.object({
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
            custom_amount_limit: Yup.string()
              .typeError("You must specify a number")
              .max(15)
              .required("Required"),
            custom_days_limit: Yup.number()
              .typeError("You must specify a number")
              .max(1000)
              .required("Required"),
            reason: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              let data = {
                merchant_guid: guid,
                merchant_name: values.name,
                merchant_type: values.type,
                monthly_fee_currency: values.monthly_fee_currency?.["name"],
                monthly_fee: roundMultiplyNumber(values.monthly_fee),
                monthly_fee_date: values.monthly_fee_date,
                monthly_amount_limit: roundMultiplyNumber(
                  values.monthly_amount_limit
                ).toString(),
                custom_amount_limit: roundMultiplyNumber(
                  values.custom_amount_limit
                ).toString(),
                custom_days_limit: values.custom_days_limit,
                group_guid: values.group?.["group_guid"],
                reason: values.reason,
              };
              await merchantMutation.mutateAsync(data);
              SuccessModal("Merchant was updated");
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
              {status === "error" && (
                <Alert
                  message="Error"
                  description={parseError(error)}
                  type="error"
                  showIcon
                />
              )}
              <Row>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Field name="name" type="text" label="Merchant name*" />
                  <Field name="type" type="text" label="Merchant type*" />
                  <Field
                    name="group"
                    inputType="select"
                    options={modifiedGroupsData}
                    label="Group"
                  />
                  <Field
                    name="custom_days_limit"
                    type="number"
                    label="Merchant period limit* (days)"
                  />
                  <Field
                    name="custom_amount_limit"
                    inputType="number"
                    label="Merchant amount limit*"
                  />
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Field
                    name="monthly_amount_limit"
                    inputType="number"
                    label="Monthly amount limit*"
                  />

                  <Field
                    name="monthly_fee"
                    inputType="number"
                    label="Monthly fee*"
                  />
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

                  <Field name="reason" type="text" label="Reason*" />
                </Col>
              </Row>
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
      )}
    </>
  );
}
