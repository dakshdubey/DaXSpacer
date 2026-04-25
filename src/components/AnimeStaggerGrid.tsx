'use client';

import { useEffect, useState, useRef } from 'react';
import { animate, stagger } from 'animejs';

export default function AnimeStaggerGrid({ entered }: { entered: boolean }) {
    const [grid, setGrid] = useState({ columns: 0, rows: 0, total: 0 });
    const [isRendered, setIsRendered] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            const size = window.innerWidth < 768 ? 40 : 60; // Base size of the block
            const columns = Math.ceil(window.innerWidth / size);
            const rows = Math.ceil(window.innerHeight / size);
            setGrid({
                columns,
                rows,
                total: columns * rows
            });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (entered && grid.total > 0) {
            // 3D Stagger animation a la animejs homepage
            animate('.stagger-block', {
                scale: [
                    { value: 0.1, easing: 'easeOutSine', duration: 400 },
                    { value: 0, easing: 'easeInOutQuad', duration: 800 }
                ],
                opacity: [1, 0],
                rotateZ: stagger([-45, 45], { grid: [grid.columns, grid.rows], from: 'center' }),
                rotateX: stagger([0, 90], { grid: [grid.columns, grid.rows], from: 'center' }),
                translateZ: stagger([0, 200], { grid: [grid.columns, grid.rows], from: 'center' }),
                delay: stagger(40, {
                    grid: [grid.columns, grid.rows],
                    from: 'center'
                }),
                easing: 'easeInOutExpo',
                complete: () => {
                    setIsRendered(false);
                }
            });
        }
    }, [entered, grid]);

    if (!isRendered || grid.total === 0) return null;

    return (
        <div
            className="fixed inset-0 z-[90] flex flex-wrap pointer-events-none"
            style={{ overflow: 'hidden', perspective: '1000px', backgroundColor: entered ? 'transparent' : 'var(--background)' }}
        >
            {Array.from({ length: grid.total }).map((_, i) => (
                <div
                    key={i}
                    className="stagger-block pointer-events-none"
                    style={{
                        width: `calc(100vw / ${grid.columns})`,
                        height: `calc(100vh / ${grid.rows})`,
                        backgroundColor: 'var(--background)',
                        border: '0.5px solid rgba(255,255,255,0.02)',
                        transformOrigin: '50% 50%',
                    }}
                />
            ))}
        </div>
    );
}
