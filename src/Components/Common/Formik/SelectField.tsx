import { useField } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { CustomSelect } from "../Select";

type CustomSelectProps = {
  options: Array<any>;
  defaultValue?: any;
  label: string;
  name: string;
  id?: string;
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

export const SelectField: React.FC<CustomSelectProps> = ({
  options = [],
  defaultValue,
  label,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name);

  const onSelect = useCallback((option) => {
    helpers.setValue(option);
  }, []);

  return (
    <Row>
      <Col lg={4} md={4} sm={5} xs={6}>
        <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
      </Col>
      <Col lg={8} md={8} sm={7} xs={6} className="form-input">
        {/* <Form.Control className="form-control" {...field} {...props} /> */}

        <CustomSelect
          {...props}
          styles={customStyles}
          options={options}
          onChange={onSelect}
          defaultValue={field.value}
        />
        {/* <Select
          {...field}
          {...props}
          classNamePrefix="select"
          styles={customStyles}
          options={convertedOptions}
        /> */}
        {meta.touched && meta.error ? (
          <span className="validate-error">{meta.error}</span>
        ) : null}
      </Col>
    </Row>
  );
};
