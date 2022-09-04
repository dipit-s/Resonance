import React from "react";
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

function navbar() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Internship.com</Navbar.Brand>
        <Nav className="me-right">
          <Link href="/">Register</Link>
          <Link href="/">Login</Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default navbar;
