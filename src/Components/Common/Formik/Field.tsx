import { useField } from "formik";
import { ReactNode, useCallback } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { HelpTip } from "../HelpTip";
import { CustomSelect } from "../Inputs/CustomSelect";
import { CustomPhoneInput } from "../Inputs/CustomPhoneInput";
import { FileInput } from "../Inputs/FileInput";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { DatePicker } from "antd";
import { RatesInput } from "../Inputs/RatesInput";
import { ArrayInput } from "../Inputs/ArrayInput";
import { AdditionalFeesInput } from "../Inputs/AdditionalFeesInput";
import { formatNumber } from "../../../helpers/formatNumber";
import { InputLoading } from "../../../Components/Common";
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
    | "checkbox"
    | "array"
    | "file"
    | "multi-select"
    | "date-time"
    | "rates"
    | "additional-fee"
    | "number";
  children?: ReactNode;
  id?: string;
  type?: string;
  tip?: string;
  disabled?: boolean;
  disabledName?: string;
  propName?: string;
  precision?: number;
  currencyOptions?: Array<any>;
  callback?: Function;
  isLoading?: boolean;
};

export const Field: React.FC<CustomInputProps> = ({
  label,
  tip,
  options = [],
  inputType,
  children,
  callback,
  disabledName, // for array input
  propName, // for array input
  currencyOptions, // for array input
  precision,
  isLoading,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name);

  const onChangeCallback = useCallback(
    (value) => {
      helpers.setValue(value);
      // helpers.setTouched(true);
      callback && callback(value);
    },
    [helpers]
  );

  const onChangeCallbackCheckbox = useCallback(
    (value) => {
      helpers.setValue(value.currentTarget.checked);
      helpers.setTouched(true);
      callback && callback(value.currentTarget.checked);
    },
    [helpers]
  );

  const onChangeDateRangeCallback = useCallback(
    (start, end) => {
      helpers.setValue({ startDate: start, endDate: end });
      helpers.setTouched(true);
      callback && callback({ startDate: start, endDate: end });
    },
    [helpers]
  );

  const onChangeNumber = useCallback(
    (event, precision) => {
      helpers.setValue(formatNumber(event.currentTarget.value, precision));
      helpers.setTouched(true);
      callback && callback(formatNumber(event.currentTarget.value, precision));
    },
    [helpers]
  );

  const uploadFileCallback = useCallback(
    (event) => {
      helpers.setTouched(true);
      let reader = new FileReader();
      reader.readAsDataURL(event.currentTarget.files[0]);

      reader.onloadend = function () {
        helpers.setValue(reader.result);
        callback && callback(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
        helpers.setValue("");
      };
    },
    [helpers]
  );

  const renderInput = () => {
    switch (inputType) {
      case "select":
        return (
          <CustomSelect
            {...props}
            className="m-b-15"
            options={options}
            onChange={onChangeCallback}
            value={field.value}
          />
        );
      case "multi-select":
        return (
          <CustomSelect
            {...props}
            className="m-b-15"
            options={options}
            onChange={onChangeCallback}
            value={field.value}
            isMulti
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
      case "date-time":
        return (
          <DatePicker
            showTime={{
              defaultValue: moment(field.value),
              format: "HH:mm",
            }}
            onChange={onChangeCallback}
            value={field.value ? moment(field.value) : undefined}
            onOk={onChangeCallback}
          />
        );
      case "date-range":
        return (
          <DateRangePicker
            initialSettings={{
              locale: {
                format: "DD.MM.YYYY",
              },
              startDate: field.value
                ? moment(field.value.startDate).format("DD.MM.YYYY")
                : undefined,
              endDate: field.value
                ? moment(field.value.endDate).format("DD.MM.YYYY")
                : undefined,
            }}
            onCallback={onChangeDateRangeCallback}
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
            onChange={onChangeCallbackCheckbox}
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
      case "file":
        return (
          <FileInput {...field} {...props} onChange={uploadFileCallback} />
        );
      case "array":
        return <ArrayInput field={field} props={props} meta={meta} />;
      case "rates":
        return (
          <RatesInput
            field={field}
            props={props}
            meta={meta}
            disabledName={disabledName}
            precision={precision}
          />
        );
      case "number":
        return (
          <Form.Control
            className="form-control ant-input"
            {...field}
            {...props}
            type="number"
            onChange={(e) => onChangeNumber(e, precision)}
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
    <>
      {inputType !== "additional-fee" ? (
        <Row>
          <Col lg={4} md={4} sm={5} xs={6}>
            <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
            {tip && <HelpTip tip={tip} />}
          </Col>
          <Col lg={8} md={8} sm={7} xs={6} className="form-input">
            {isLoading ? <InputLoading /> : renderInput()}
            {!Array.isArray(meta.error) && meta.touched && meta.error ? (
              <span className="validate-error">{meta.error}</span>
            ) : null}
          </Col>
        </Row>
      ) : (
        <AdditionalFeesInput
          field={field}
          props={props}
          meta={meta}
          options={options}
          currencyOptions={currencyOptions}
        />
      )}
    </>
  );
};
