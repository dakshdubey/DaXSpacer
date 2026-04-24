'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    originalX: number;
    originalY: number;
}

export default function ThreeScene() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d')!;
        const mouse = { x: -1000, y: -1000 };
        let width = 0;
        let height = 0;
        let rafId: number;

        const particles: Particle[] = [];

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < 50; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                particles.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    size: Math.random() * 2 + 1,
                    originalX: x,
                    originalY: y,
                });
            }
        };

        const drawGrid = () => {
            const spacing = 100;
            ctx.strokeStyle = 'rgba(255,255,255,0.035)';
            ctx.lineWidth = 1;

            // Vertical lines — distort toward mouse
            for (let x = 0; x < width; x += spacing) {
                ctx.beginPath();
                for (let y = 0; y <= height; y += 20) {
                    const dx = mouse.x - x;
                    const dy = mouse.y - y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const offset = Math.max(0, (300 - dist) / 300) * 30;
                    const drawX = x + (dx / dist) * -offset;
                    if (y === 0) ctx.moveTo(drawX, y);
                    else ctx.lineTo(drawX, y);
                }
                ctx.stroke();
            }

            // Horizontal lines
            for (let y = 0; y < height; y += spacing) {
                ctx.beginPath();
                for (let x = 0; x <= width; x += 20) {
                    const dx = mouse.x - x;
                    const dy = mouse.y - y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const offset = Math.max(0, (300 - dist) / 300) * 30;
                    const drawY = y + (dy / dist) * -offset;
                    if (x === 0) ctx.moveTo(x, drawY);
                    else ctx.lineTo(x, drawY);
                }
                ctx.stroke();
            }
        };

        const animate = () => {
            rafId = requestAnimationFrame(animate);

            // Dark BG fill
            ctx.fillStyle = '#191919';
            ctx.fillRect(0, 0, width, height);

            drawGrid();

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Mouse repulsion
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const force = Math.max(0, (200 - dist) / 200);

                if (dist < 200) {
                    p.x -= (dx / dist) * force * 5;
                    p.y -= (dy / dist) * force * 5;
                }

                // Return to original
                p.x += (p.originalX - p.x) * 0.02;
                p.y += (p.originalY - p.y) * 0.02;

                // Drift
                p.originalX += p.vx;
                p.originalY += p.vy;

                // Wrap
                if (p.originalX < 0) p.originalX = width;
                if (p.originalX > width) p.originalX = 0;
                if (p.originalY < 0) p.originalY = height;
                if (p.originalY > height) p.originalY = 0;

                // Draw dot
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw connecting lines
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dxx = p.x - p2.x;
                    const dyy = p.y - p2.y;
                    const d = Math.sqrt(dxx * dxx + dyy * dyy);
                    if (d < 150) {
                        ctx.strokeStyle = `rgba(255,255,255,${0.12 * (1 - d / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const onResize = () => {
            resize();
        };

        resize();
        init();
        animate();

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ display: 'block', width: '100%', height: '100%' }}
        />
    );
}
