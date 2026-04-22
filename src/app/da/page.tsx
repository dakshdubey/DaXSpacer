'use client';

import { motion } from 'framer-motion';

export default function DAHome() {
    return (
        <div className="flex flex-col gap-32">
            {/* Hero Section */}
            <section className="min-h-[70vh] flex flex-col justify-end">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl md:text-8xl lg:text-9xl font-outfit font-bold tracking-tighter leading-[0.85] max-w-4xl"
                >
                    Architecture is a system. <br />
                    We study how it behaves.
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
                >
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-light max-w-sm leading-relaxed">
                        Design Aspirations (DA) is the philosophical foundation where design thinking is explored, questioned, and evolved.
                    </p>
                    <div className="h-[1px] w-24 bg-white opacity-40 hidden md:block" />
                </motion.div>
            </section>

            {/* Featured Explorations Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 overflow-hidden">
                <div className="flex flex-col gap-6 group cursor-pointer">
                    <div className="aspect-[4/5] bg-white/5 border border-white/10 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />
                        {/* Visual Placeholder for Project */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] tracking-[0.5em] uppercase opacity-20 group-hover:opacity-40 transition-opacity">Void Exploration 01</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-outfit font-bold text-2xl tracking-tight">Parametric Systems</h3>
                        <span className="text-[10px] uppercase opacity-40">2026</span>
                    </div>
                </div>

                <div className="flex flex-col gap-6 md:mt-24 group cursor-pointer">
                    <div className="aspect-[4/5] bg-white/5 border border-white/10 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] tracking-[0.5em] uppercase opacity-20 group-hover:opacity-40 transition-opacity">Spatial Logic 02</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-outfit font-bold text-2xl tracking-tight">Urban Infrastructure</h3>
                        <span className="text-[10px] uppercase opacity-40">2026</span>
                    </div>
                </div>
            </section>

            {/* Philosophy Callout */}
            <section className="py-32 border-y border-white/10">
                <div className="max-w-2xl">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-medium opacity-30 block mb-12">Perspective</span>
                    <h2 className="text-4xl md:text-5xl font-outfit font-medium tracking-tight leading-snug mb-8">
                        We believe that the future of design lies in understanding the complex interdependencies between space, technology, and human experience.
                    </h2>
                    <a href="/da/about" className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-white pb-1 hover:opacity-60 transition-opacity">
                        Read Philosophy
                    </a>
                </div>
            </section>
        </div>
    );
}
