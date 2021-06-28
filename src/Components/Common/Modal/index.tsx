import { useState } from "react";
import { Modal } from "react-bootstrap";
// import { Modal, Button } from "antd";

type CustomModalProps = {
  button: React.ReactNode;
  header: string;
  content: React.ComponentType | React.FC<any>;
  allowed?: boolean;
  dialogClassName?: string;
  contentProps?: any;
};

export default function CustomModal({
  button,
  header,
  content: Content,
  dialogClassName = "",
  contentProps = {},
}: CustomModalProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span onClick={handleShow}>{button}</span>

      <Modal show={show} onHide={handleClose} dialogClassName={dialogClassName}>
        <Modal.Header style={{ borderBottom: "1px #dddddd solid" }} closeButton>
          <Modal.Title style={{ margin: "20px 0 15px" }}>{header}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Content handleClose={handleClose} {...contentProps} />
        </Modal.Body>
      </Modal>
      {/*
      <Modal
        title="Modal 1000px width"
        centered
        visible={show}
        onOk={handleShow}
        onCancel={handleClose}
      >
        <Content handleClose={handleClose} {...contentProps} />
      </Modal> */}
    </>
  );
}
