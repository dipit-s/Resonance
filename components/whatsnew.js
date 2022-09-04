import { Carousel, Col, Container, Row } from "react-bootstrap";
import React from "react";

function whatsnew(props) {
  return (
    <div className="bg-beige">
      <Row>
        <Col xs={8}>
          <Carousel>
            <Carousel.Item>
              <Container
                className="carousel-image"
                id="carousel-img-1"
              ></Container>
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Container
                className="carousel-image"
                id="carousel-img-2"
              ></Container>
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Container
                className="carousel-image"
                id="carousel-img-3"
              ></Container>
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col xs={4}></Col>
      </Row>
    </div>
  );
}

export default whatsnew;
