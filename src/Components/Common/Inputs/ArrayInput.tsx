import { FieldArray, Field as FormikField } from "formik";
import { Col, Row } from "react-bootstrap";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export const ArrayInput = ({ field, props, meta }) => {
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
};
