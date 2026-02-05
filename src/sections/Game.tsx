import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GiKatana } from "react-icons/gi";

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
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
`;

const SantoryuIcon = styled.div`
  display: inline-flex;
  position: relative;
  width: 45px;
  height: 45px;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  vertical-align: -20%;

  svg {
    position: absolute;
    color: #2ecc71;
    font-size: 2.2rem;
  }
`;

const QuoteText = styled.p`
  color: #aaa;
  font-size: 1.1rem;
  font-style: italic;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 30px auto;
  line-height: 1.6;
  padding: 0 20px;
`;

const Score = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  font-size: 1.5rem;
  font-family: monospace;
  z-index: 10;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    top: 15px;
    right: 15px;
  }
`;

const CustomCursor = styled(motion.div)`
  position: absolute;
  width: 30px; /* Reduced from 60px */
  height: 30px;
  border-radius: 50%;
  /* background-image: url("/profile.jpeg"); Removed as requested */
  background-color: rgba(0, 243, 255, 0.1);;
  background-position: center;
  pointer-events: none;
  z-index: 20;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
  border: 2px solid #00f3ff;
  
  @media (max-width: 768px) {
    width: 20px; /* Even smaller on mobile */
    height: 20px;
  }
`;

const Bug = styled(motion.div)`
  position: absolute;
  font-size: 40px;
  user-select: none;
  z-index: 15;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Game = () => {
    const containerRef = useRef<HTMLElement>(null);

    // Use refs for positions to avoid re-rendering loop issues
    const mousePosRef = useRef({ x: 0, y: 0 });
    const bugPosRef = useRef({ x: 50, y: 50 }); // Pixels (will init on mount)
    const velocityRef = useRef({ vx: 0, vy: 0 }); // Physics velocity

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

        // Reset velocity on spawn
        velocityRef.current = { vx: 0, vy: 0 };
        return { x, y };
    };

    // Update mouse/touch position
    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        let clientX, clientY;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        mousePosRef.current = { x, y };
        setCursorRenderPos({ x, y });
    };

    const caughtRef = useRef(false); // Ref for immediate logic updates

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
            lastTime = time;

            // Unpack positions
            let { x: currentBugX, y: currentBugY } = bugPosRef.current;
            let { vx, vy } = velocityRef.current;
            const { x: mouseX, y: mouseY } = mousePosRef.current;

            // Calculate distance to cursor
            const dx = currentBugX - mouseX;
            const dy = currentBugY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Settings
            const safeDistance = 350; // Radius where bug gets scared
            const maxSpeed = 12 + (score * 0.5); // Max speed increases with score
            const acceleration = 0.8; // How fast it accelerates away
            const friction = 0.92; // Damping so it doesn't fly off forever

            if (distance < safeDistance && !caughtRef.current) {
                // Run away vector
                const dirX = dx / distance;
                const dirY = dy / distance;

                // Apply force to velocity
                vx += dirX * acceleration;
                vy += dirY * acceleration;
            } else {
                // Jitter / Wander when safe
                if (Math.random() < 0.05) {
                    vx += (Math.random() - 0.5) * 2;
                    vy += (Math.random() - 0.5) * 2;
                }
            }

            // Apply Velocity
            vx *= friction; // Friction
            vy *= friction;

            // Clamp velocity to max speed
            const currentSpeed = Math.sqrt(vx * vx + vy * vy);
            if (currentSpeed > maxSpeed) {
                vx = (vx / currentSpeed) * maxSpeed;
                vy = (vy / currentSpeed) * maxSpeed;
            }

            // Move
            if (!caughtRef.current) {
                currentBugX += vx;
                currentBugY += vy;
            }

            // Wall Bouncing (Elastic Collision)
            const margin = 30;
            if (currentBugX < margin) {
                currentBugX = margin;
                vx = Math.abs(vx) * 0.5; // Bounce back with some loss
            }
            if (currentBugX > rect.width - margin) {
                currentBugX = rect.width - margin;
                vx = -Math.abs(vx) * 0.5;
            }
            if (currentBugY < margin) {
                currentBugY = margin;
                vy = Math.abs(vy) * 0.5;
            }
            if (currentBugY > rect.height - margin) {
                currentBugY = rect.height - margin;
                vy = -Math.abs(vy) * 0.5;
            }

            // Check collision (Catch)
            const catchRadius = 35; // Slightly easier catch radius
            if (distance < catchRadius && !caughtRef.current) {
                caughtRef.current = true; // Immediate update
                setCaught(true); // Visual update
                setSplatPos({ x: currentBugX, y: currentBugY }); // Freeze position for visual
                setScore(s => s + 1);

                setTimeout(() => {
                    caughtRef.current = false;
                    setCaught(false);
                    // Smart Respawn
                    const newPos = spawnBug(rect, mouseX, mouseY);
                    bugPosRef.current = newPos;
                }, 800);
            }

            // Update Refs
            bugPosRef.current = { x: currentBugX, y: currentBugY };
            velocityRef.current = { vx, vy };

            // Update Render State (syncing visuals)
            setBugRenderPos({ x: currentBugX, y: currentBugY });

            animationFrameId = requestAnimationFrame(gameLoop);
        };

        animationFrameId = requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(animationFrameId);
    }, [score]); // Removed caught from dependency as we use Ref

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '50px 0' }}>
            <Title>
                Bug Hunter
                <SantoryuIcon>
                    <GiKatana style={{ transform: 'rotate(0deg)', zIndex: 1 }} />
                    <GiKatana style={{ transform: 'rotate(60deg)' }} />
                    <GiKatana style={{ transform: 'rotate(-60deg)' }} />
                </SantoryuIcon>
            </Title>
            <QuoteText>
                "System Status: Compromised. Initiate Purge."
            </QuoteText>
            <GameSection
                ref={containerRef}
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                style={{ margin: '0 auto', touchAction: 'none' }} // Override margin since wrapper handles spacing
            >
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
        </div>
    );
};

export default Game;
