import {
  FieldArray,
  useField,
  useFormikContext,
  Field as FormikField,
} from "formik";
import { Col, Form, Row } from "react-bootstrap";
import { Button } from "antd";
import { useCallback } from "react";
import { formatNumber } from "../../../helpers/formatNumber";

export const RatesInput = ({
  field,
  props,
  meta,
  disabledName,
  precision = 4,
}) => {
  const { setFieldValue } = useFormikContext();

  const onChangeNumber = useCallback((event, index, value) => {
    setFieldValue(
      `${props.name}.${index}.bank_exchange_rate`,
      formatNumber(event.currentTarget.value, precision)
    );
    if (value.isFlat) {
      setFieldValue(
        `${props.name}.${index}.processor_exchange_rate`,
        formatNumber(
          event.currentTarget.value + +value.exchange_markup_value,
          precision
        )
      );
    } else {
      setFieldValue(
        `${props.name}.${index}.processor_exchange_rate`,
        formatNumber(
          event.currentTarget.value * (value.exchange_markup_value / 100 + 1),
          precision
        )
      );
    }
  }, []);

  return (
    <FieldArray
      {...field}
      {...props}
      render={(arrayHelpers) => (
        <>
          {field.value && field.value.length > 0 ? (
            <>
              <Row>
                <Col>Currency</Col>
                <Col>Bank</Col>
                <Col>Processor</Col>
              </Row>
              {field.value.map((value, index) => (
                <Row key={index}>
                  <Col>
                    <Form.Label htmlFor={props.name[index]}>
                      {value.name}
                    </Form.Label>
                  </Col>
                  <Col className="form-input">
                    <FormikField
                      className="form-control ant-input"
                      name={`${props.name}.${index}.bank_exchange_rate`}
                      disabled={value.name === disabledName}
                      type="number"
                      onChange={(e) => onChangeNumber(e, index, value)}
                    />

                    {meta.error &&
                    meta.error[index] &&
                    meta.error[index].bank_exchange_rate &&
                    meta.touched ? (
                      <span className="validate-error">
                        {meta.error[index].bank_exchange_rate}
                      </span>
                    ) : null}
                  </Col>
                  <Col className="form-input">
                    <FormikField
                      className="form-control ant-input"
                      name={`${props.name}.${index}.processor_exchange_rate`}
                      disabled={value.name === disabledName}
                    />

                    {meta.error &&
                    meta.error[index] &&
                    meta.error[index].processor_exchange_rate &&
                    meta.touched ? (
                      <span className="validate-error">
                        {meta.error[index].processor_exchange_rate}
                      </span>
                    ) : null}
                  </Col>
                </Row>
              ))}
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
};
