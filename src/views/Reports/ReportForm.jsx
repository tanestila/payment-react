import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import { groupsAPI } from "../../services/queries/management/users/groups";
import { partnersAPI } from "../../services/queries/management/users/partners";
import { merchantsAPI } from "../../services/queries/management/users/merchnats";
import { currenciesAPI } from "../../services/queries/management/currencies";
import { shopsAPI } from "../../services/queries/management/shops";
import { terminalsAPI } from "../../services/queries/management/terminals";
import { useQuery } from "react-query";
import { Col, Row } from "react-bootstrap";
import { Field } from "../../Components/Common/Formik/Field";
import { Button } from "antd";
import { ErrorModal } from "../../Components/Common";
import { parseError } from "../../helpers/parseError";
import { Card } from "antd";

export const ReportForm = ({
  handleSubmit,
  isSelectCurrency = true,
  isSelectDate = true,
  isExport = false,
}) => {
  const [selected_merchants, setMerchants] = useState(null);
  const [selected_groups, setGroups] = useState(null);
  const [selected_partners, setPartners] = useState(null);
  const [selected_shops, setShops] = useState(null);
  const [export_type, setExportType] = useState(null);

  const { data: partners, isLoading: isLoadingPartners } = useQuery(
    ["partners"],
    () => partnersAPI.getPartners()
  );

  const modifiedPartnersData = useMemo(() => {
    return partners
      ? partners.data.map((partner: any) => ({
          ...partner,
          name: partner.partner_name,
          guid: partner.partner_guid,
        }))
      : [];
  }, [partners]);

  const { data: groups, isLoading: isLoadingGroups } = useQuery(
    ["groups", selected_partners],
    () => groupsAPI.getGroups()
  );

  const modifiedGroupsData = useMemo(() => {
    return groups
      ? groups.data.map((group: any) => ({
          ...group,
          name: group.group_name,
          guid: group.group_guid,
        }))
      : [];
  }, [groups]);

  const { data: merchants, isLoading: isLoadingMerchants } = useQuery(
    ["merchants", selected_partners, selected_groups],
    () => merchantsAPI.getMerchants()
  );

  const modifiedMerchantsData = useMemo(() => {
    return merchants
      ? merchants.data.map((merchant: any) => ({
          ...merchant,
          name: merchant.merchant_name,
          guid: merchant.merchant_guid,
        }))
      : [];
  }, [merchants]);

  const { data: currencies, isLoading: isLoadingCurrencies } = useQuery(
    ["currencies"],
    () => currenciesAPI.getCurrencies()
  );

  const modifiedCurrenciesData = useMemo(() => {
    return currencies
      ? currencies.data.map((cur: any) => ({ ...cur, name: cur.code }))
      : [];
  }, [currencies]);

  const { data: shops, isLoading: isLoadingShops } = useQuery(
    ["shops", selected_partners, selected_groups, selected_merchants],
    () => shopsAPI.getShops()
  );

  const { data: terminals, isLoading: isLoadingTerminals } = useQuery(
    [
      "terminals",
      selected_partners,
      selected_groups,
      selected_merchants,
      selected_shops,
    ],
    () => terminalsAPI.getTerminals()
  );

  // const modifiedShopsData = useMemo(() => {
  //   return shops
  //     ? shops.data.map((cur: any) => ({ ...cur, name: cur.code }))
  //     : [];
  // }, [shops]);

  return (
    <Card>
      <Formik
        initialValues={{
          merchants: [],
          groups: [],
          partners: [],
          shops: [],
          terminals: [],
          currencies: [],
          dates: {
            startDate: moment().startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
            endDate: moment().endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
          },
        }}
        // validationSchema={Yup.object({

        // })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            let data = {
              merchant_guid_array: values.merchants.map((e) => e.guid),
              group_guid_array: values.groups.map((e) => e.guid),
              partner_guid_array: values.partners.map((e) => e.guid),
              shop_guid_array: values.shops.map((e) => e.guid),
              terminal_guid_array: values.terminals.map((e) => e.guid),
              currencies: values.currencies.map((e) => e.guid),
              from_date: moment(values.dates.startDate).format(
                "YYYY-MM-DDTHH:mm:ss"
              ),
              to_date: moment(values.dates.endDate).format(
                "YYYY-MM-DDTHH:mm:ss"
              ),
              exportType: export_type,
            };
            await handleSubmit(data);
          } catch (error) {
            ErrorModal(parseError(error));
            console.log(error);
          }
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting, setFieldValue, submitForm }) => (
          <Form className="modal-form">
            <Row>
              <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                <Field
                  name="partners"
                  inputType="multi-select"
                  label="Partners*"
                  options={modifiedPartnersData}
                  callback={(value) => {
                    setPartners(value);
                    setFieldValue("groups", []);
                    setFieldValue("merchants", []);
                    setFieldValue("shops", []);
                    setFieldValue("terminals", []);
                  }}
                  isLoading={isLoadingPartners}
                />
                <Field
                  name="groups"
                  inputType="multi-select"
                  label="Groups*"
                  options={modifiedGroupsData}
                  callback={(value) => {
                    setGroups(value);
                    setFieldValue("merchants", []);
                    setFieldValue("shops", []);
                    setFieldValue("terminals", []);
                  }}
                  isLoading={isLoadingGroups}
                />
                <Field
                  name="merchant"
                  inputType="multi-select"
                  label="Merchants*"
                  options={modifiedMerchantsData}
                  callback={(value) => {
                    setMerchants(value);
                    setFieldValue("shops", []);
                    setFieldValue("terminals", []);
                  }}
                  isLoading={isLoadingMerchants}
                />

                <Field
                  name="shops"
                  inputType="multi-select"
                  label="Shops*"
                  options={shops?.data}
                  callback={(value) => {
                    setShops(value);
                    setFieldValue("terminals", []);
                  }}
                  isLoading={isLoadingShops}
                />

                <Field
                  name="terminals"
                  inputType="multi-select"
                  label="Terminals*"
                  options={terminals?.data}
                  isLoading={isLoadingTerminals}
                />
              </Col>
              <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                {isSelectCurrency && (
                  <Field
                    name="currencies"
                    inputType="multi-select"
                    label="Currencies*"
                    options={modifiedCurrenciesData}
                    isLoading={isLoadingCurrencies}
                  />
                )}
                {isSelectDate && (
                  <Field
                    name="dates"
                    inputType="date-range"
                    label="Date range*"
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Button htmlType="submit" type="primary" className="f-right">
                  Calculate
                </Button>
              </Col>
              {isExport && <Col>download</Col>}
            </Row>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
