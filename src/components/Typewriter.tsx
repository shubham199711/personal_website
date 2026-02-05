import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: var(--accent);
  margin-left: 2px;
  vertical-align: middle;
  animation: ${blink} 1s step-end infinite;
`;

interface TypewriterProps {
    text: string;
    delay?: number;
    speed?: number;
}

const Typewriter = ({ text, delay = 0, speed = 50 }: TypewriterProps) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startTyping, setStartTyping] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStartTyping(true);
        }, delay);

        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!startTyping) return;

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, startTyping, text, speed]);

    return (
        <span>
            {displayText}
            <Cursor />
        </span>
    );
};

export default Typewriter;
