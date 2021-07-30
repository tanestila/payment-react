import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { Field } from "../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Button, Card, Divider } from "antd";
import { SuccessModal, ErrorModal, FormLoading } from "../../Components/Common";
import { adminsAPI } from "../../services/queries/management/users/admins";
import { parseError } from "../../helpers/parseError";
import { useState, useMemo, useEffect } from "react";
import { shopsAPI } from "../../services/queries/management/shops";

import { terminalsAPI } from "../../services/queries/management/terminals";
import { gatewaysAPI } from "../../services/queries/management/gateways";
import { useHistory, useLocation } from "react-router-dom";

export default function TransactionForm({ handleClose }) {
  const [isNeedTransactionId, setIsNeedTransactionId] = useState(false);
  const [isNeedReason, setIsNeedReason] = useState(false);
  const [selected_shop, setShop] = useState(null);
  const [selected_terminal, setTerminal] = useState(null);
  const queryClient = useQueryClient();
  let { search } = useLocation();
  let history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.status === "succeed") SuccessModal("Transaction success");
    else if (params.status === "failed") ErrorModal("Transaction failed");
    history.push();
  }, []);

  const mutation = useMutation(adminsAPI.addAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries("admins");
    },
  });

  const {
    data: shops,
    isLoading: shopsIsLoading,
    isFetching: shopsIsFetching,
  } = useQuery(["shops"], () => shopsAPI.getShops());

  const modifiedShopsData = useMemo(() => {
    return shops
      ? shops.data.map((shop) => ({
          ...shop,
          label: shop.name,
          value: shop.guid,
        }))
      : [];
  }, [shops]);

  const {
    data: terminals,
    isLoading: terminalsIsLoading,
    isFetching: terminalsIsFetching,
  } = useQuery(["terminals", selected_shop], () =>
    terminalsAPI.getTerminals({
      shop_guid: selected_shop ? selected_shop.guid : undefined,
    })
  );

  const modifiedTerminalsData = useMemo(() => {
    return terminals
      ? terminals.data.map((terminal) => ({
          ...terminal,
          label: terminal.name,
          value: terminal.guid,
        }))
      : [];
  }, [terminals]);

  const {
    data: types,
    isLoading: typesIsLoading,
    isFetching: typesIsFetching,
  } = useQuery(["transaction-types", selected_terminal], () =>
    gatewaysAPI.getGatewayTransactionTypes(
      selected_terminal ? selected_terminal.gateway_guid : undefined
    )
  );

  const onSelectType = (option) => {
    if (["Refund", "Capture", "Cancel", "Reverse"].includes(option.name))
      setIsNeedTransactionId(true);
    else setIsNeedTransactionId(false);
    if (["Refund", "Cancel", "Reverse"].includes(option.name))
      setIsNeedReason(true);
    else setIsNeedReason(false);
  };

  return (
    <Formik
      initialValues={{
        //test data
        first_name: "John",
        last_name: "Doe",
        country: "US",
        city: "New York",
        address: "Groove st.",
        zip: "646464",
        email: "mail@mail.com",
        ip: "200.200.200.200",
        description: "test data",
        // transaction data
        shop: "",
        terminal: "",
        secret: "",
        hash_key: "",
        type: "",
        transaction_id: "",
        amount: "",
        currency: "",
        tracking_id: "",
        reason: "",
        //card data
        card_number: "",
        name_on_card: "",
        exp_month: "",
        exp_year: "",
        verification_value: "",
        //
        isChangeTestData: false,
        isNeedCardData: false,
      }}
      validationSchema={Yup.object({})}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {};
          switch (values.type.name) {
            case "Payment":
            case "Authorization":
              data = {
                tracking_id: values.tracking_id,
                amount: Math.round(+values.amount * 100),
                currency: values.terminal.currency_code,
                description: values.description,
                type: values.type,
                billing_address: {
                  first_name: values.first_name,
                  last_name: values.last_name,
                  country: values.country,
                  city: values.city,
                  address: values.address,
                  zip: values.zip,
                },
                customer: {
                  email: values.email,
                  ip: values.ip,
                },
              };
              break;
            case "Cancel":
            case "Refund":
            case "Reverse":
              data = {
                tracking_id: values.tracking_id,
                amount: Math.round(+values.amount * 100),
                type: values.type,
                transactionId: values.transactionId,
                reason: isNeedReason ? values.reason : undefined,
              };
              break;
            case "Capture":
              data = {
                tracking_id: values.tracking_id,
                amount: Math.round(+values.amount * 100),
                type: values.type,
                transactionId: values.transactionId,
              };
              break;
            default:
              break;
          }

          const credit_card = {
            number: values.card_number,
            verification_value: values.verification_value,
            holder: values.name_on_card,
            exp_month: values.exp_month,
            exp_year: values.exp_year,
          };
          if (values.isNeedCardData) data.credit_card = credit_card;
          else {
            data.succeed_url = `${window.location}?status=succeed`;
            data.failed_url = `${window.location}?status=failed`;
          }

          await mutation.mutateAsync(data);
          SuccessModal("Transaction send");
          handleClose();
        } catch (error) {
          ErrorModal(parseError(error));
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form>
          <Card>
            <Row>
              <Col>
                {!isNeedTransactionId && (
                  <>
                    <Row>
                      <Field
                        name="isChangeTestData"
                        inputType="checkbox-inverse"
                        label="Change test data"
                      />
                    </Row>
                    {values.isChangeTestData && (
                      <>
                        <Field
                          name="first_name"
                          type="text"
                          label="First Name*"
                        />
                        <Field
                          name="last_name"
                          type="text"
                          label="Last Name*"
                        />
                        <Field name="country" type="text" label="Country*" />
                        <Field name="city" type="text" label="City*" />
                        <Field name="address" type="text" label="Address*" />
                        <Field name="zip" type="text" label="Zip*" />
                        <Field name="email" type="text" label="Email*" />
                        <Field name="ip" type="text" label="IP*" />
                      </>
                    )}
                  </>
                )}
              </Col>
              <Col>
                {!isNeedTransactionId && (
                  <>
                    <Row>
                      <Field
                        name="isNeedCardData"
                        inputType="checkbox-inverse"
                        label="Enter card data"
                      />
                    </Row>
                    {values.isNeedCardData && (
                      <>
                        <Field
                          name="card_number"
                          type="text"
                          label="card_number*"
                        />
                        <Field
                          name="name_on_card"
                          type="text"
                          label="name on card*"
                        />
                        <Field
                          name="exp_month"
                          type="text"
                          label="exp_month*"
                        />
                        <Field name="exp_year" type="text" label="exp_year*" />
                        <Field
                          name="verification_value"
                          type="text"
                          label="verification_value*"
                        />
                      </>
                    )}
                  </>
                )}
              </Col>
            </Row>
            <Divider />
            <Field
              name="shop"
              label="Shops*"
              inputType="select"
              options={modifiedShopsData}
              isLoading={shopsIsLoading || shopsIsFetching}
              callback={(value) => {
                setShop(value);
                setFieldValue("terminal", null);
                setFieldValue("type", null);
              }}
            />
            <Field
              name="terminal"
              label="terminal*"
              isLoading={terminalsIsLoading || terminalsIsFetching}
              inputType="select"
              options={modifiedTerminalsData}
              callback={(value) => {
                setTerminal(value);
                setFieldValue("type", null);
                setFieldValue("secret", value.secret);
                setFieldValue("hash_key", value.hash_key);
              }}
            />
            <Field
              name="type"
              inputType="select"
              isLoading={typesIsLoading || typesIsFetching}
              label="type*"
              options={types}
              callback={(value) => {
                onSelectType(value);
              }}
            />
            <Field name="amount" inputType="number" label="amount*" />
            {values.terminal && values.terminal.currency_code
              ? values.terminal.currency_code
              : null}
            <Field name="tracking_id" type="text" label="Transaction id" />
            {isNeedReason && <Field name="reason" type="text" label="reason" />}

            <ErrorMessage name="secret" />
            <ErrorMessage name="hash_key" />
            <Divider />

            {isSubmitting ? (
              <FormLoading />
            ) : (
              <Button htmlType="submit" type="primary" className="f-right">
                Submit
              </Button>
            )}
          </Card>
        </Form>
      )}
    </Formik>
  );
}
