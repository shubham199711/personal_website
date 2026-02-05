import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Game from "./sections/Game";
import styled from "styled-components";

const MainContainer = styled.main`
  background-color: var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
`;

function App() {
  return (
    <MainContainer>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Game />
      <Contact />
    </MainContainer>
  );
}

export default App;
