import styled from "styled-components";
import { motion } from "framer-motion";

const SectionContainer = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 50px;

  @media (max-width: 768px) {
    padding: 80px 25px;
  }
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 50px;
  
  h2 {
    font-size: clamp(26px, 5vw, 32px);
    color: var(--text-primary);
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const SkillCard = styled(motion.div)`
  background: var(--bg-secondary);
  padding: 20px;
  border-radius: 4px;
  border: 1px solid var(--bg-primary);
  
  &:hover {
    border-color: var(--accent);
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
`;

const SkillTitle = styled.h3`
  color: var(--accent);
  margin-bottom: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 16px;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    color: var(--text-secondary);
    font-size: 14px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    
    &::before {
      content: "▹";
      color: var(--accent);
      margin-right: 8px;
    }
  }
`;

const skillsData = [
  {
    category: "Languages",
    items: ["Python", "Java", "Golang", "JavaScript", "TypeScript"]
  },
  {
    category: "Frontend",
    items: ["React", "Angular", "Flutter", "SCSS", "Styled Components"]
  },
  {
    category: "Backend",
    items: ["FastAPI", "Spring Boot", "Node.js", "Socket.io", "Express"]
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "GitHub Actions"]
  },
  {
    category: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Snowflake", "Redis"]
  },
  {
    category: "Machine Learning",
    items: ["Deep Learning", "NLP", "TensorFlow", "PyTorch"]
  }
];

const Skills = () => {
  return (
    <SectionContainer id="skills">
      <SectionHeader
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Technical Skills</h2>
      </SectionHeader>

      <SkillsGrid>
        {skillsData.map((group, index) => (
          <SkillCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <SkillTitle>{group.category}</SkillTitle>
            <SkillList>
              {group.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </SkillList>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SectionContainer>
  );
};

export default Skills;
