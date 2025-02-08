import { useState, useEffect } from "react";
import QuestionBox from "../components/QuestionBox";
import { Button } from "react-bootstrap";
import YeheyModal from "../components/YeheyModal";

const HomePage = () => {
  // Card dimensions in px (adjust these values according to your design)
  const cardWidth = 400;
  const cardHeight = 250;

  const [boxStyle, setBoxStyle] = useState({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "all 0.5s ease",
  });

  const [showModal, setShowModal] = useState(false);

  const handleYes = () => {
    setShowModal(true);
  };

  const moveBox = () => {
    // Calculate safe boundaries
    const halfWidthPerc = (cardWidth / 2 / window.innerWidth) * 100;
    const halfHeightPerc = (cardHeight / 2 / window.innerHeight) * 100;

    const minLeftPerc = halfWidthPerc;
    const maxLeftPerc = 100 - halfWidthPerc;
    const minTopPerc = halfHeightPerc;
    const maxTopPerc = 100 - halfHeightPerc;

    const randomTop = Math.floor(Math.random() * (maxTopPerc - minTopPerc)) + minTopPerc;
    const randomLeft = Math.floor(Math.random() * (maxLeftPerc - minLeftPerc)) + minLeftPerc;

    setBoxStyle({
      position: "absolute",
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
      transform: "translate(-50%, -50%)",
      transition: "all 0.1s ease",
    });
  };

  // Optionally ensure no overflow on the body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <QuestionBox customStyle={boxStyle}>
        <h3 className="mb-4">Will you be my Valentine?</h3>
        <div className="d-flex justify-content-center gap-3">
          <Button variant="success" onClick={handleYes} className="px-4">
            Yes
          </Button>
          <Button variant="danger" className="px-4" onMouseEnter={moveBox} onTouchStart={moveBox}>
            No
          </Button>
        </div>
      </QuestionBox>
      <YeheyModal showModal={showModal} />
    </>
  );
};

export default HomePage;