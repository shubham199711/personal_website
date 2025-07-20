import styled from "styled-components";

const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 150px;
  background-color: #1e1e1e !important;
  color: white;
  height: 100%;
  font-family: Arial, sans-serif;
  @media (max-width: 768px) {
    padding: 5vh 5vw;
  }
`;

const ResumeTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin: 0;
  width: 200px;
`;

const WorkExperience = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Job = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const JobYear = styled.div`
  align-items: center;
  font-size: 0.9rem;
  width: 108px;
  font-weight: 100;
`;

const JobTitle = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: bold;
`;

const JobHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const JobDescription = styled.p`
  font-size: 1rem;
  margin: 0 0 0 118px;
  line-height: 1.5;
  width: 400px;
  ul {
    padding: 0 0 0 14px;
  }
  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
    li {
      overflow-wrap: anywhere;
    }
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #333;
  margin: 70px 0;
`;

const CompanyName = styled.div`
  margin-left: 118px;
  font-style: italic;
  color: #aaa;
  font-size: 0.95rem;
  text-align: left;
  @media (max-width: 768px) {
    margin-left: 0;
    text-align: left;
  }
`;

const JobComponent = ({
  startYear,
  endYear,
  title,
  company,
  descriptions,
}: {
  startYear: string;
  endYear: string;
  title: string;
  company: string;
  descriptions: string[];
}) => (
  <Job>
    <JobHeader>
      <JobYear>
        <span>
          {startYear} - {endYear}
        </span>
      </JobYear>
      <JobTitle>
        <span>{title}</span>
      </JobTitle>
    </JobHeader>
    <CompanyName>{company}</CompanyName>
    <JobDescription>
      <ul>
        {descriptions.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
    </JobDescription>
  </Job>
);

const Resume = () => {
  return (
    <ResumeContainer>
      <ResumeTitle>Resume</ResumeTitle>
      <Section>
        <SectionTitle>Work Experience</SectionTitle>
        <WorkExperience>
          <JobComponent
            startYear="June 2025"
            endYear="Present"
            title="Senior Full Stack Engineer - AI solutions"
            company="Resilinc"
            descriptions={[
              "Migrating 70+ microservice from java 8 to java 21 using AI powered tools moved timeline from year to 4 months",
              "Created internal tools for AI agents to get latest and correct version of library in new spring boot",
              "Improved security of all microservices to be ready for .GOV environment.",
            ]}
          />

          <JobComponent
            startYear="2023"
            endYear="June 2025"
            title="Senior Software Engineer"
            company="Verantos"
            descriptions={[
              "Designed and implemented an accuracy system for ML models to monitor AI model improvements.",
              "Developed a system for creating study cohorts and subgroups, improving core application features and reducing query generation time by 5X.",
              "Implemented event-driven architecture for large dataset processing, delivering 20X speed improvement and 10X scalability.",
              "Created multi-tenant architecture for the application.",
            ]}
          />

          <JobComponent
            startYear="2021"
            endYear="2023"
            title="Software Engineer II"
            company="Code Vyasa"
            descriptions={[
              "Led development of 8 backend projects as the backend lead.",
              "Automated CI/CD pipelines with Docker and GitHub Actions.",
              "Defined and enforced coding guidelines for consistency and maintainability.",
              "Ensured on-time project deliveries and client satisfaction.",
            ]}
          />

          <JobComponent
            startYear="2020"
            endYear="2021"
            title="Founder & CEO"
            company="Infielight"
            descriptions={[
              "Built the 'Micro-habits' app based on the book Atomic Habits, achieving 100k+ downloads and 5k+ daily active users.",
              "Led product development using Flutter for Android and iOS platforms.",
            ]}
          />

          <JobComponent
            startYear="2019"
            endYear="2020"
            title="Software Engineer"
            company="Sarvaha System"
            descriptions={[
              "Served as a solo front-end engineer using React and SCSS, delivering a high-quality product with positive customer reviews.",
              "Led a front-end team on an Angular/Node.js project, ensuring project success and quality.",
            ]}
          />
        </WorkExperience>
      </Section>
      <Divider />
      <Section>
        <SectionTitle>Education</SectionTitle>
        <WorkExperience>
          <JobComponent
            startYear="2015"
            endYear="2019"
            title="Bachelor's in Computer Science Engineering"
            company="P.R. Patil College of Engineering, Maharashtra, India"
            descriptions={[
              "Graduated from P.R. Patil College of Engineering, Maharashtra, India.",
              "Gained foundational knowledge in software development, data structures, and algorithms.",
              "Won 1st Prize in College Project Competition for an ML project predicting sentiment using Amazon product reviews.",
            ]}
          />
        </WorkExperience>
      </Section>
      <Divider />
      <Section>
        <SectionTitle>Skills</SectionTitle>
        <WorkExperience>
          <JobComponent
            startYear="2015"
            endYear="Present"
            title="Skills"
            company=""
            descriptions={[
              "Programming Languages: Python, Java, Golang, JavaScript, TypeScript",
              "Frontend: React, Angular, Flutter, SCSS",
              "Backend: FastAPI, Spring Boot, Node.js, Socket.io",
              "Cloud Platforms: AWS, Azure, GCP",
              "Database: MongoDB, MySQL, PostgreSQL, Snowflake, Redis",
              "DevOps: Docker, Docker Compose, CI/CD with GitHub Actions, Nix-shell",
              "Machine Learning: Deep Learning, Sentiment Analysis",
              "Other Tools: Git, GitHub, NX, Linux",
            ]}
          />
        </WorkExperience>
      </Section>
      <Divider />
      <Section>
        <SectionTitle>Achievements</SectionTitle>
        <WorkExperience>
          <JobComponent
            startYear="2015"
            endYear="Present"
            title="Achievements"
            company=""
            descriptions={[
              "Solved 500+ problems on LeetCode, demonstrating strong proficiency in problem-solving, data structures, and algorithms.",
              "Successfully developed and delivered multiple projects on time while leading teams and ensuring client satisfaction.",
              "Won 1st Prize in College Project Competition for an ML project predicting sentiment using Amazon product reviews.",
              "Developed 'Micro-habits' app with 100k+ downloads and 5k+ daily active users.",
              "Designed and implemented scalable systems delivering speed and efficiency improvements of up to 20X.",
            ]}
          />
        </WorkExperience>
      </Section>
    </ResumeContainer>
  );
};

export default Resume;
