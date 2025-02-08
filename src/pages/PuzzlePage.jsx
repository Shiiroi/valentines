import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import PuzzleBoard from "../components/PuzzleBoard";
import { shuffle, TOTAL_PIECES, PUZZLE_SIZE } from "../utils/puzzleUtils";
import LevelTracker from "../components/LevelTracker";
import NextLevelModal from "../components/NextLevelModal";

const imagesList = [
  "/valen1.jpg",
  "/valen2.jpg",
  "/valen3.jpg",
];

function PuzzlePage() {
  const navigate = useNavigate();
  const { id: level } = useParams();
  const [selectedImage, setSelectedImage] = useState(imagesList[level - 1]);
  const [board, setBoard] = useState(
    shuffle(Array.from({ length: TOTAL_PIECES }, (_, i) => i))
  );
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dragSource, setDragSource] = useState(null);

  useEffect(() => {
    setSelectedImage(imagesList[level - 1]);
    let rounds = 0;
    const interval = setInterval(() => {
      setBoard(shuffle(Array.from({ length: TOTAL_PIECES }, (_, i) => i)));
      rounds++;
      if (rounds === 3) {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [selectedImage, level]);

  useEffect(() => {
    const isComplete = board.every((pieceId, index) => pieceId === index);
    if (isComplete && !puzzleComplete) {
      setPuzzleComplete(true);
      setTimeout(() => {
        setShowModal(true);
      }, 500);
    } else if (!isComplete && puzzleComplete) {
      setPuzzleComplete(false);
    }
  }, [board, puzzleComplete]);

  // Event handlers
  const handleDragStart = (e, pieceId, sourceIndex) => {
    if (puzzleComplete) return;
    e.dataTransfer.setData("pieceId", pieceId);
    e.dataTransfer.setData("sourceIndex", sourceIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (puzzleComplete) return;
    const draggedPieceId = parseInt(e.dataTransfer.getData("pieceId"), 10);
    const sourceIndex = parseInt(e.dataTransfer.getData("sourceIndex"), 10);
    if (sourceIndex === targetIndex) return;
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[sourceIndex] = newBoard[targetIndex];
      newBoard[targetIndex] = draggedPieceId;
      return newBoard;
    });
  };

  const handleTouchStart = (e, pieceId, sourceIndex) => {
    if (puzzleComplete) return;
    setDragSource({ pieceId, sourceIndex });
  };

  const handleTouchEnd = (e, targetIndex) => {
    if (puzzleComplete) return;
    if (!dragSource) return;
    if (dragSource.sourceIndex === targetIndex) return;
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[dragSource.sourceIndex] = newBoard[targetIndex];
      newBoard[targetIndex] = dragSource.pieceId;
      return newBoard;
    });
    setDragSource(null);
  };

  const onContinue = () => {
    setShowModal(false);
  };

  const onNext = () => {
    if (level == 3) {
      return navigate("/hvd");
    }
    navigate(`/puzzle/${parseInt(level) + 1}`);
  };

  const getHeaderText = (level) => {
    switch (level) {
      case "1":
        return "Our Most Recent Date!";
      case "2":
        return "My Favorite Picture of Us!";
      case "3":
        return "Last Puzzle Baby!";
      default:
        return "Puzzle Game";
    }
  };

  return (
    <>
      <Container className="p-1">
        <Row>
          <h1 className="text-3xl font-bold text-center mb-4">
            {getHeaderText(level)}
          </h1>
        </Row>
        {level == 1 ? (
          <LevelTracker level1 />
        ) : level == 2 ? (
          <LevelTracker level1 level2 />
        ) : level == 3 ? (
          <LevelTracker level1 level2 level3 />
        ) : null}
        <Row className="my-1">
          <PuzzleBoard
            board={board}
            selectedImage={selectedImage}
            puzzleComplete={puzzleComplete}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
            handleTouchStart={handleTouchStart}
            handleTouchEnd={handleTouchEnd}
          />
        </Row>
        <Row className="py-1">
          <Col className="text-center">
            {puzzleComplete ? (
              <Button className="custom-button" onClick={onNext}>
                Next
              </Button>
            ) : null}
          </Col>
        </Row>
        {/* // Replace the Debug button onClick handler as follows:
        <Button
          onClick={() => {
            setBoard(Array.from({ length: TOTAL_PIECES }, (_, i) => i));
          }}
          className="custom-button"
        >
          Debug
        </Button> */}
        <Row>
          <p className="text-center mt-4 text-gray-600">
            Drag and drop (or touch) the pieces to rearrange the puzzle.
          </p>
        </Row>
      </Container>
      <NextLevelModal
        isShown={showModal}
        lvl={parseInt(level, 10)}
        onCon={onContinue}
      />
    </>
  );
}

export default PuzzlePage;
