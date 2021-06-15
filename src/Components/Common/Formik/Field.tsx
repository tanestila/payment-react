import { useField } from "formik";
import { ReactNode, useCallback } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { HelpTip } from "../HelpTip";
import { CustomSelect } from "../Inputs/CustomSelect";
import { CustomPhoneInput } from "../Inputs/CustomPhoneInput";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";

type CustomInputProps = {
  label: string;
  name: string;
  options?: Array<any>;
  inputType?:
    | "select"
    | "date-single"
    | "date-range"
    | "input"
    | "phone"
    | "checkbox";
  children?: ReactNode;
  id?: string;
  type?: string;
  tip?: string;
};

const customStyles = {
  control: (base: any) => ({
    ...base,

    "min-height": "39px",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: 4,
  }),
  clearIndicator: (base: any) => ({
    ...base,
    padding: 4,
  }),
  multiValue: (base: any) => ({
    ...base,
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0px 6px",
  }),
  input: (base: any) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
};

export const Field: React.FC<CustomInputProps> = ({
  label,
  tip,
  options = [],
  inputType,
  children,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name);

  const onChangeCallback = useCallback(
    (value) => {
      helpers.setTouched(true);
      helpers.setValue(value);
    },
    [helpers]
  );

  // const onSingleDateChange = useCallback((date) => {
  //   helpers.setValue(date);
  // }, []);

  const renderInput = () => {
    switch (inputType) {
      case "select":
        return (
          <CustomSelect
            {...props}
            styles={customStyles}
            options={options}
            onChange={onChangeCallback}
            defaultValue={field.value}
          />
        );
      case "date-single":
        return (
          <DateRangePicker
            onCallback={onChangeCallback}
            initialSettings={{
              singleDatePicker: true,
              locale: {
                format: "DD.MM.YYYY",
              },
              startDate: field.value
                ? moment(field.value).format("DD.MM.YYYY")
                : undefined,
            }}
          >
            <input type="text" className="form-control" />
          </DateRangePicker>
        );
      case "date-range":
        return (
          <DateRangePicker
            initialSettings={{
              locale: {
                format: "DD.MM.YYYY",
              },
              // startDate: this.state.monthly_fee_date
              //   ? moment(this.state.monthly_fee_date).format("DD.MM.YYYY")
              //   : undefined,
            }}
          >
            <input type="text" className="form-control" />
          </DateRangePicker>
        );
      case "phone":
        return (
          <CustomPhoneInput
            {...field}
            {...props}
            className="form-control ant-input"
            defaultValue={field.value}
            onChange={onChangeCallback}
          />
        );

      case "checkbox":
        return (
          <Form.Control
            className="form-control ant-input"
            type="checkbox"
            checked={field.value}
            {...field}
            {...props}
          />
        );

      case "input":
        return (
          <Form.Control
            className="form-control ant-input"
            {...field}
            {...props}
          />
        );

      default:
        return (
          <Form.Control
            className="form-control ant-input"
            {...field}
            {...props}
          />
        );
    }
  };

  return (
    <Row>
      <Col lg={4} md={4} sm={5} xs={6}>
        <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
        {tip && <HelpTip tip={tip} />}
      </Col>
      <Col lg={8} md={8} sm={7} xs={6} className="form-input">
        {renderInput()}
        {meta.touched && meta.error ? (
          <span className="validate-error">{meta.error}</span>
        ) : null}
      </Col>
    </Row>
  );
};
