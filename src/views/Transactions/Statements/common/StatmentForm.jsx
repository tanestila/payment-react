import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Field } from "../../../../Components/Common/Formik/Field";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "antd";
import {
  Loading,
  SuccessModal,
  ErrorModal,
} from "../../../../Components/Common";
import { parseError } from "../../../../helpers/parseError";
import { shopsAPI } from "../../../../services/queries/management/shops";
import { ratesAPI } from "../../../../services/queries/management/rates";
import { statementsAPI } from "../../../../services/queries/management/statements";
import { merchantsAPI } from "../../../../services/queries/management/users/merchnats";
import { terminalsAPI } from "../../../../services/queries/management/terminals";

export default function StatementForm({ shop_guid, handleClose }) {
  const queryClient = useQueryClient();
  const [selected_merchant, setMerchant] = useState(null);
  const [selected_shops, setShops] = useState(null);

  const mutation = useMutation(statementsAPI.createStatement, {
    onSuccess: () => {
      queryClient.invalidateQueries("shop-terminals");
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

  const { data: shops } = useQuery(["shops", selected_merchant], () =>
    shopsAPI.getShops({
      merchant_guid: selected_merchant
        ? selected_merchant.merchant_guid
        : undefined,
    })
  );

  const modifiedShopsData = useMemo(() => {
    return shops
      ? shops.data.map((shop) => ({
          ...shop,
          label: shop.name,
          value: shop.guid,
        }))
      : [];
  }, [shops]);

  const { data: terminals } = useQuery(["terminals", selected_shops], () =>
    terminalsAPI.getTerminals()
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
        merchant: null,
        shops: [],
        terminals: [],
        date: null,
        statement_currency: "",
        currency_rates: "",
        bank_wire_fee: "",
        name: "",
        additional_fees: null,
        reason: "",
        change_name: false,
        currencies_filter: null,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let data = {};
          await mutation.mutateAsync(data);
          SuccessModal("Terminal was created");
          handleClose();
        } catch (error) {
          ErrorModal(parseError(error));
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form className="modal-form">
          <Row>
            {console.log(values)}
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <Field name="name" type="text" label="Name*" />
              <Field
                name="merchant"
                inputType="select"
                label="Merchant*"
                options={modifiedMerchantsData}
                callback={(value) => {
                  setMerchant(value);
                  setFieldValue("shops", []);
                  setFieldValue("terminals", []);
                }}
              />
              <Field
                name="shops"
                inputType="multi-select"
                label="Shop*"
                options={modifiedShopsData}
                callback={(value) => {
                  setShops(value);
                  setFieldValue("terminals", []);
                }}
              />
              <Field
                name="select_all_shops"
                inputType="checkbox"
                label="Select all shops"
                callback={(value) => {
                  if (value) setFieldValue("shops", modifiedShopsData);
                  else setFieldValue("shops", []);
                }}
              />
              <Field
                name="terminals"
                inputType="select"
                label="Terminals*"
                options={modifiedTerminalsData}
              />
              <Field
                name="select_all_terminals"
                inputType="checkbox"
                label="Select all terminals"
                callback={(value) => {
                  if (value) setFieldValue("terminals", modifiedTerminalsData);
                  else setFieldValue("terminals", []);
                }}
              />
              <Field
                name="currencies_filter"
                inputType="select"
                label="Filter terminals by currencies*"
                options={terminals?.data}
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <Field name="date" inputType="date-range" label="Date range" />
              <Field
                name="change_name"
                inputType="checkbox"
                label="Change Name"
              />
              {values.change_name && (
                <Field name="name" type="text" label="Name*" />
              )}
              <Field
                name="statement_currency"
                type="text"
                label="Statement currency*"
              />
              <Field
                name="change_name"
                inputType="checkbox"
                label="Change Name"
              />
              currency rates
              <Field
                name="bank_wire_fee"
                type="number"
                label="Bank wire fee*"
              />
              additional fee
              <Field name="reason" type="text" label="Reason*" />
            </Col>
          </Row>
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
