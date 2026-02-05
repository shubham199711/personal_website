import styled from "styled-components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 100px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 80px 25px;
    min-height: auto;
    display: block; /* Allow natural flow */
  }
`;

const ContentContainer = styled(motion.div)`
  max-width: 1000px;
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const TextContent = styled.div`
  color: var(--text-secondary);
`;

const SectionTitle = styled(motion.h2)`
  display: flex;
  align-items: center;
  font-size: clamp(26px, 5vw, 32px);
  margin-bottom: 40px;
  color: var(--text-primary);
  white-space: nowrap;

  &::after {
    content: "";
    display: block;
    position: relative;
    top: -1px;
    width: 300px;
    height: 1px;
    margin-left: 20px;
    background: var(--glass-border);

    @media (max-width: 768px) {
      width: 100%; /* flexible width on mobile */
      max-width: 100px; /* Limit width so it doesn't push text out */
    }
  }

  span {
    color: var(--accent);
    margin-right: 10px;
    font-family: 'Fira Code', monospace;
    font-size: clamp(20px, 3vw, 24px);
    font-weight: 300;
  }
`;

const Paragraph = styled(motion.p)`
  margin-bottom: 15px;
  font-size: 1.1rem;
  line-height: 1.7;
`;

const TechList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  gap: 0 10px;
  padding: 0;
  margin: 20px 0 0 0;
  overflow: hidden;
  list-style: none;

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* Single column on very small screens */
  }
`;

const TechItem = styled(motion.li)`
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  font-family: 'Fira Code', monospace;
  font-size: 13px;

  &::before {
    content: "▹";
    position: absolute;
    left: 0;
    color: var(--accent);
  }
`;

// 3D Tilt Card Component
const CardWrapper = styled(motion.div)`
  perspective: 1000px;
  width: 100%;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const CardBody = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 350px;
  height: auto;
  aspect-ratio: auto;
  border-radius: 10px;
  background-color: var(--bg-secondary);
  cursor: pointer;
  
  /* Glowing Border Effect */
  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 12px;
    background: linear-gradient(45deg, var(--accent), #ff00c1, #00fff9);
    z-index: -1;
    filter: blur(10px);
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.8;
  }
`;

const Image = styled(motion.img)`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
`;

const About = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const springConfig = { damping: 20, stiffness: 200 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);


  function handleMouse(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    // Calculate mouse position relative to center of card
    x.set(event.clientX - (rect.left + rect.width / 2));
    y.set(event.clientY - (rect.top + rect.height / 2));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <AboutSection id="about">
      <ContentContainer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <TextContent>
          <SectionTitle>
            <span>01.</span> About Me
          </SectionTitle>
          <Paragraph>
            Hello! My name is Shubham and I enjoy building robust systems that power the internet.
            My journey started back in <strong>2019</strong>, and while I began with frontend, I quickly discovered my passion for
            <strong> backend engineering and distributed systems</strong>.
          </Paragraph>
          <Paragraph>
            Fast-forward to today, I've had the privilege of architecting solutions for a
            <strong> HealthTech innovator</strong>, a <strong>Supply Chain risk management firm</strong>, and my own <strong>start-up</strong>.
            My main focus these days is <strong>building scalable, event-driven microservices</strong> and optimizing data processing pipelines.
          </Paragraph>
          <Paragraph>
            Here are a few technologies I've been working with recently:
          </Paragraph>
          <TechList>
            {["Java 21", "Spring Boot", "Microservices", "System Design", "Docker / K8s", "AWS / Cloud"].map((tech, i) => (
              <TechItem key={i}>{tech}</TechItem>
            ))}
          </TechList>
        </TextContent>

        <CardWrapper onMouseMove={handleMouse} onMouseLeave={handleMouseLeave}>
          <CardBody style={{ rotateX: springRotateX, rotateY: springRotateY }}>
            <Image
              src="/IMG_2786.JPG"
              alt="Shubham Dohare"
              style={{ translateZ: 50 }} // Create depth parallax
            />
          </CardBody>
        </CardWrapper>
      </ContentContainer>
    </AboutSection>
  );
};

export default About;
