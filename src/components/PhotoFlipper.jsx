import React from "react";
import "../PhotoFlipper.css";
import { Outlet } from "react-router-dom";

// photos prop expects an array of objects: [{ front: "url1", back: "url2" }, ...]
const PhotoFlipper = ({ photos }) => {
  return (
    <>
      <div className="photo-flipper-container">
        {photos.map((photo, index) => (
          <div className="photo-flip" key={index}>
            <div className="photo-flip-inner">
              <div className="photo-flip-face photo-flip-front">
                <img src={photo.front} alt={`Front ${index}`} />
              </div>
              <div className="photo-flip-face photo-flip-back">
                <img src={photo.back} alt={`Back ${index}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default PhotoFlipper;
