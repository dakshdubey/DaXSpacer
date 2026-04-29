'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { animate, stagger } from 'animejs';

export default function TransitionOverlay() {
    const [hoveredZone, setHoveredZone] = useState<'DA' | 'SPACER' | null>(null);
    const [selected, setSelected] = useState<'DA' | 'SPACER' | null>(null);

    useEffect(() => {
        if (sessionStorage.getItem('gateway_entered')) {
            animate('.animate-text', {
                opacity: 1,
                translateY: 0,
                duration: 0
            });
            // We don't return here because we still might need the 'force-play-sound' listener just in case, but actually if they are already entered it won't fire. But safe to let it attach.
        } else {
            // Initial state before entry
            animate('.animate-text', {
                opacity: 0,
                duration: 0
            });
        }

        // Entrance animation on Entry click
        const handleEnter = () => {
            animate('.animate-text', {
                opacity: [0, 1],
                translateY: [60, 0],
                delay: stagger(150, { start: 200 }),
                easing: 'easeOutExpo',
                duration: 3000
            });
        };

        window.addEventListener('force-play-sound', handleEnter);
        return () => window.removeEventListener('force-play-sound', handleEnter);
    }, []);

    const handleChoice = async (choice: 'DA' | 'SPACER') => {
        setSelected(choice);

        // Animate transition using Anime.js v4 animate
        animate('.gateway-ui', {
            opacity: 0,
            scale: 1.1,
            filter: 'blur(20px)',
            easing: 'easeInOutExpo',
            duration: 1000
        });

        try {
            await fetch('http://localhost:5000/api/track-choice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: 'guest_user', choice }),
            });
        } catch (err) {
            console.error('Analytics failed', err);
        }

        setTimeout(() => {
            window.location.href = choice === 'DA' ? '/da' : '/spacer';
        }, 1200);
    };

    return (
        <div className="flex-1 flex flex-col md:flex-row relative gateway-ui">

            {/* LEFT ZONE: DA*/}
            <div
                onMouseEnter={() => !selected && setHoveredZone('DA')}
                onMouseLeave={() => !selected && setHoveredZone(null)}
                onClick={() => !selected && handleChoice('DA')}
                className={`flex-1 flex flex-col items-center justify-center group cursor-pointer pointer-events-auto transition-all duration-1000 border-b md:border-b-0 md:border-r border-white/5 ${selected === 'SPACER' ? 'opacity-0' : ''}`}
            >
                <motion.div
                    animate={{
                        opacity: hoveredZone === 'SPACER' ? 0.05 : 1,
                        scale: hoveredZone === 'DA' ? 1.05 : 1,
                        x: hoveredZone === 'DA' ? 20 : 0
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    <h2 className="animate-text text-4xl md:text-7xl font-outfit font-bold tracking-[0.2em] mb-4 group-hover:text-[#264028] transition-colors duration-500">
                        ENTER DA
                    </h2>
                    <p className="animate-text text-[10px] md:text-xs tracking-[0.3em] font-light uppercase opacity-40 group-hover:text-[#808C89] group-hover:opacity-100 transition-all duration-500">
                        Design. Systems. Thinking.
                    </p>
                </motion.div>
            </div>

            {/* RIGHT ZONE: SPACER */}
            <div
                onMouseEnter={() => !selected && setHoveredZone('SPACER')}
                onMouseLeave={() => !selected && setHoveredZone(null)}
                onClick={() => !selected && handleChoice('SPACER')}
                className={`flex-1 flex flex-col items-center justify-center group cursor-pointer pointer-events-auto transition-all duration-1000 ${selected === 'DA' ? 'opacity-0' : ''}`}
            >
                <motion.div
                    animate={{
                        opacity: hoveredZone === 'DA' ? 0.05 : 1,
                        scale: hoveredZone === 'SPACER' ? 1.05 : 1,
                        x: hoveredZone === 'SPACER' ? -20 : 0
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    <h2 className="animate-text text-4xl md:text-7xl font-outfit font-bold tracking-[0.2em] mb-4 group-hover:text-[var(--primary)] transition-colors duration-500">
                        ENTER SPACER
                    </h2>
                    <p className="animate-text text-[10px] md:text-xs tracking-[0.3em] font-light uppercase opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                        Upskilling. Workflows. Future.
                    </p>
                </motion.div>
            </div>

            {/* Background Glow for Hovered Zone */}
            <AnimatePresence>
                {hoveredZone && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${hoveredZone === 'DA' ? 'bg-gradient-to-r from-[#FEFBEC]/10 to-transparent' : 'bg-gradient-to-l from-[var(--primary)]/20 to-transparent'
                            }`}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
