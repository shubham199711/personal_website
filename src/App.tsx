import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Leetcode from "./pages/Leetcode";
import Resume from "./pages/Resume";
import Project from "./pages/Project";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/leetcode" element={<Leetcode />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project" element={<Project />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
