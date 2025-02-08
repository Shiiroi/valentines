import React from "react";
import { getBackgroundPosition } from "../utils/puzzleUtils";
import "../float.css";

function PuzzleBoard({
  board,
  selectedImage,
  puzzleComplete,
  handleDragOver,
  handleDrop,
  handleDragStart,
  handleTouchStart,
  handleTouchEnd,
}) {
  return (
    <div className="flex justify-center">
      <div className="border-[20px] border-pink-600 bg-pink-500 rounded-3 p-3 shadow-lg floating">
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
              onTouchEnd={(e) => handleTouchEnd(e, index)}
            >
              <div
                draggable
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
  );
}

export default PuzzleBoard;