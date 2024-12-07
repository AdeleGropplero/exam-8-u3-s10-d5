import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../App.css";
import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="/myLogo.svg" alt="logo" style={{ width: "15%" }} />
          <p className="m-0 ps-4">
            <strong>Epic Weather </strong>
          </p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="me-2">
              Home
            </Nav.Link>
            <Nav.Link href="#features">Search History</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
