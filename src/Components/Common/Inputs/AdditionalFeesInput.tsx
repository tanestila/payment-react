import { FieldArray, useFormikContext, Field as FormikField } from "formik";
import { Col, Row } from "react-bootstrap";
import { Button } from "antd";
import { CustomSelect } from "./CustomSelect";
import { useCallback, useState } from "react";
import { formatNumber } from "../../../helpers/formatNumber";
export const AdditionalFeesInput = ({
  field,
  props,
  meta,
  options: initOptions,
  currencyOptions,
  precision = 2,
}) => {
  const [options, setOptions] = useState<Array<any>>(initOptions);
  const [selected_names, setSelectedNames] = useState<Array<any>>([]);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const onChangeCallback = useCallback((name, value) => {
    setFieldTouched(name, true);
    setFieldValue(name, value);
    let selected_namesTemp = [...selected_names, value.name];
    let optionsTemp = [...options];
    selected_namesTemp.forEach((i) => {
      optionsTemp = optionsTemp.filter((opt) => opt.name !== i);
    });
    setSelectedNames([...selected_namesTemp]);
    setOptions([...optionsTemp]);
  }, []);

  const onChangeNumber = useCallback((event, index, value) => {
    setFieldValue(
      `${value.name}.${index}.value`,
      formatNumber(event.currentTarget.value, precision)
    );
  }, []);

  return (
    <FieldArray
      {...field}
      {...props}
      render={(arrayHelpers) => (
        <>
          {field.value && field.value.length > 0 && (
            <>
              <Row>
                <Col>Name</Col>
                <Col>Value</Col>
                <Col>Currency</Col>
                <Col></Col>
              </Row>
              {field.value.map((value, index) => (
                <Row key={index}>
                  <Col>
                    <CustomSelect
                      className="m-b-15"
                      options={options}
                      onChange={(value) =>
                        onChangeCallback(`${props.name}.${index}.name`, value)
                      }
                      value={value.name}
                    />
                    {meta.error &&
                    meta.error[index] &&
                    meta.error[index].name &&
                    meta.touched ? (
                      <span className="validate-error">
                        {meta.error[index].name}
                      </span>
                    ) : null}
                  </Col>

                  <Col className="form-input">
                    <FormikField
                      className="form-control ant-input"
                      name={`${props.name}.${index}.value`}
                      type="number"
                      onChange={(e) => onChangeNumber(e, index, props)}
                    />

                    {meta.error &&
                    meta.error[index] &&
                    meta.error[index].value &&
                    meta.touched ? (
                      <span className="validate-error">
                        {meta.error[index].value}
                      </span>
                    ) : null}
                  </Col>
                  <Col>
                    <CustomSelect
                      className="m-b-15"
                      options={currencyOptions}
                      onChange={(value) =>
                        onChangeCallback(
                          `${props.name}.${index}.currency`,
                          value
                        )
                      }
                      value={value.currency}
                    />
                    {meta.error &&
                    meta.error[index] &&
                    meta.error[index].currency &&
                    meta.touched ? (
                      <span className="validate-error">
                        {meta.error[index].currency}
                      </span>
                    ) : null}
                  </Col>
                  <Col>
                    <Button onClick={() => arrayHelpers.remove(index)}>
                      Delete
                    </Button>
                  </Col>
                </Row>
              ))}
            </>
          )}
          <Row>
            <Button
              onClick={() =>
                arrayHelpers.push({ name: null, value: 0, currency: null })
              }
            >
              Add additional fee
            </Button>
          </Row>
        </>
      )}
    />
  );
};
