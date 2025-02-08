import { useState, useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const PUZZLE_SIZE = 4; // 4×4 grid
const TOTAL_PIECES = PUZZLE_SIZE * PUZZLE_SIZE;

// A list of image paths available for the puzzle.
const imagesList = [
  "../../public/valen1.jpg",
  "../../public/valen2.jpg",
  "../../public/valen3.jpg",
];

// Shuffle an array randomly.
function f(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// Calculate the background position for each piece.
function getBackgroundPosition(pieceId) {
  const row = Math.floor(pieceId / PUZZLE_SIZE);
  const col = pieceId % PUZZLE_SIZE;
  return `-${col * 100}px -${row * 100}px`;
}

function DemoPage() {
  const [selectedImage, setSelectedImage] = useState(imagesList[0]);
  const [board, setBoard] = useState(
    shuffle(Array.from({ length: TOTAL_PIECES }, (_, i) => i))
  );
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  // New state for touch support
  const [dragSource, setDragSource] = useState(null);

  useEffect(() => {
    let rounds = 0;
    const interval = setInterval(() => {
      setBoard(shuffle(Array.from({ length: TOTAL_PIECES }, (_, i) => i)));
      rounds++;
      if (rounds === 3) {
        clearInterval(interval);
      }
    }, 500); // 500ms delay between rounds
    return () => clearInterval(interval);
  }, [selectedImage]);

  // Check if puzzle is complete.
  useEffect(() => {
    const isComplete = board.every((pieceId, index) => pieceId === index);
    if (isComplete && !puzzleComplete) {
      setPuzzleComplete(true);
      setTimeout(() => {
        alert("Congratulations! Puzzle Complete! 🎉");
      }, 100);
    } else if (!isComplete && puzzleComplete) {
      setPuzzleComplete(false);
    }
  }, [board, puzzleComplete]);

  // Standard drag events for desktop.
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

  // Touch events for mobile/touch devices.
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Puzzle Game</h1>

      {/* Image selection dropdown */}
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={6} className="d-flex justify-content-center">
            <Form.Group
              controlId="imageSelect"
              className="d-flex align-items-center"
            >
              <Form.Label className="me-2 fw-bold">Select Image:</Form.Label>
              <Form.Select
                value={selectedImage}
                onChange={(e) => setSelectedImage(e.target.value)}
              >
                {imagesList.map((img, idx) => (
                  <option key={idx} value={img}>
                    {img}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <div className="flex justify-center">
        <div className="border-[20px] border-pink-600 bg-pink-500 rounded-3 p-3 shadow-lg">
          {/* Puzzle Board */}
          <div className="grid grid-cols-4 gap-0 w-[400px] h-[400px]">
            {board.map((pieceId, index) => (
              <div
                key={index}
                className={`w-[100px] h-[100px] relative ${
                  puzzleComplete
                    ? ""
                    : "border-pink-100 border-2 border-opacity-50"
                }`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                // Add onTouchEnd on the container to simulate a drop.
                onTouchEnd={(e) => handleTouchEnd(e, index)}
              >
                <div
                  draggable
                  // Apply both drag and touch start events.
                  onDragStart={(e) => handleDragStart(e, pieceId, index)}
                  onTouchStart={(e) => handleTouchStart(e, pieceId, index)}
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundSize: "400px 400px",
                    backgroundPosition: getBackgroundPosition(pieceId),
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center mt-4 text-gray-600">
        Drag and drop (or touch) the pieces to rearrange the puzzle.
      </p>
    </div>
  );
}

export default DemoPage;