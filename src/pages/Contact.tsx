import styled from "styled-components";

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 2rem auto;
  max-width: 800px;
  background-color: #1e1e1e;
  color: white;
  @media (max-width: 768px) {
    padding: 5vh 5vw;
  }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.25rem;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0.5rem 0;
  color: white;
`;

const List = styled.ul`
  list-style-type: disc;
  margin: 0.5rem 0 0 1.5rem;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 1rem;
  color: #ddd;
  margin-bottom: 0.5rem;
`;

const Link = styled.a`
  color: #0066cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin: 2rem 0;
  padding-bottom: 0.25rem;
`;

const Contact = () => {
  return (
    <PageContainer>
      <HeaderTitle>Contact Me</HeaderTitle>
      <Section>
        <SectionTitle>Summary</SectionTitle>
        <Paragraph>
          Senior Software Engineer with 5+ years of experience in backend
          development, machine learning, and leading software projects. Skilled
          in designing scalable systems and delivering innovative solutions that
          improve efficiency and client outcomes.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Languages</SectionTitle>
        <List>
          <ListItem>
            <strong>English:</strong> Proficient
          </ListItem>
          <ListItem>
            <strong>Hindi:</strong> Native
          </ListItem>
        </List>
      </Section>
      <Section>
        <SectionTitle>Personal Information</SectionTitle>
        <Paragraph>
          <strong>Name:</strong> Shubham Dohare
        </Paragraph>
        <Paragraph>
          <strong>Location:</strong> Maharashtra, India
        </Paragraph>
        <Paragraph>
          <strong>Phone:</strong> +91 8668437022, +91 9405104910
        </Paragraph>
        <Paragraph>
          <strong>Email:</strong>{" "}
          <Link href="mailto:sdohare11@gmail.com">sdohare11@gmail.com</Link>
        </Paragraph>
        <Paragraph>
          <strong>LinkedIn:</strong>{" "}
          <Link
            href="https://linkedin.com/in/shubham-dohare"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/shubham-dohare
          </Link>
        </Paragraph>
        <Paragraph>
          <strong>Leetcode:</strong>{" "}
          <Link
            href="https://leetcode.com/u/sdohare11/"
            target="_blank"
            rel="noopener noreferrer"
          >
            leetcode.com/u/sdohare11/
          </Link>
        </Paragraph>
        <Paragraph>
          <strong>Github:</strong>{" "}
          <Link
            href="https://github.com/shubham199711"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/shubham199711
          </Link>
        </Paragraph>
      </Section>
    </PageContainer>
  );
};

export default Contact;
