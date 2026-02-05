import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SectionContainer = styled.section`
  max-width: 1200px; /* Significantly wider */
  margin: 0 auto;
  padding: 150px 50px;
  
  @media (max-width: 768px) {
    padding: 100px 25px;
  }
`;

const SectionHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 70px;
  
  h2 {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    
    &::before {
      content: "02.";
      margin-right: 15px;
      color: var(--accent);
      font-family: 'Fira Code', monospace;
      font-size: clamp(24px, 3vw, 32px);
      font-weight: 400;
    }
  }
  
  &::after {
    content: "";
    flex-grow: 1; /* Take up remaining space */
    height: 1px;
    margin-left: 30px;
    background-color: var(--glass-border);
    max-width: 400px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 50px;
  min-height: 400px;
  
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const Tabs = styled.div`
  position: relative;
  width: 250px;
  flex-shrink: 0;
  
  @media (max-width: 700px) {
    width: 100%;
    display: flex;
    overflow-x: auto;
    padding-bottom: 2px;
    border-bottom: 2px solid var(--bg-tertiary);
  }
`;

// Glassmorphism styled active tab indicator
const ActiveIndicator = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 110%; /* Slightly wider than tabs */
  height: 50px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  z-index: 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  
  @media (max-width: 700px) {
    display: none; /* Hide custom indicator on mobile for simplicity, use border-bottom */
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 25px;
  background-color: transparent;
  color: ${props => props.$active ? 'var(--accent)' : 'var(--text-secondary)'};
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  text-align: left;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1; /* Above indicator */
  transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);

  &:hover {
    color: var(--accent);
  }

  @media (max-width: 700px) {
    padding: 0 20px;
    height: 42px;
    white-space: nowrap;
    width: auto;
    border-bottom: 2px solid ${props => props.$active ? 'var(--accent)' : 'transparent'};
    color: ${props => props.$active ? 'var(--accent)' : 'var(--text-secondary)'};
  }
`;

const Details = styled.div`
  flex-grow: 1;
`;

const JobTitle = styled(motion.h3)`
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);

  span {
    color: var(--accent);
  }
`;

const JobDates = styled(motion.p)`
  margin-bottom: 30px;
  color: var(--text-secondary);
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  letter-spacing: 0.5px;
`;

const JobDescription = styled(motion.ul)`
  padding: 0;
  margin: 0;
  list-style: none;
  
  li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 15px;
    font-size: 18px;
    color: var(--text-secondary);
    line-height: 1.6;
    
    &::before {
      content: "▹";
      position: absolute;
      left: 0;
      color: var(--accent);
      font-size: 20px;
    }
  }
`;

const experiences = [
  {
    company: "Resilinc",
    role: "Senior Full Stack Engineer",
    dates: "June 2025 - Present",
    desc: [
      "Migrating 70+ microservices from Java 8 to Java 21 using AI powered tools, accelerating timeline from 1 year to 4 months.",
      "Created internal tools for AI agents to automatically resolve dependency conflicts and verify library versions in Spring Boot.",
    ]
  },
  {
    company: "Verantos",
    role: "Senior Software Engineer",
    dates: "2023 - June 2025",
    desc: [
      "Designed and implemented an accuracy tracking system for ML models to monitor performance improvements over time.",
      "Developed a cohort creation system for clinical studies, reducing query generation time by 5X.",
      "Implemented event-driven architecture for large dataset processing, delivering 20X speed improvement and 10X scalability."
    ]
  },
  {
    company: "Code Vyasa",
    role: "Software Engineer II",
    dates: "2021 - 2023",
    desc: [
      "Led development of 8 backend projects as the technical lead.",
      "Automated complete CI/CD pipelines using Docker and GitHub Actions.",
      "Defined and enforced coding guidelines for consistency and maintainability across teams."
    ]
  },
  {
    company: "Infielight",
    role: "Founder & CEO",
    dates: "2020 - 2021",
    desc: [
      "Built the 'Micro-habits' app based on Atomic Habits, achieving 100k+ downloads and 5k+ daily active users.",
      "Led full-cycle product development using Flutter for cross-platform deployment."
    ]
  },
  {
    company: "Sarvaha System",
    role: "Software Engineer",
    dates: "2019 - 2020",
    desc: [
      "Served as solo front-end engineer using React and SCSS, delivering a high-quality product.",
      "Led a front-end team on an Angular/Node.js project, ensuring successful delivery."
    ]
  }
];

const Experience = () => {
  const [activeTabId, setActiveTabId] = useState(0);

  return (
    <SectionContainer id="experience">
      <SectionHeader
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Where I've Worked</h2>
      </SectionHeader>

      <ContentContainer>
        <Tabs>
          {/* Animated Background Indicator for Desktop */}
          <ActiveIndicator
            layoutId="activeTabIndicator"
            initial={false}
            animate={{ y: activeTabId * 50 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />

          {experiences.map((exp, i) => (
            <TabButton
              key={i}
              onClick={() => setActiveTabId(i)}
              $active={activeTabId === i}
            >
              {exp.company}
            </TabButton>
          ))}
        </Tabs>

        <Details>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <JobTitle>
                {experiences[activeTabId].role} <span>@ {experiences[activeTabId].company}</span>
              </JobTitle>
              <JobDates>{experiences[activeTabId].dates}</JobDates>
              <JobDescription>
                {experiences[activeTabId].desc.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </JobDescription>
            </motion.div>
          </AnimatePresence>
        </Details>
      </ContentContainer>
    </SectionContainer>
  );
};

export default Experience;
