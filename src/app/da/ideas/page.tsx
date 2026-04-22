'use client';

import { motion } from 'framer-motion';

const thoughts = [
    {
        title: 'Architecture as a Living System',
        excerpt: 'Exploring the biological parallels in urban infrastructure development and resilience.',
        date: 'March 2024'
    },
    {
        title: 'The Computational Fallacy',
        excerpt: 'Why tools without thinking lead to hollow design, and how to reclaim narrative in architecture.',
        date: 'February 2024'
    },
    {
        title: 'Systems Over Objects',
        excerpt: 'Shifting the pedagogical focus from building form to environmental performance logic.',
        date: 'January 2024'
    },
];

export default function DAIdeas() {
    return (
        <div className="flex flex-col gap-24">
            <header className="flex flex-col gap-6">
                <span className="text-[10px] uppercase tracking-[0.5em] font-medium opacity-30">Ideas</span>
                <h1 className="text-5xl md:text-7xl font-outfit font-bold tracking-tighter">Thought Ecosystem</h1>
            </header>

            <div className="flex flex-col gap-32">
                {thoughts.map((thought, i) => (
                    <motion.article
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="group cursor-pointer border-l border-white/10 pl-12 transition-colors hover:border-white"
                    >
                        <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6 block">{thought.date}</span>
                        <h2 className="text-3xl md:text-5xl font-outfit font-medium tracking-tight mb-8 group-hover:italic transition-all">
                            {thought.title}
                        </h2>
                        <p className="max-w-xl text-lg opacity-60 font-light leading-relaxed mb-10">
                            {thought.excerpt}
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Read Essay</span>
                            <div className="h-[1px] w-12 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
                        </div>
                    </motion.article>
                ))}
            </div>
        </div>
    );
}
