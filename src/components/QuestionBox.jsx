import { Container, Row, Col } from "react-bootstrap";


const QuestionBox = ({ children, customStyle }) => {
  return (
    <Container
      fluid
      style={customStyle}
      className="min-vh-100 d-flex align-items-center justify-content-center"
    >
      <Row className="justify-content-center w-100">
        <Col
          xs={12}
          md={8}
          lg={6}
          xl={4}
          className="text-center p-4 border rounded-3 bg-light shadow"
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionBox;