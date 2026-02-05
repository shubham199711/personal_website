import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, Variants } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import ParticleBackground from "../components/ParticleBackground";
import GlitchText from "../components/GlitchText";
import MagneticWrapper from "../components/MagneticWrapper";
import Typewriter from "../components/Typewriter";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 50px;
  position: relative;
  
  /* Animated background glow */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(185, 103, 255, 0.05) 0%, rgba(15, 12, 41, 0) 70%);
    z-index: -1;
    filter: blur(80px);
    opacity: 0.6;
    animation: ${gradientAnimation} 20s ease infinite;
  }

  @media (max-width: 768px) {
    padding: 0 25px;
    align-items: flex-start;
  }
`;

const Spotlight = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(600px circle at var(--x) var(--y), rgba(185, 103, 255, 0.07), transparent 40%);
`;

const TextBackdrop = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(ellipse at center, rgba(185, 103, 255, 0.15) 0%, rgba(15, 12, 41, 0) 70%);
  z-index: -1;
  filter: blur(60px);
  pointer-events: none;
`;

const HiText = styled(motion.h1)`
  color: var(--accent);
  font-family: 'Fira Code', monospace;
  font-size: clamp(14px, 5vw, 16px);
  font-weight: 400;
  margin: 0 0 20px 4px;
`;

const NameTextContainer = styled(motion.div)`
  font-size: clamp(40px, 8vw, 80px);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.1;
  margin: 0;
  letter-spacing: -1px;
`;

const RoleText = styled(motion.h3)`
  font-size: clamp(40px, 8vw, 80px);
  font-weight: 800;
  color: var(--text-secondary);
  line-height: 1.1;
  margin-top: 5px;
  margin-bottom: 20px;
  letter-spacing: -1px;
  
  /* Gradient Text Effect */
  background: linear-gradient(90deg, #e0e6ed 0%, #b967ff 50%, #00fff9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: shimmer 5s linear infinite;

  @keyframes shimmer {
    to {
      background-position: 200% center;
    }
  }
`;

const Description = styled(motion.p)`
  margin: 20px 0 0;
  max-width: 540px;
  font-size: 1.1rem;
  color: var(--text-tertiary);
  line-height: 1.6;
`;

const CTAButton = styled(motion.a)`
  color: var(--accent);
  background-color: transparent;
  border: 1px solid var(--accent);
  border-radius: 4px;
  padding: 1.25rem 1.75rem;
  font-size: 14px;
  font-family: 'Fira Code', monospace;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  margin-top: 50px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  z-index: 5;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: var(--accent-hover);
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    z-index: -1;
  }

  &:hover {
    box-shadow: 0 0 20px var(--accent-tint);
    &::before {
      width: 100%;
    }
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-secondary);
  font-size: 24px;
  cursor: pointer;
  z-index: 5;
  
  &:hover {
    color: var(--accent);
  }
`;

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1]
    }
  }
};

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove as any);
    return () => window.removeEventListener('mousemove', handleMouseMove as any);
  }, []);

  return (
    <>
      <Spotlight style={{ '--x': `${mousePos.x}px`, '--y': `${mousePos.y}px` } as any} />
      <HeroSection id="home">
        <ParticleBackground />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ zIndex: 1, position: 'relative' }}
        >
          <TextBackdrop
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <HiText variants={itemVariants}>
            <Typewriter text="Hi, my name is" delay={500} speed={80} />
          </HiText>

          <NameTextContainer variants={itemVariants}>
            <GlitchText text="Shubham Dohare." />
          </NameTextContainer>

          <RoleText variants={itemVariants}>
            I build things for the web.
          </RoleText>
          <Description variants={itemVariants}>
            I'm a software engineer specializing in <strong>backend systems and scalable architecture</strong>. Currently, I'm focused on <strong>migrating legacy monoliths to modern microservices and building high-performance data pipelines</strong>.
          </Description>

          <motion.div variants={itemVariants}>
            <MagneticWrapper strength={0.3}>
              <CTAButton
                href="#projects"
                whileTap={{ scale: 0.95 }}
              >
                Check out my work!
              </CTAButton>
            </MagneticWrapper>
          </motion.div>
        </motion.div>

        <ScrollIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            delay: 1.5,
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <MagneticWrapper strength={0.5}>
            <a href="#about" style={{ color: 'inherit', display: 'block', padding: '10px' }}>
              <FiArrowDown />
            </a>
          </MagneticWrapper>
        </ScrollIndicator>
      </HeroSection >
    </>
  );
};

export default Hero;
