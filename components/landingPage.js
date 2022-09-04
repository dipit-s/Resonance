import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";

function landingPage() {
  return (
    <div className="landingPage">
      <Row>
        <Col xs={4}>
          <div className="logo">
            <img src="assets/logo.png" className="logoimg" />
          </div>
        </Col>
        <Col xs={4} className="tagline">
          <Row>Find</Row>
          <Row>Perceive</Row>
          <Row>Achieve</Row>
        </Col>
        <Col>
          <Container className="login-modal">
            <h1 className="text-center pt-5">Login</h1>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mt-5 mx-5"
            >
              <Tab eventKey="home" title="Student">
                {loginModal()}
              </Tab>
              <Tab eventKey="profile" title="Teacher">
                {loginModal()}
              </Tab>
            </Tabs>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

function loginModal() {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail" className="pt-5 pb-4 px-5">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          // ref={emailRef}
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="py-4 px-5">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          // ref={passwordRef}
          placeholder="Password"
        />
      </Form.Group>
      <div className="text-center p-5">
        <Button
          // disabled={loading}
          variant="warning"
          type="submit"
          // onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
    </Form>
  );
}

export default landingPage;
