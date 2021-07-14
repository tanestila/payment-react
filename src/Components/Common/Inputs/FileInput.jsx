import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Row, Col } from "react-bootstrap";

export const FileInput = ({ value, ...props }) => {
  return (
    <>
      <Row>
        {value && (
          <Col md={3} sm={4} xs={4} className="form-label">
            <a
              href={value}
              download="key.p12"
              style={{ textDecoration: "underline" }}
            >
              Download file
            </a>
          </Col>
        )}
        <Col md={8}>
          <Form.Control
            className="form-control ant-input"
            type="file"
            style={{ border: "none" }}
            {...props}
          />
        </Col>
      </Row>
    </>
  );
};
