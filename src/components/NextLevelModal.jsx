import { Modal, Button } from "react-bootstrap";

const NextLevelModal = ({ isShown, lvl, onCon }) => {
  const handleContinue = () => {
    onCon();
  };

  const renderModalContent = () => {
    switch (lvl) {
      case 1:
        return (
          <>
            Who: ME AND YOU!
            <br />
            What: Valentine's Date and gift reveal!
            <br />
            When: ...
            <br />
            Where: ...
            <br />
            Why: ...
            <br />
            How: ...
          </>
        );
      case 2:
        return (
          <>
            Who: ME AND YOU!
            <br />
            What: Valentine's Date and gift reveal!
            <br />
            When: February 14, 2025
            <br />
            Where: Online
            <br />
            Why: ...
            <br />
            How: ...
          </>
        );
      case 3:
        return (
          <>
            Who: ME AND YOU!
            <br />
            What: Valentine's Date and gift reveal!
            <br />
            When: February 14, 2025
            <br />
            Where: Online
            <br />
            Why: Because I love you and Valentine's day and YEHEY MONTHSARY
            <br />
            How: CALL CALL CALL
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      show={isShown}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      centered
    >
      <Modal.Header>
        <Modal.Title>Galing mo Naman!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderModalContent()}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleContinue} className="custom-button">
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NextLevelModal;