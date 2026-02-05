import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const GameSection = styled.section`
  min-height: 500px;
  width: 60%;
  margin: 50px auto; /* Center horizontally with vertical spacing */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #111;
  position: relative;
  overflow: hidden;
  cursor: none; /* Hide default cursor */
  padding: 20px;
  border: 1px solid #333;
  border-radius: 20px; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);

  @media (max-width: 768px) {
    width: 90%;
    min-height: 400px;
  }
`;

const Title = styled.h2`
  color: #00f3ff;
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  z-index: 10;
  pointer-events: none;
  position: absolute;
  top: 30px;
  left: 30px;
  margin: 0;
`;

const Instruction = styled.p`
  color: #aaa;
  font-size: 1.2rem;
  margin-bottom: 40px;
  z-index: 10;
  pointer-events: none;
`;

const Score = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  font-size: 1.5rem;
  font-family: monospace;
  z-index: 10;
`;

const CustomCursor = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* background-image: url("/profile.jpeg"); Removed as requested */
  background-color: rgba(0, 243, 255, 0.1);;
  background-position: center;
  pointer-events: none;
  z-index: 20;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
  border: 2px solid #00f3ff;
`;

const Bug = styled(motion.div)`
  position: absolute;
  font-size: 40px;
  user-select: none;
  z-index: 15;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
`;

const Game = () => {
    const containerRef = useRef<HTMLElement>(null);

    // Use refs for positions to avoid re-rendering loop issues
    const mousePosRef = useRef({ x: 0, y: 0 });
    const bugPosRef = useRef({ x: 50, y: 50 }); // Pixels (will init on mount)

    // State for rendering
    const [bugRenderPos, setBugRenderPos] = useState({ x: 0, y: 0 });
    const [splatPos, setSplatPos] = useState({ x: 0, y: 0 }); // Fix for jump glitch
    const [cursorRenderPos, setCursorRenderPos] = useState({ x: 0, y: 0 });
    const [score, setScore] = useState(0);
    const [caught, setCaught] = useState(false);

    // Helper to spawn bug away from mouse
    const spawnBug = (rect: DOMRect, mouseX: number, mouseY: number) => {
        let x, y, dist;
        let attempts = 0;
        do {
            x = Math.random() * (rect.width - 100) + 50;
            y = Math.random() * (rect.height - 100) + 50;
            const dx = x - mouseX;
            const dy = y - mouseY;
            dist = Math.sqrt(dx * dx + dy * dy);
            attempts++;
        } while (dist < 200 && attempts < 10); // Retry if too close
        return { x, y };
    };

    // Update mouse position Ref immediately
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mousePosRef.current = { x, y };
        setCursorRenderPos({ x, y });
    };

    // Bug logic
    useEffect(() => {
        let animationFrameId: number;
        let lastTime = 0;

        // Initialize bug position randomly
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const initPos = spawnBug(rect, -999, -999);
            bugPosRef.current = initPos;
        }

        const gameLoop = (time: number) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();

            if (lastTime === 0) {
                lastTime = time;
            }
            // const deltaTime = time - lastTime;
            lastTime = time;

            // Unpack positions
            let { x: currentBugX, y: currentBugY } = bugPosRef.current;
            const { x: mouseX, y: mouseY } = mousePosRef.current;

            // Calculate distance to cursor
            const dx = currentBugX - mouseX;
            const dy = currentBugY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Evasion logic: Harder now
            const safeDistance = 300; // Runs away sooner
            const baseSpeed = 6; // Faster

            const speedMultiplier = 1 + (score * 0.2); // Scales faster (was 0.15)
            const moveSpeed = baseSpeed * speedMultiplier;

            if (distance < safeDistance && !caught) {
                // Normalize vector (run away)
                const vx = dx / distance;
                const vy = dy / distance;

                // Move
                currentBugX += vx * moveSpeed;
                currentBugY += vy * moveSpeed;

                // Wall Evasion / Bouncing
                const margin = 40;
                if (currentBugX < margin) currentBugX = margin;
                if (currentBugX > rect.width - margin) currentBugX = rect.width - margin;
                if (currentBugY < margin) currentBugY = margin;
                if (currentBugY > rect.height - margin) currentBugY = rect.height - margin;

            } else if (!caught) {
                // Jitter / Wander when safe
                currentBugX += (Math.random() - 0.5) * 5; // More jitter
                currentBugY += (Math.random() - 0.5) * 5;
            }

            // Check collision (Catch) - Harder
            if (distance < 30 && !caught) {
                setCaught(true);
                setSplatPos({ x: currentBugX, y: currentBugY }); // Freeze position for visual
                setScore(s => s + 1);

                setTimeout(() => {
                    setCaught(false);
                    // Smart Respawn
                    const newPos = spawnBug(rect, mouseX, mouseY);
                    bugPosRef.current = newPos;
                }, 800);
            }

            // Update Ref
            bugPosRef.current = { x: currentBugX, y: currentBugY };

            // Update Render State (syncing visuals)
            setBugRenderPos({ x: currentBugX, y: currentBugY });

            animationFrameId = requestAnimationFrame(gameLoop);
        };

        animationFrameId = requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(animationFrameId);
    }, [score, caught]); // Re-run loop when score/caught changes is okay/safe

    return (
        <GameSection ref={containerRef} onMouseMove={handleMouseMove}>
            <Title>Bug Hunter</Title>
            <Instruction style={{ opacity: score > 2 ? 0 : 1, transition: 'opacity 0.5s' }}>
                Your cursor is YOU. Chase the bug! 🪳
            </Instruction>
            <Score>Score: {score}</Score>

            <CustomCursor
                style={{
                    left: cursorRenderPos.x,
                    top: cursorRenderPos.y,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            />

            <Bug
                animate={{
                    left: caught ? splatPos.x : bugRenderPos.x,
                    top: caught ? splatPos.y : bugRenderPos.y,
                    rotate: caught ? 720 : 0,
                    scale: caught ? 2 : 1,
                }}
                // Using tween for smoother continuous movement updates
                transition={{ type: "tween", ease: "linear", duration: 0 }}
                style={{
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                {caught ? "💥" : "🪳"}
            </Bug>
        </GameSection>
    );
};

export default Game;
