import {
  FieldArray,
  useField,
  useFormikContext,
  Field as FormikField,
} from "formik";
import { Col, Form, Row } from "react-bootstrap";
import { Button } from "antd";

export const RatesInput = ({ field, props, meta, disabledName }) => {
  const { setFieldValue } = useFormikContext();
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
                      onChange={(e) => {
                        setFieldValue(
                          `${props.name}.${index}.bank_exchange_rate`,
                          e.currentTarget.value
                        );
                        if (value.isFlat) {
                          setFieldValue(
                            `${props.name}.${index}.processor_exchange_rate`,
                            e.currentTarget.value + +value.exchange_markup_value
                          );
                        } else {
                          setFieldValue(
                            `${props.name}.${index}.processor_exchange_rate`,
                            e.currentTarget.value *
                              (value.exchange_markup_value / 100 + 1)
                          );
                        }
                      }}
                    />

                    {meta.error && meta.error[index] && meta.touched ? (
                      <span className="validate-error">
                        {meta.error[index]}
                      </span>
                    ) : null}
                  </Col>
                  <Col className="form-input">
                    <FormikField
                      className="form-control ant-input"
                      name={`${props.name}.${index}.processor_exchange_rate`}
                      disabled={value.name === disabledName}
                    />

                    {meta.error && meta.error[index] && meta.touched ? (
                      <span className="validate-error">
                        {meta.error[index]}
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
