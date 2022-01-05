import React from "react";
import { Navbar, Container } from "react-bootstrap";

const navbarStyle = {
  backgroundColor: "lightblue",
};

const Header = (props) => {
  return (
    <Navbar style={ navbarStyle } variant="light">
      <Container>
        <Navbar.Brand href="/">{props.title}</Navbar.Brand>
        <img src="favicon-32x32.png" alt="Favorit icon" />
      </Container>
    </Navbar>
  );
};
export default Header;
