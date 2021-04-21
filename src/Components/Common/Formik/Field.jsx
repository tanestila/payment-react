import { useField } from "formik";
import { Col, Form, Row } from "react-bootstrap";

export const Field = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Row>
      <Col md={3} sm={4} xs={4} className="form-label">
        <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
      </Col>
      <Col md={8}>
        <Form.Control className="form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <span className="validate-error">{meta.error}</span>
        ) : null}
      </Col>
    </Row>
  );
};
