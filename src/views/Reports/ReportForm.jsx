import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Card, Col, Form, Row } from "react-bootstrap";
import Can from "../../Can";
import CustomButton from "components/UI/Button";
import DateRangePicker from "react-bootstrap-daterangepicker";
import CustomSelect from "components/UI/MultiSelect";
import { getAllMerchants } from "actions/merchants";
import { getAllPartners } from "actions/partners";
import { getAllGroups } from "actions/groups";
import { getTerminalsAction } from "actions/terminals";
import { getAllCurrencies } from "actions/currencies";
import { getAllShops } from "actions/shops";
import { useDispatch } from "react-redux";

function ReportForm({
  handleSubmit,
  errors,
  isSelectCurrency = true,
  button,
  onButtonClick,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [merchants, setMerchants] = useState([]);
  const [groups, setGroups] = useState([]);
  const [partners, setPartners] = useState([]);
  const [shops, setShops] = useState([]);
  const [terminals, setTerminals] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [selectedMerchants, setSelectedMerchants] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const [selectedTerminals, setSelectedTerminals] = useState([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [dates, setDates] = useState({
    fromDate: moment()
      .format("YYYY-MM-DDTHH:mm:ss")
      .replace(/\D\d{2}\w/, "-01T"),
    toDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
  });
  const { merchantsList } = useSelector((state) => state.merchants);
  const { partnersList } = useSelector((state) => state.partners);
  const { groupsList } = useSelector((state) => state.groups);
  const { shopsList } = useSelector((state) => state.shops);
  const { currenciesList } = useSelector((state) => state.currencies);
  const { terminals: terminalsList } = useSelector((state) => state.terminals);

  useEffect(() => {
    dispatch(getAllMerchants());
    dispatch(getAllShops());
    dispatch(getAllPartners());
    dispatch(getAllGroups());
    dispatch(getTerminalsAction());
    dispatch(getAllCurrencies());
  }, []);

  useEffect(() => {
    setMerchants(
      merchantsList.map((m) => ({
        ...m,
        name: m.merchant_name,
        guid: m.merchant_guid,
      }))
    );
  }, [merchantsList]);

  useEffect(() => {
    setGroups(
      groupsList.map((m) => ({
        ...m,
        name: m.group_name,
        guid: m.group_guid,
      }))
    );
  }, [groupsList]);

  useEffect(() => {
    setPartners(
      partnersList.map((m) => ({
        ...m,
        name: m.partner_name,
        guid: m.partner_guid,
      }))
    );
  }, [partnersList]);

  useEffect(() => {
    setShops(shopsList);
  }, [shopsList]);

  useEffect(() => {
    setTerminals(terminalsList);
  }, [terminalsList]);

  useEffect(() => {
    setCurrencies(
      currenciesList.map((m) => ({
        ...m,
        name: m.code,
      }))
    );
  }, [currenciesList]);

  const handleSelectPartners = (options) => {
    setSelectedPartners(options);
    dispatch(
      getAllGroups({
        partner_guid_array: options.map((p) => p.partner_guid),
      })
    );
    dispatch(
      getAllMerchants({
        partner_guid_array: options.map((p) => p.partner_guid),
      })
    );
    dispatch(
      getAllShops({
        partner_guid_array: options.map((p) => p.partner_guid),
      })
    );
    dispatch(
      getTerminalsAction({
        partner_guid_array: options.map((p) => p.partner_guid),
      })
    );
    setSelectedGroups([]);
    setSelectedMerchants([]);
    setSelectedShops([]);
    setSelectedTerminals([]);
  };

  const handleSelectGroups = (options) => {
    setSelectedGroups(options);
    dispatch(
      getAllMerchants({
        group_guid_array: options.map((p) => p.group_guid),
      })
    );
    dispatch(
      getAllShops({
        group_guid_array: options.map((p) => p.group_guid),
      })
    );
    dispatch(
      getTerminalsAction({
        group_guid_array: options.map((p) => p.group_guid),
      })
    );
    setSelectedMerchants([]);
    setSelectedShops([]);
    setSelectedTerminals([]);
  };

  const handleSelectMerchants = (options) => {
    setSelectedMerchants(options);
    dispatch(
      getAllShops({
        merchant_guid_array: options.map((p) => p.merchant_guid),
      })
    );
    dispatch(
      getTerminalsAction({
        merchant_guid_array: options.map((p) => p.merchant_guid),
      })
    );
    setSelectedShops([]);
    setSelectedTerminals([]);
  };

  const handleSelectShops = (options) => {
    setSelectedShops(options);
    dispatch(
      getTerminalsAction({
        shop_guid_array: options.map((p) => p.guid),
      })
    );
    setSelectedTerminals([]);
  };

  const handleSelectTerminals = (options) => {
    setSelectedTerminals(options);
  };

  const onDateChange = (start, end) => {
    setDates({
      toDate: moment(end).format("YYYY-MM-DDTHH:mm:ss"),
      fromDate: moment(start).format("YYYY-MM-DDTHH:mm:ss"),
    });
  };

  const handleSelectCurrencies = (options) => {
    setSelectedCurrencies(options);
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit({
      merchant_guid_array: selectedMerchants.map((p) => p.merchant_guid),
      group_guid_array: selectedGroups.map((p) => p.group_guid),
      partner_guid_array: selectedPartners.map((p) => p.partner_guid),
      terminal_guid_array: selectedTerminals.map((p) => p.guid),
      shop_guid_array: selectedShops.map((p) => p.guid),
      from_date: dates.fromDate,
      to_date: dates.toDate,
      currency_code: selectedCurrencies.map((p) => p.guid),
    });
  };

  const handleCustomButtonClick = () => {
    onButtonClick({
      merchant_guid_array: selectedMerchants.map((p) => p.merchant_guid),
      group_guid_array: selectedGroups.map((p) => p.group_guid),
      partner_guid_array: selectedPartners.map((p) => p.partner_guid),
      terminal_guid_array: selectedTerminals.map((p) => p.guid),
      shop_guid_array: selectedShops.map((p) => p.guid),
      from_date: dates.fromDate,
      to_date: dates.toDate,
      currency_code: selectedCurrencies.map((p) => p.guid),
    });
  };

  const Select = ({
    label,
    name,
    multi = true,
    options = [],
    value = [],
    onSelect,
  }) => {
    return (
      <>
        <Col md={3} sm={4} xs={4} className="form-label">
          <Form.Label>{label}</Form.Label>
        </Col>
        <Col md={8} sm={7} xs={7}>
          <Form.Group>
            <CustomSelect
              multi={multi}
              name={name}
              options={options}
              value={value}
              onSelect={onSelect}
              placeholder={`Search all`}
            />
          </Form.Group>
        </Col>
      </>
    );
  };

  return (
    <>
      <Card>
        <Card.Body style={{ overflow: "visible" }}>
          {loading ? (
            <p>loading</p>
          ) : (
            <>
              <Row>
                <Col md={6} sm={6} xs={6}>
                  <Row>
                    <Can do="READ" on="USERPARTNER">
                      <Select
                        label="Partners"
                        name="partners"
                        multi={true}
                        options={partners}
                        value={selectedPartners}
                        onSelect={handleSelectPartners}
                      />
                    </Can>
                  </Row>
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <Row>
                    <Can do="READ" on="USERGROUP">
                      <Select
                        label="Groups"
                        name="groups"
                        multi={true}
                        options={groups}
                        value={selectedGroups}
                        onSelect={handleSelectGroups}
                      />
                    </Can>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col md={6} sm={6} xs={6}>
                  <Row>
                    <Can do="READ" on="USERMERCHANT">
                      <Select
                        label="Merchant"
                        name="merchant"
                        multi={true}
                        options={merchants}
                        value={selectedMerchants}
                        onSelect={handleSelectMerchants}
                      />
                    </Can>
                  </Row>
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <Row>
                    <Select
                      label="Shops"
                      name="shops"
                      multi={true}
                      options={shops}
                      value={selectedShops}
                      onSelect={handleSelectShops}
                    />
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col md={6} sm={6} xs={6}>
                  <Row>
                    <Select
                      label="Terminal"
                      name="terminal"
                      multi={true}
                      options={terminals}
                      value={selectedTerminals}
                      onSelect={handleSelectTerminals}
                      placeholder="All terminals selected"
                    />
                  </Row>
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <Row>
                    <Col md={3} sm={4} xs={4} className="form-label">
                      <Form.Label>Date range</Form.Label>
                    </Col>
                    <Col md={8} sm={7} xs={7}>
                      <Form.Group>
                        <DateRangePicker
                          onCallback={onDateChange}
                          initialSettings={{
                            startDate: dates.fromDate
                              ? moment(dates.fromDate).format("DD.MM.YYYY")
                              : undefined,
                            endDate: dates.toDate
                              ? moment(dates.toDate).format("DD.MM.YYYY")
                              : undefined,
                            locale: {
                              format: "DD.MM.YYYY",
                            },
                          }}
                        >
                          <input
                            type="text"
                            className="text-input daterange-input form-control"
                          />
                        </DateRangePicker>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {isSelectCurrency && (
                <Row>
                  <Col md={6} sm={6} xs={6}>
                    <Row>
                      <Select
                        label="Currency"
                        name="currencies"
                        multi={true}
                        options={currencies}
                        value={selectedCurrencies}
                        onSelect={handleSelectCurrencies}
                        placeholder="All currencies selected"
                      />
                    </Row>
                  </Col>
                </Row>
              )}
            </>
          )}
          <Row>
            <Col md={2} sm={2} xs={2}>
              <CustomButton className="btn" onClick={handleClick}>
                Find
              </CustomButton>
            </Col>
            <Col md={8} sm={8} xs={8}></Col>
            {button && (
              <Col md={2} sm={2} xs={2}>
                <CustomButton
                  className="btn"
                  onClick={() => handleCustomButtonClick()}
                >
                  {button}
                </CustomButton>
              </Col>
            )}
          </Row>
          {errors && errors}
        </Card.Body>
      </Card>
    </>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     merchants: state.merchants.merchantsList,
//     groups: state.groups.groupsList,
//     partners: state.partners.partnersList,
//     shops: state.shops.shopsList,
//     terminals: state.shops.shopTerminals,
//   };
// };

export default ReportForm;
// connect(mapStateToProps, {
//   getAllMerchants,
//   getAllShops,
//   getAllPartners,
//   getAllGroups,
// })(ReportForm);
