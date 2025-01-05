import styled from "styled-components";

const ProjectsContainer = styled.div`
  background-color: #121212;
  color: white;
  padding: 20px;
  font-family: Arial, sans-serif;
  padding: 50px 120px;

  @media (max-width: 768px) {
    padding: 5vh 5vw;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Project = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    margin-top: 40px;
  }
`;

const ProjectContent = styled.div`
  flex: 1;
  padding-right: 20px;

  @media (max-width: 768px) {
    padding-right: 0;
    text-align: left;
    margin-bottom: 20px;
    word-wrap: break-word;
    overflow-wrap: anywhere;
  }
`;

const ProjectTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ProjectDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const ProjectImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 8px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProjectLink = styled.a`
  margin-top: 10px;
  color: white;
`;

const ProjectCard = ({
  title,
  description,
  imageSrc,
  imageAlt,
  link,
}: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link?: string;
}) => {
  return (
    <Project>
      <ProjectContent>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectDescription>{description}</ProjectDescription>
        {link && (
          <ProjectLink href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </ProjectLink>
        )}
      </ProjectContent>
      <ProjectImage src={imageSrc} alt={imageAlt} />
    </Project>
  );
};

const projects = [
  {
    title: "Code Type",
    description:
      "A website where programmers can practice typing code faster and remember codes",
    imageSrc: "/type_code.png",
    imageAlt: "Code Type",
    link: "https://type-code-ten.vercel.app/",
  },
  {
    title: "Sentiment Analysis",
    description:
      "Won 1st Prize in College Project Competition with an ML project using Amazon product review comments as a dataset to predict comment sentiment.",
    imageSrc: "/samantic.jpg",
    imageAlt: "Sentiment Analysis",
  },
  {
    title: "One Link",
    description:
      "A project developed using React and Golang to create a single link for Android and Apple stores that redirects users based on their device.",
    imageSrc: "/one_link.png",
    imageAlt: "One Link",
    link: "https://github.com/shubham199711/one_link",
  },
  {
    title: "Hacking TCC",
    description:
      "Developed a patch for the TCC compiler, simplifying C programming by enabling automatic struct dereferencing.",
    imageSrc: "hacking_tcc.jpeg",
    imageAlt: "Hacking TCC",
    link: "https://github.com/shubham199711/hacking_tcc_for_auto_def_on_struct",
  },
];

const Projects = () => {
  return (
    <ProjectsContainer>
      <Title>Projects</Title>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          imageSrc={project.imageSrc}
          imageAlt={project.imageAlt}
          link={project.link}
        />
      ))}
    </ProjectsContainer>
  );
};

export default Projects;
