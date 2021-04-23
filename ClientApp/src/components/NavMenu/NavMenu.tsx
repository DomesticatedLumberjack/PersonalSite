import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NamePlate } from './Nameplate/NamePlate';
import './NavMenu.css';

export const NavMenu: React.FC = () => {
  return (
    <header>
      <NamePlate/>
      <Navbar bg="dark" className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" style={{marginTop: '100px'}}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav activeKey="/home">
              <Nav.Link className="text-light" href="/">About</Nav.Link>
              <Nav.Link className="text-light" href="/blog">Blog</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}