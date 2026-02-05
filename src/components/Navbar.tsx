import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Nav = styled(motion.nav) <{ $visible: boolean; $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  background-color: ${props => props.$scrolled ? 'var(--glass-bg)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(12px)' : 'none'};
  box-shadow: ${props => props.$scrolled ? 'var(--glass-shadow)' : 'none'};
  transform: translateY(${props => (props.$visible ? "0" : "-100%")});

  @media (max-width: 768px) {
    padding: 0 25px;
    height: 70px;
  }
`;

const Logo = styled.a`
  font-family: 'Fira Code', monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  z-index: 1001;
  
  &:hover {
    color: var(--accent-tint);
  }
`;

const DesktopLinks = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.li`
  a {
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    color: var(--text-primary);
    position: relative;
    padding: 10px;
    
    &:hover {
      color: var(--accent);
    }

    &::before {
      content: attr(data-index) ".";
      margin-right: 5px;
      color: var(--accent);
      font-size: 0.8rem;
    }
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: var(--accent);
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 75vw;
  max-width: 400px;
  background-color: #112240;
  box-shadow: -10px 0px 30px -15px rgba(2,12,27,0.7);
  padding: 100px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const MobileLink = styled(motion.a)`
  font-family: 'Fira Code', monospace;
  font-size: 1.2rem;
  color: var(--text-primary);
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    color: var(--accent);
  }

  span {
    color: var(--accent);
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 25, 47, 0.7);
  backdrop-filter: blur(2px);
  z-index: 999;
`;

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 70;

      setScrolled(currentScrollPos > 50);
      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const navLinks = [
    { name: "About", url: "#home" },
    { name: "Experience", url: "#experience" },
    { name: "Work", url: "#projects" },
    { name: "Contact", url: "#contact" },
  ];

  return (
    <>
      <Nav $visible={visible} $scrolled={scrolled}>
        <Logo href="#">{"<Shubham />"}</Logo>

        <DesktopLinks>
          {navLinks.map((link, i) => (
            <NavLink key={i}>
              <a href={link.url} data-index={`0${i + 1}`}>
                {link.name}
              </a>
            </NavLink>
          ))}
        </DesktopLinks>

        <MobileMenuToggle onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuToggle>
      </Nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileMenu
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, i) => (
                <MobileLink
                  key={i}
                  href={link.url}
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>0{i + 1}.</span>
                  {link.name}
                </MobileLink>
              ))}
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
