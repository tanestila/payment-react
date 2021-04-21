import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function CustomModal({
  button,
  header,
  content: Content,
  allowed = true,
  dialogClassName = "",
  contentProps = {},
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span onClick={handleShow}>{button}</span>

      <Modal show={show} onHide={handleClose} dialogClassName={dialogClassName}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
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
