import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const SectionContainer = styled.section`
  max-width: 1100px; /* Increased from 800px */
  margin: 0 auto;
  padding: 100px 50px;

  @media (max-width: 768px) {
    padding: 80px 25px;
  }
`;

const SectionHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  
  h2 {
    font-size: clamp(30px, 5vw, 40px); /* Increased size */
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
    
    &::before {
      content: "02.";
      position: relative;
      bottom: 4px;
      margin-right: 10px;
      color: var(--accent);
      font-family: 'Fira Code', monospace;
      font-size: clamp(20px, 3vw, 24px); /* Increased size */
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
    background-color: var(--bg-tertiary);

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Tabs = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  
  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: 100%;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--bg-tertiary);
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 42px;
  padding: 0 20px 2px;
  border-left: 2px solid ${props => props.$active ? 'var(--accent)' : 'var(--bg-tertiary)'};
  background-color: ${props => props.$active ? 'var(--bg-tertiary)' : 'transparent'};
  color: ${props => props.$active ? 'var(--accent)' : 'var(--text-secondary)'};
  font-family: 'Fira Code', monospace;
  font-size: 13px;
  text-align: left;
  white-space: nowrap;
  border-top: none;
  border-right: none;
  border-bottom: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);

  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--accent);
  }

  @media (max-width: 600px) {
    border-left: none;
    border-bottom: 2px solid ${props => props.$active ? 'var(--accent)' : 'transparent'};
    background-color: transparent;
    justify-content: center;
    min-width: 120px;
    
    &:hover {
      background-color: transparent;
    }
  }
`;

const Details = styled.div`
  margin-left: 20px;
  
  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const JobTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 24px; /* Increased from 22px */
  font-weight: 500;
  color: var(--text-primary);

  span {
    color: var(--accent);
  }
`;

const JobDates = styled.p`
  margin-bottom: 25px;
  color: var(--text-secondary);
  font-family: 'Fira Code', monospace;
  font-size: 14px; /* Increased from 13px */
`;

const JobDescription = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  
  li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 12px;
    font-size: 17px; /* Increased from 16px */
    color: var(--text-secondary);
    
    &::before {
      content: "▹";
      position: absolute;
      left: 0;
      color: var(--accent);
    }
  }
`;

const experiences = [
  {
    company: "Resilinc",
    role: "Senior Full Stack Engineer",
    dates: "June 2025 - Present",
    desc: [
      "Migrating 70+ microservice from java 8 to java 21 using AI powered tools moved timeline from year to 4 months",
      "Created internal tools for AI agents to get latest and correct version of library in new spring boot",
    ]
  },
  {
    company: "Verantos",
    role: "Senior Software Engineer",
    dates: "2023 - June 2025",
    desc: [
      "Designed and implemented an accuracy system for ML models to monitor AI model improvements.",
      "Developed a system for creating study cohorts and subgroups, improving core application features and reducing query generation time by 5X.",
      "Implemented event-driven architecture for large dataset processing, delivering 20X speed improvement and 10X scalability."
    ]
  },
  {
    company: "Code Vyasa",
    role: "Software Engineer II",
    dates: "2021 - 2023",
    desc: [
      "Led development of 8 backend projects as the backend lead.",
      "Automated CI/CD pipelines with Docker and GitHub Actions.",
      "Defined and enforced coding guidelines for consistency and maintainability."
    ]
  },
  {
    company: "Infielight",
    role: "Founder & CEO",
    dates: "2020 - 2021",
    desc: [
      "Built the 'Micro-habits' app based on the book Atomic Habits, achieving 100k+ downloads and 5k+ daily active users.",
      "Led product development using Flutter for Android and iOS platforms."
    ]
  },
  {
    company: "Sarvaha System",
    role: "Software Engineer",
    dates: "2019 - 2020",
    desc: [
      "Served as a solo front-end engineer using React and SCSS, delivering a high-quality product with positive customer reviews.",
      "Led a front-end team on an Angular/Node.js project, ensuring project success and quality.",
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
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
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
        </Details>
      </ContentContainer>
    </SectionContainer>
  );
};

export default Experience;
