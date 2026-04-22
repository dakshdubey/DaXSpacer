'use client';

import { motion } from 'framer-motion';

const programCategories = [
    { id: 'workshop', name: 'Workshops', duration: '2-5 Days', desc: 'Fast-tracked tool mastery and output-driven sessions.' },
    { id: 'course', name: 'Courses', duration: '4-8 Weeks', desc: 'Comprehensive technical skill-building modules.' },
    { id: 'studio', name: 'Studio Programs', duration: '3 Months', desc: 'Mentorship-led real-world project simulations.' },
];

export default function SpacerPrograms() {
    return (
        <div className="flex flex-col gap-24">
            <header className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="flex flex-col gap-6">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#00f3ff]">Catalog</span>
                    <h1 className="text-6xl md:text-8xl font-outfit font-bold tracking-tighter">Upskilling <br />Programs</h1>
                </div>
                <div className="flex gap-4 pb-4">
                    {['All', 'Architecture', 'Urban', 'Tech'].map(tag => (
                        <button key={tag} className="px-4 py-1 border border-white/10 text-[10px] uppercase tracking-widest hover:border-[#00f3ff] transition-colors">
                            {tag}
                        </button>
                    ))}
                </div>
            </header>

            <div className="flex flex-col gap-12">
                {programCategories.map((cat, i) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 border border-white/5 bg-white/[0.02] hover:bg-[#00f3ff]/5 transition-all"
                    >
                        <div className="md:col-span-1">
                            <span className="text-4xl font-outfit font-bold opacity-10">0{i + 1}</span>
                        </div>
                        <div className="md:col-span-4 flex flex-col gap-2">
                            <h3 className="text-2xl font-outfit font-bold">{cat.name}</h3>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#00f3ff] font-medium">{cat.duration}</span>
                        </div>
                        <div className="md:col-span-4 text-xs opacity-50 font-light leading-relaxed">
                            {cat.desc}
                        </div>
                        <div className="md:col-span-3 flex justify-end">
                            <a href={`/spacer/programs/${cat.id}`} className="px-6 py-3 border border-[#00f3ff]/30 text-[10px] uppercase font-bold tracking-widest hover:bg-[#00f3ff] hover:text-black transition-all">
                                View Catalog
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Featured Single Workshop Callout */}
            <section className="mt-24 p-1 rounded-3xl bg-gradient-to-br from-[#00f3ff]/40 to-transparent">
                <div className="bg-black rounded-[22px] px-12 py-20 flex flex-col lg:flex-row justify-between items-center gap-12">
                    <div className="max-w-xl">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-[#00f3ff] mb-6 block">Ongoing Enrollment</span>
                        <h2 className="text-4xl md:text-5xl font-outfit font-bold tracking-tight mb-6">Advanced Computational Design Workshop</h2>
                        <p className="opacity-60 text-sm font-light leading-relaxed">
                            A 5-day intensive exploration into Rhino + Grasshopper workflows for complex geometric systems.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 text-center">
                        <span className="text-3xl font-outfit font-bold">₹ 4,999</span>
                        <button className="px-12 py-4 bg-[#00f3ff] text-black font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">
                            Enroll Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
