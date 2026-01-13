'use client';

import { useEffect, useRef } from 'react';

interface ConfettiProps {
    trigger: boolean;
}

export default function Confetti({ trigger }: ConfettiProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!trigger || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Confetti particles
        const particles: {
            x: number;
            y: number;
            vx: number;
            vy: number;
            color: string;
            size: number;
            rotation: number;
            rotationSpeed: number;
        }[] = [];

        const colors = [
            '#0ea5e9', // ocean-500
            '#38bdf8', // ocean-400
            '#7dd3fc', // ocean-300
            '#fef08a', // sand-200
            '#f43f5e', // coral-500
            '#ffffff',
        ];

        // Create particles
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -20 - Math.random() * 100,
                vx: (Math.random() - 0.5) * 8,
                vy: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 10 + 5,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
            });
        }

        let animationId: number;
        const gravity = 0.1;
        const friction = 0.99;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let activeParticles = 0;

            particles.forEach((p) => {
                if (p.y < canvas.height + 50) {
                    activeParticles++;

                    // Update physics
                    p.vy += gravity;
                    p.vx *= friction;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.rotation += p.rotationSpeed;

                    // Draw particle
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
                    ctx.restore();
                }
            });

            if (activeParticles > 0) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [trigger]);

    if (!trigger) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            aria-hidden="true"
        />
    );
}
