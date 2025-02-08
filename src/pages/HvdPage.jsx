import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import PhotoFlipper from "../components/PhotoFlipper";
import "../float.css";

const photos = [
  { front: "/valen4.jpg", back: "/valen5.jpg" },
  { front: "/valen6.jpg", back: "/valen7.jpg" },
  { front: "/valen8.jpg", back: "/valen9.jpg" },
];

const HvdPage = () => {
  return (
    <>
      <Container
        className="d-flex align-items-center floating"
        style={{ minHeight: "100vh" }}
      >
        <Row className="justify-content-start w-100">
          <Col xs={6} md={4} className="mb-4">
            <Card className="shadow-lg">
              <Card.Header
                style={{ fontWeight: "bold", backgroundColor: "#C2185B" }}
                className="text-white"
              >
                Happy Valentine's Day!
              </Card.Header>
              <Card.Body className="text-start">
                <Card.Title style={{ fontWeight: "bold" }}>Hi Love!</Card.Title>
                <Card.Text className="text-justify">
                  Thank you so much for being my Valentine, my gf, my baby and
                  bestfriend. I love you so much! Sobrang grateful ako na
                  nandito ka palagi para sakin kahit sobrang dami nating
                  napagdaanang ups and downs. Let's enjoy our day on valentines
                  and make more memories together! I miss you
                  lovelovelove!!!
                  <br />
                  <br />
                  <span style={{ fontStyle: "italic" }}>Love,</span>
                  <br />
                  <span style={{ fontWeight: 600, fontStyle: "italic" }}>
                    Vince
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={8} className="mb-4">
            <PhotoFlipper photos={photos} />
          </Col>
        </Row>
      </Container>
      <iframe
  style={{
    position: "fixed",
    bottom: "10px",
    right: "80px",
    borderRadius: "12px",
    zIndex: 500,
  }}
  src="https://open.spotify.com/embed/track/3TN0iGCBNNPbuqD7DyAe7A?utm_source=generator&autoplay=1"
  width="400"
  height="200"
  frameBorder="0"
  allowFullScreen=""
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
></iframe>
    </>
  );
};

export default HvdPage;
