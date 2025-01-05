import { useEffect, useRef, useCallback, useState } from "react";
import styled from "styled-components";
import useMediaQuery from "../hooks/useMediaQuery";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
  @media (max-width: 767px) {
    justify-content: space-between;
  }
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
    gap: 10px;
  }
`;

const NavBar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  console.log(isMobile);
  const navRef = useRef(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        isMobileNavOpen &&
        navRef.current &&
        !(navRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsMobileNavOpen(!isMobileNavOpen);
      }
    },
    [isMobileNavOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Nav
      ref={navRef}
      style={{ justifyContent: isMobileNavOpen ? "center" : "space-between" }}
    >
      {!isMobileNavOpen && <Logo href="/">{"<Shubham Dohare/>"}</Logo>}
      {isMobile && !isMobileNavOpen && (
        <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </MobileNavToggle>
      )}

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
          <a href="/">Home</a>
        </NavItem>
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
