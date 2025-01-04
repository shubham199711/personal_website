import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #bada55;
    }
  }
`;

const Logo = styled.a`
  font-size: 1.5rem;
  margin: 0;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  font-family: "Courier New", Courier, monospace;
  &:hover {
    color: #bada55;
  }
`;

const MobileNavToggle = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #bada55;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopNav = styled.ul`
  display: flex;
  flex-direction: row;

  @media (max-width: 767px) {
    display: none;
  }
`;

const Divider = styled.div`
  border-right: 1px solid #6d6d6d;
`;

const MobileNav = styled.ul`
  display: none;
  flex-direction: column;
  margin: 0;
  padding: 0;

  @media (max-width: 767px) {
    display: flex;
  }
`;

const NavBar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  return (
    <Nav>
      <Logo href="/">{"<Shubham Dohare/>"}</Logo>
      <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
        {isMobileNavOpen ? "Close" : "Menu"}
      </MobileNavToggle>
      <DesktopNav>
        <NavItem>
          <a href="/resume">Resume</a>
        </NavItem>
        <Divider className="divider"></Divider>
        <NavItem>
          <a href="/project">Projects</a>
        </NavItem>
        <Divider className="divider"></Divider>
        <NavItem>
          <a href="/leetcode">Leetcode</a>
        </NavItem>
        <Divider className="divider"></Divider>
        <NavItem>
          <a href="/contact">Contact</a>
        </NavItem>
      </DesktopNav>
      <MobileNav style={{ display: isMobileNavOpen ? "flex" : "none" }}>
        <NavItem>
          <a href="/resume">Resume</a>
        </NavItem>
        <NavItem>
          <a href="/project">Projects</a>
        </NavItem>
        <NavItem>
          <a href="/leetcode">Leetcode</a>
        </NavItem>
        <NavItem>
          <a href="/contact">Contact</a>
        </NavItem>
      </MobileNav>
    </Nav>
  );
};
export default NavBar;
