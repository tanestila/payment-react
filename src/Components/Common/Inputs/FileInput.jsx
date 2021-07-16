import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Row, Col } from "react-bootstrap";

export const FileInput = ({ value, ...props }) => {
  return (
    <>
      <Row>
        {value && (
          <Col>
            <a
              href={value}
              download="key.p12"
              style={{ textDecoration: "underline" }}
            >
              Download file
            </a>
          </Col>
        )}
        <Col>
          <Form.Label for="file-upload" className="custom-file-upload">
            Upload
          </Form.Label>
          <Form.Control
            id="file-upload"
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
