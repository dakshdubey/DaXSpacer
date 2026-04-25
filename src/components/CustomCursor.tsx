'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const follower = followerRef.current;
        if (!follower) return;

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

            // Follower — lerp
            followX += (mouseX - followX) * EASE;
            followY += (mouseY - followY) * EASE;
            follower.style.left = `${followX}px`;
            follower.style.top = `${followY}px`;

            // Hover scale & difference effect
            const scale = isHover ? 2 : 1;
            follower.style.transform = `translate(-50%, -50%) scale(${scale})`;
            // Keep background white so difference mode actually inverts underlying text
            follower.style.background = 'white';
            follower.style.border = 'none';
            // Only apply difference blend mode on hover, or always depending on preference.
            // Let's keep it always on so it blends nicely, but on hover it covers text.
            follower.style.mixBlendMode = 'difference';
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
            <div
                ref={followerRef}
                style={{
                    position: 'fixed',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: 'white',
                    mixBlendMode: 'difference',
                    pointerEvents: 'none',
                    zIndex: 999999,
                    transform: 'translate(-50%, -50%)',
                    transition: 'background 0.2s, border 0.2s, transform 0.2s',
                    willChange: 'left, top, transform',
                }}
            />
        </>
    );
}
