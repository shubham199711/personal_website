import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const glitchAnim = keyframes`
  0% {
    clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    transform: translate(0, 0);
  }
  2% {
    clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
    transform: translate(-5px, 0);
  }
  6% {
    clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
    transform: translate(5px, 0);
  }
  8% {
    clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
    transform: translate(-5px, 0);
  }
  9% {
    clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
    transform: translate(0, 0);
  }
  10% {
    clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
    transform: translate(-5px, 0);
  }
  13% {
    clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
    transform: translate(0, 0);
  }
  13.1% {
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    transform: translate(0, 0);
  }
  100% {
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    transform: translate(0, 0);
  }
`;

const GlitchWrapper = styled(motion.div)`
  position: relative;
  display: inline-block;
  color: var(--text-primary);
  
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-primary);
  }

  &::before {
    left: 2px;
    text-shadow: -1px 0 #ff00c1;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    animation: ${glitchAnim} 3s infinite linear alternate-reverse;
  }

  &::after {
    left: -2px;
    text-shadow: -1px 0 #00fff9;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    animation: ${glitchAnim} 2s infinite linear alternate-reverse;
  }
`;

interface GlitchTextProps {
    text: string;
    as?: any; // To allow using as h1, h2, etc.
    className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, as = "div", className }) => {
    return (
        <GlitchWrapper as={as} data-text={text} className={className}>
            {text}
        </GlitchWrapper>
    );
};

export default GlitchText;
