import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const YeheyModal = ({ showModal }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/puzzle/1");
  };

  return (
    <Modal show={showModal} data-bs-backdrop="static" data-bs-keyboard="false" centered>
      <Modal.Header>
        <Modal.Title>Happy Valentine's Day!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          YEHEY! I love you. Dahil dyan (kahit hindi ka mahilig sa games) continue for more details!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose} className="custom-button">
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default YeheyModal;