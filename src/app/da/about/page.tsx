'use client';

import { motion } from 'framer-motion';

export default function DAAbout() {
    return (
        <div className="flex flex-col gap-32">
            <section className="min-h-[50vh] flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-8">Introduction</span>
                <h1 className="text-5xl md:text-8xl font-outfit font-bold tracking-tighter leading-[0.9] max-w-4xl">
                    Design is the <br />
                    intellectual infrastructure <br />
                    of our planet.
                </h1>
            </section>

            <section className="flex flex-col lg:flex-row gap-24 py-32 border-y border-white/10">
                <div className="lg:w-1/3">
                    <h3 className="text-[10px] uppercase tracking-[0.5em] font-medium opacity-30">The Studio</h3>
                </div>
                <div className="lg:w-2/3 flex flex-col gap-12">
                    <p className="text-2xl md:text-3xl font-light leading-snug tracking-tight">
                        DA began in 2026 with a simple mission: to make high-quality, practical thinking accessible to those who want to grow beyond traditional academic boundaries.
                    </p>
                    <p className="opacity-50 text-sm leading-[1.8] font-light max-w-xl">
                        We bridge the gap between architectural theory and systemic reality. Today, SPACER supports learners across Space in Planning, Architecture, Construction, Engineering, and Research by providing industry-relevant studio-based workshops.
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
                {[
                    { t: 'Nurture', d: 'Building a global community of creators and problem-solvers.' },
                    { t: 'Pioneer', d: 'Integrating emerging tools like AI and simulation into design workflows.' },
                    { t: 'Resilient', d: 'Designing for sustainability and long-term environmental intelligence.' },
                    { t: 'Impact', d: 'Empowering individuals to become confident contributors.' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="p-16 bg-black flex flex-col gap-6"
                    >
                        <span className="text-xl font-outfit font-bold tracking-tight">{item.t}</span>
                        <p className="text-xs opacity-50 font-light leading-relaxed">{item.d}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
}
