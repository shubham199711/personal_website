import { useRef, useEffect } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let orbs: Orb[] = [];
        let shootingStars: ShootingStar[] = [];

        // Configuration
        const particleCount = 100;
        const orbCount = 5;
        const shootingStarInterval = 200; // Frames between shooting stars
        let frame = 0;

        const connectionDistance = 120;
        const mouseDistance = 200;
        const mouseForce = 2;

        let mouse = { x: -1000, y: -1000 };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        class Orb {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                // Very slow movement
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
                this.size = Math.random() * 150 + 100; // Large 100-250px
                // Violet/Blue/Pink hues
                const hues = ['185, 103, 255', '100, 255, 218', '255, 0, 193'];
                this.color = hues[Math.floor(Math.random() * hues.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce
                if (this.x < -this.size || this.x > canvas!.width + this.size) this.vx *= -1;
                if (this.y < -this.size || this.y > canvas!.height + this.size) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, `rgba(${this.color}, 0.15)`);
                gradient.addColorStop(1, `rgba(${this.color}, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class ShootingStar {
            x: number;
            y: number;
            vx: number;
            vy: number;
            length: number;
            opacity: number;
            active: boolean;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height / 2; // Start in top half
                this.active = true;

                // Shoot diagonally down-right or down-left
                const angle = Math.PI / 4 + (Math.random() - 0.5);
                const speed = Math.random() * 10 + 15;

                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.length = Math.random() * 80 + 20;
                this.opacity = 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.opacity -= 0.02;

                if (this.x > canvas!.width || this.y > canvas!.height || this.opacity <= 0) {
                    this.active = false;
                }
            }

            draw() {
                if (!ctx || !this.active) return;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.lineWidth = 2;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - this.vx * (this.length / 20), this.y - this.vy * (this.length / 20)); // Trail
                ctx.stroke();
            }
        }

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseX: number;
            baseY: number;
            twinkleSpeed: number;
            opacity: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
                // Twinkle
                this.twinkleSpeed = Math.random() * 0.02 + 0.005;
                this.opacity = Math.random();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Twinkle effect
                this.opacity += this.twinkleSpeed;
                if (this.opacity > 1 || this.opacity < 0.2) this.twinkleSpeed *= -1;

                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

                // Mouse Repulsion
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * mouseForce;
                    const directionY = forceDirectionY * force * mouseForce;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(185, 103, 255, ${Math.abs(this.opacity)})`;
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            orbs = [];
            shootingStars = [];

            for (let i = 0; i < particleCount; i++) particles.push(new Particle());
            for (let i = 0; i < orbCount; i++) orbs.push(new Orb());
        };

        const drawLines = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const opacity = 1 - dist / connectionDistance;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(185, 103, 255, ${opacity * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Orbs first (background)
            orbs.forEach(orb => {
                orb.update();
                orb.draw();
            });

            // Draw Particles & Lines
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawLines();

            // Handle Shooting Stars
            if (frame % shootingStarInterval === 0 && Math.random() > 0.5) {
                shootingStars.push(new ShootingStar());
            }

            shootingStars = shootingStars.filter(star => star.active);
            shootingStars.forEach(star => {
                star.update();
                star.draw();
            });

            frame++;
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
};

export default ParticleBackground;
