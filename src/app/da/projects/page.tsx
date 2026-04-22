'use client';

import { motion } from 'framer-motion';

const projects = [
    { title: 'Parametric Urbanism', category: 'Research', year: '2024', id: '01' },
    { title: 'Void Logic', category: 'Exploration', year: '2024', id: '02' },
    { title: 'Systemic Infrastructure', category: 'Studio', year: '2023', id: '03' },
    { title: 'Environmental Intelligence', category: 'Systems', year: '2024', id: '04' },
    { title: 'Computational Form', category: 'Design', year: '2023', id: '05' },
    { title: 'Resilient Grids', category: 'Planning', year: '2024', id: '06' },
];

export default function DAProjects() {
    return (
        <div className="flex flex-col gap-24">
            <header className="flex flex-col gap-6">
                <span className="text-[10px] uppercase tracking-[0.5em] font-medium opacity-30">Projects</span>
                <h1 className="text-5xl md:text-7xl font-outfit font-bold tracking-tighter">Design Explorations</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col gap-6 group cursor-pointer"
                    >
                        <div className="aspect-[3/4] bg-white/5 border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-40 transition-opacity">
                                <span className="text-6xl font-bold font-outfit">{project.id}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-xl font-outfit font-bold">{project.title}</h3>
                                <span className="text-[10px] uppercase opacity-40">2026</span>
                            </div>
                            <span className="text-[10px] uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">{project.category}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
