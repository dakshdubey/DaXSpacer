'use client';

import { motion } from 'framer-motion';

export default function SpacerHome() {
    return (
        <div className="flex flex-col gap-32">
            {/* Hero Section */}
            <section className="min-h-[80vh] flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-8"
                >
                    <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-[var(--primary)] border-l-2 border-[var(--primary)] pl-4">The Future of Upskilling</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-outfit font-bold tracking-tighter leading-[0.85] max-w-5xl"
                >
                    Evolve from student <br />
                    to professional.
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-16 flex flex-col gap-12"
                >
                    <p className="text-lg md:text-xl font-light opacity-60 max-w-2xl leading-relaxed">
                        SPACER bridges the gap between academic theory and industry practice through studio-based workshops and advanced technology integration.
                    </p>

                    <div className="flex gap-6">
                        <a href="/spacer/programs" className="px-8 py-4 bg-[var(--primary)] text-black font-bold text-sm tracking-widest uppercase hover:bg-white transition-colors">
                            Explore Programs
                        </a>
                        <a href="/spacer/about" className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                            Our Model
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Stats / Numbers Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-1 px-4 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-12 flex flex-col items-center text-center gap-4 bg-background">
                    <span className="text-5xl font-outfit font-bold text-[var(--primary)]">1500+</span>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-medium opacity-40">Students Empowered</span>
                </div>
                <div className="p-12 flex flex-col items-center text-center gap-4 bg-background">
                    <span className="text-5xl font-outfit font-bold text-[var(--primary)]">30+</span>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-medium opacity-40">Industry Mentors</span>
                </div>
                <div className="p-12 flex flex-col items-center text-center gap-4 bg-background">
                    <span className="text-5xl font-outfit font-bold text-[var(--primary)]">98%</span>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-medium opacity-40">Confidence Boost</span>
                </div>
            </section>

            {/* core Offerings Section */}
            <section className="flex flex-col gap-16">
                <div className="flex justify-between items-end">
                    <h2 className="text-4xl font-outfit font-bold tracking-tight">Practical Mastery</h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 max-w-xs text-right italic">
                        Programs designed for Planning, Architecture, Construction, Engineering, and Research.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {['Workshops', 'Courses', 'Studio Programs'].map((title, i) => (
                        <div key={title} className="p-8 border border-white/10 flex flex-col gap-12 group hover:border-[var(--primary)]/50 transition-all cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                <span className="text-8xl font-black">{i + 1}</span>
                            </div>
                            <div className="flex flex-col gap-4 relative z-10">
                                <h3 className="text-2xl font-outfit font-bold">{title}</h3>
                                <p className="text-xs opacity-50 font-light leading-relaxed">
                                    {i === 0 && 'Fast-tracked 2-5 day sessions focused on specific output-driven tool mastery.'}
                                    {i === 1 && 'Deep-dive multi-module curriculum for building robust technical & tactical capabilities.'}
                                    {i === 2 && 'Real-world project simulations with direct mentorship for portfolio-grade results.'}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 relative z-10">
                                <span className="text-[10px] uppercase font-bold tracking-widest group-hover:text-[var(--primary)]">Explore</span>
                                <div className="h-[1px] w-8 bg-white/20 group-hover:bg-[var(--primary)] transition-all" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Outcome Section */}
            <section className="py-24 relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-[var(--primary)]/5 border border-[var(--primary)]/20" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />

                <div className="relative z-10 px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-outfit font-bold tracking-tighter mb-8 italic">Where architects don’t just learn — they evolve.</h2>
                        <p className="opacity-60 font-light leading-relaxed">
                            Join a global community of problem-solvers using AI, computational thinking, and environmental intelligence to shape a better planet.
                        </p>
                    </div>

                    <a href="/spacer/contact" className="w-full lg:w-auto px-12 py-6 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[var(--primary)] transition-colors rounded-none">
                        Join Upcoming Program
                    </a>
                </div>
            </section>
        </div>
    );
}
