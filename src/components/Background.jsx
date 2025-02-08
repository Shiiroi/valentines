import "../Background.css";
import { Outlet } from "react-router-dom";

const Background = () => {
  const hearts = Array.from({ length: 20 }, (_, i) => {
    const left = Math.floor(Math.random() * 100) + "%";
    const delay = Math.floor(Math.random() * 5);
    const duration = Math.random() * 3 + 4; // between 4s and 7s
    const size = Math.floor(Math.random() * 20) + 10; // between 10px and 30px
    return (
      <>
        <div
          key={i}
          className="heart"
          style={{
            left,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      </>
    );
  });

  return (
    <>
      <div className="background">{hearts}</div>
      <Outlet />
    </>
  );
};

export default Background;
