import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const LevelTracker = ({ level1, level2, level3 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {level1 ? (
          <Nav.Link as={NavLink} to="/puzzle/1" style={{ color: "red" }}>
            Level 1
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Level 1</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {level2 ? (
          <Nav.Link as={NavLink} to="/puzzle/2" style={{ color: "red" }}>
            Level 2
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Level 2</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {level3 ? (
          <Nav.Link as={NavLink} to="/puzzle/3" style={{ color: "red" }}>
            Level 3
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Level 3</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default LevelTracker;
