import { useField } from "formik";
import { ReactNode } from "react";
import { Col, Form, Row } from "react-bootstrap";

type CustomInputProps = {
  label: string;
  children?: ReactNode;
  name: string;
  id?: string;
  type: string;
};

export const Field: React.FC<CustomInputProps> = ({
  label,
  children,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  return (
    <Row>
      <Col lg={4} md={4} sm={5} xs={6}>
        <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
      </Col>
      <Col lg={8} md={8} sm={7} xs={6} className="form-input">
        <Form.Control className="form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <span className="validate-error">{meta.error}</span>
        ) : null}
      </Col>
    </Row>
  );
};
