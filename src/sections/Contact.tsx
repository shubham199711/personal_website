import styled from "styled-components";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const SectionContainer = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 20px;
  text-align: center;
`;

const SmallTitle = styled.h2`
  color: var(--accent);
  font-family: 'Fira Code', monospace;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
`;

const BigTitle = styled.h2`
  font-size: clamp(40px, 5vw, 60px);
  color: var(--text-primary);
  margin-bottom: 40px;
`;

const AboutDesc = styled.div`
  color: var(--text-secondary);
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  p {
    margin-bottom: 20px;
  }
`;


const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
`;

const ContactCard = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  padding: 30px 20px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: var(--glass-shadow);

  &:hover {
    background: var(--accent-tint);
    border-color: var(--accent);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    
    .icon {
      color: var(--accent);
      transform: scale(1.1);
    }
  }

  .icon {
    font-size: 32px;
    margin-bottom: 15px;
    color: var(--text-secondary);
    transition: all 0.3s ease;
  }

  span {
    font-family: 'Fira Code', monospace;
    font-size: 14px;
  }
`;

const Contact = () => {
  const contacts = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="icon" />,
      link: "https://www.linkedin.com/in/shubham-dohare/",
    },
    {
      name: "LeetCode",
      icon: <SiLeetcode className="icon" />,
      link: "https://leetcode.com/u/sdohare11/",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="icon" />,
      link: "https://www.instagram.com/__i_beast__/",
    },
    {
      name: "Email",
      icon: <FaEnvelope className="icon" />,
      link: "mailto:sdohare11@gmail.com",
    },
  ];

  return (
    <SectionContainer id="contact">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SmallTitle>04. What's Next?</SmallTitle>
        <BigTitle>Get In Touch</BigTitle>

        <AboutDesc>
          <p>
            I'm currently looking for new opportunities, and my inbox is always open.
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </AboutDesc>

        <ContactGrid>
          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {contact.icon}
              <span>{contact.name}</span>
            </ContactCard>
          ))}
        </ContactGrid>
      </motion.div>
    </SectionContainer>
  );
};

export default Contact;
