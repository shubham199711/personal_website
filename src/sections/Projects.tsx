import styled from "styled-components";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiFolder } from "react-icons/fi";


const SectionContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 150px 50px;

  @media (max-width: 768px) {
    padding: 100px 25px;
  }
`;

const SectionHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 80px;
  
  h2 {
    font-size: clamp(30px, 5vw, 40px);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
    
    &::before {
      content: "03.";
      position: relative;
      bottom: 4px;
      margin-right: 10px;
      color: var(--accent);
      font-family: 'Fira Code', monospace;
      font-size: clamp(20px, 3vw, 24px);
      font-weight: 400;
    }
  }

  &::after {
    content: "";
    display: block;
    position: relative;
    top: -5px;
    width: 300px;
    height: 1px;
    margin-left: 20px;
    background-color: #233554;

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  position: relative;
`;

const ProjectCard = styled(motion.div)`
  background-color: rgba(17, 34, 64, 0.7); /* Glass-like opacity */
  backdrop-filter: blur(10px);
  padding: 2.5rem 2rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px -15px rgba(2, 12, 27, 0.7);
    border-color: var(--accent);
    
    h3 {
      color: var(--accent);
    }
    
    .folder {
      color: var(--accent);
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  
  .folder {
    color: var(--accent);
    transition: all 0.25s ease;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  margin-right: -10px;
  color: var(--text-secondary);

  a {
    padding: 5px 10px;
    
    &:hover {
      color: var(--accent);
    }
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 15px;
  font-size: 24px;
  color: var(--text-primary);
  transition: all 0.25s ease;
`;

const CardDescription = styled.div`
  color: var(--text-secondary);
  font-size: 17px;
  margin-bottom: 25px;
  line-height: 1.7;
`;

const TechList = styled.ul`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;
  gap: 10px; /* Use gap instead of margin-right */

  li {
    font-family: 'Fira Code', monospace;
    font-size: 13px;
    color: var(--accent); /* Highlight tech stack */
    line-height: 1.75;
  }
`;

const projects = [
  {
    title: "Code Type",
    description: "A website where programmers can practice typing code faster and remember syntax.",
    tech: ["React", "Typescript", "Vite"],
    link: "https://type-code-ten.vercel.app/",
    github: ""
  },
  {
    title: "One Link",
    description: "React and Golang project to create a single link for Android and Apple stores with device redirection.",
    tech: ["React", "Golang", "AWS"],
    link: "https://github.com/shubham199711/one_link",
    github: "https://github.com/shubham199711/one_link"
  },
  {
    title: "Hacking TCC",
    description: "Patch for TCC compiler enabling automatic struct dereferencing in C.",
    tech: ["C", "Compiler Design"],
    link: "https://github.com/shubham199711/hacking_tcc_for_auto_def_on_struct",
    github: "https://github.com/shubham199711/hacking_tcc_for_auto_def_on_struct"
  },
  {
    title: "Sentiment Analysis",
    description: "ML project using Amazon product review comments as a dataset to predict comment sentiment.",
    tech: ["Python", "Machine Learning"],
    link: "",
    github: ""
  }
];

const Projects = () => {
  return (
    <SectionContainer id="projects">
      <SectionHeader
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Featured Projects</h2>
      </SectionHeader>

      <Grid>
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <header>
              <CardHeader>
                <div className="folder">
                  <FiFolder size={45} />
                </div>
                <Links>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <FiGithub />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer">
                      <FiExternalLink />
                    </a>
                  )}
                </Links>
              </CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>
                <p>{project.description}</p>
              </CardDescription>
            </header>
            <footer>
              <TechList>
                {project.tech.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </TechList>
            </footer>
          </ProjectCard>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default Projects;
