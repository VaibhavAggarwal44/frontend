import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaMicroblog } from 'react-icons/fa';


function Navbar2() {
  return (
    <Navbar  bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home">BLOGGER  <FaMicroblog/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Create Blog</Nav.Link>
          <NavDropdown title="More Options" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">SEARCH</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              User Articles
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">LOGOUT</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navbar2