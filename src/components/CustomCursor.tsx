'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const followerRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const follower = followerRef.current;
        const dot = dotRef.current;
        if (!follower || !dot) return;

        let mouseX = -100, mouseY = -100;
        let followX = -100, followY = -100;
        let rafId: number;
        let isHover = false;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onOver = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            if (el.closest('a, button, .program-card, [role="button"]')) {
                isHover = true;
            }
        };

        const onOut = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            if (el.closest('a, button, .program-card, [role="button"]')) {
                isHover = false;
            }
        };

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout', onOut);

        // ease factor matches GSAP power2.out ~0.5s lag
        const EASE = 0.08;

        const loop = () => {
            rafId = requestAnimationFrame(loop);

            // Dot — instant
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;

            // Follower — lerp
            followX += (mouseX - followX) * EASE;
            followY += (mouseY - followY) * EASE;
            follower.style.left = `${followX}px`;
            follower.style.top = `${followY}px`;

            // Hover scale
            const scale = isHover ? 3 : 1;
            follower.style.transform = `translate(-50%, -50%) scale(${scale})`;
            follower.style.background = isHover ? 'rgba(255,255,255,0.1)' : 'white';
            follower.style.border = isHover ? '1px solid white' : 'none';
        };
        loop();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
        };
    }, []);

    return (
        <>
            {/* Follower — white filled circle, lerps behind */}
            <div
                ref={followerRef}
                style={{
                    position: 'fixed',
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'white',
                    pointerEvents: 'none',
                    zIndex: 999999,
                    transform: 'translate(-50%, -50%)',
                    transition: 'background 0.2s, border 0.2s',
                    willChange: 'left, top, transform',
                }}
            />
            {/* Dot — snaps instantly */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.8)',
                    pointerEvents: 'none',
                    zIndex: 9999999,
                    transform: 'translate(-50%, -50%)',
                    willChange: 'left, top',
                }}
            />
        </>
    );
}
