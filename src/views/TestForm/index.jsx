import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../Components/Common/Formik/Field";
import { Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Button } from "antd";
import { SuccessModal, ErrorModal, FormLoading } from "../../Components/Common";
import { adminsAPI } from "../../services/queries/management/users/admins";
import { parseError } from "../../helpers/parseError";
import { useState, useMemo } from "react";
import { shopsAPI } from "../../services/queries/management/shops";

import { terminalsAPI } from "../../services/queries/management/terminals";
export default function TransactionForm({ handleClose }) {
  const [isNeedTransactionId, setIsNeedTransactionId] = useState(false);
  const [selected_shop, setShop] = useState(null);

  const queryClient = useQueryClient();

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
      shop_guid_array: selected_shop
        ? selected_shop.map((shop) => shop.guid)
        : undefined,
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
          await mutation.mutateAsync(data);
          SuccessModal("Group was created");
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
          {isNeedTransactionId && (
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
                  <Field name="first_name" type="text" label="First Name*" />
                  <Field name="last_name" type="text" label="Last Name*" />
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
          <Field
            name="shop"
            label="Shops*"
            inputType="select"
            options={modifiedShopsData}
          />
          <Field
            name="terminal"
            label="terminal*"
            inputType="select"
            options={modifiedTerminalsData}
          />
          <Field name="type" type="text" label="type*" />
          <Field name="amount" type="text" label="amount*" />
          Currency
          <Field name="tracking_id" type="text" label="Transaction id" />
          <Field name="reason" type="text" label="reason" />
          {/* <Field
            name="tracking_id"
            label="Transaction id*"
            inputType="select"
            options={roles?.data}
          /> */}
          {isNeedTransactionId && (
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
                  <Field name="card_number" type="text" label="card_number*" />
                  <Field
                    name="name_on_card"
                    type="text"
                    label="name on card*"
                  />
                  <Field name="exp_month" type="text" label="exp_month*" />
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
