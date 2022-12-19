import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

const NavigationBar = ({ loggedIn }) => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Navbar bg="warning" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">Spikeball - App</Navbar.Brand>
        {loggedIn ? (
          loggedIn.emailVerified ? (
            <>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse>
                <Nav className="me-auto">
                  <Link to="/">
                    <Nav.Link href="/">Home</Nav.Link>
                  </Link>
                  <Link to="/leaguepage">
                    <Nav.Link href="/">League</Nav.Link>
                  </Link>
                  <Link to="/addgamepage">
                    <Nav.Link href="/">AddGame</Nav.Link>
                  </Link>
                  <Link to={`/UserPage/${loggedIn.uid}`}>
                    <Nav.Link href="/">Profile</Nav.Link>
                  </Link>
                </Nav>
                <Nav>
                  <Link to="/" onClick={logout}>
                    <Nav.Link href="/">Logout</Nav.Link>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            <>
              <Nav>
                <Link to="/" onClick={logout}>
                  <Nav.Link href="/">Logout</Nav.Link>
                </Link>
              </Nav>
            </>
          )
        ) : (
          <Nav>
            <Link to="/">
              <Nav.Link href="/">Login/Register</Nav.Link>
            </Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
