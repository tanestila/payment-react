import { useState } from "react";
import { Modal } from "react-bootstrap";

type CustomModalProps = {
  button: React.ReactNode;
  header: string;
  content: React.ComponentType;
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
        {/* <Modal.Body>{content}</Modal.Body> */}
        <Modal.Body>
          <Content handleClose={handleClose} {...contentProps} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
