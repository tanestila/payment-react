import { FieldArray, useField, Field as FormikField } from "formik";
import { ReactNode, useCallback } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { HelpTip } from "../HelpTip";
import { CustomSelect } from "../Inputs/CustomSelect";
import { CustomPhoneInput } from "../Inputs/CustomPhoneInput";
import { FileInput } from "../Inputs/FileInput";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

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
    | "multi-select";
  children?: ReactNode;
  id?: string;
  type?: string;
  tip?: string;
  disabled?: boolean;
  callback?: Function;
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
  callback,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name);

  const onChangeCallback = useCallback(
    (value) => {
      helpers.setTouched(true);
      helpers.setValue(value);
      callback && callback(value);
    },
    [helpers]
  );

  const onChangeCallbackCheckbox = useCallback(
    (value) => {
      helpers.setTouched(true);
      helpers.setValue(value.currentTarget.checked);
      callback && callback(value.currentTarget.checked);
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
            styles={customStyles}
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
            styles={customStyles}
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
          <>
            <FileInput {...field} {...props} onChange={uploadFileCallback} />
            {/* <Form.Control
              className="form-control ant-input"
              {...field}
              {...props}
              type="file"
              onChange={uploadFileCallback}
            /> */}
          </>
        );
      case "array":
        return (
          <FieldArray
            {...field}
            {...props}
            render={(arrayHelpers) => (
              <>
                {field.value && field.value.length > 0 ? (
                  <>
                    {field.value.map((value, index) => (
                      <Row>
                        <Col className="form-input">
                          <div key={index} style={{ display: "flex" }}>
                            <FormikField
                              className="form-control ant-input"
                              name={`${props.name}.${index}`}
                            />
                            <CloseOutlined
                              onClick={() => arrayHelpers.remove(index)}
                              style={{ marginLeft: "5px", marginTop: "5px" }}
                            />
                          </div>

                          {meta.error && meta.error[index] && meta.touched ? (
                            <span className="validate-error">
                              {meta.error[index]}
                            </span>
                          ) : null}
                        </Col>
                      </Row>
                    ))}
                    <>
                      <Button type="link" onClick={() => arrayHelpers.push("")}>
                        Add value
                      </Button>
                    </>
                  </>
                ) : (
                  <Button type="link" onClick={() => arrayHelpers.push("")}>
                    Add value
                  </Button>
                )}
              </>
            )}
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
        {!Array.isArray(meta.error) && meta.touched && meta.error ? (
          <span className="validate-error">{meta.error}</span>
        ) : null}
      </Col>
    </Row>
  );
};
