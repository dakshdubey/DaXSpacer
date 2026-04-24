'use client';

import { useParams } from 'next/navigation';

interface ProgramInfo {
    title: string;
    subtitle: string;
    duration: string;
    price: string;
    modules: string[];
    description: string;
}

const programData: Record<string, ProgramInfo> = {
    workshop: {
        title: 'Advanced Computational Design',
        subtitle: 'Fast-tracked output-driven session',
        duration: '5 Days',
        price: '₹ 4,999',
        modules: ['Rhino Fundamentals', 'Grasshopper Logic', 'Data Management', 'Fabrication Setup', 'Portfolio Finalization'],
        description: 'Master the art of parametric thinking and computational design workflows in this intensive workshop.'
    },
    course: {
        title: 'Industry-Ready Architecture',
        subtitle: 'Comprehensive skill-building module',
        duration: '8 Weeks',
        price: '₹ 14,999',
        modules: ['Project Planning', 'Advanced Modeling', 'BIM Integration', 'Visual Communication', 'Career Mentorship'],
        description: 'Transform your technical capabilities with deep-dive modules designed to bridge the academic-industry gap.'
    },
    studio: {
        title: 'Professional Practice Studio',
        subtitle: 'Mentorship-led simulation',
        duration: '3 Months',
        price: '₹ 24,999',
        modules: ['Concept Development', 'Technical Design', 'Client Management', 'Statutory Compliance', 'Final Delivery'],
        description: 'A real-world project simulation that gives you the experience of working in a top-tier design firm.'
    }
};

export default function ProgramDetail() {
    const params = useParams();
    const id = params.id as string;
    const program = programData[id] || programData.workshop;

    return (
        <div className="flex flex-col gap-24 max-w-5xl mx-auto">
            <header className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <a href="/spacer/programs" className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity whitespace-nowrap">← Back to Catalog</a>
                    <div className="h-[1px] w-full bg-white/10" />
                </div>

                <div className="flex flex-col gap-6">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[var(--primary)] font-bold">{program.subtitle}</span>
                    <h1 className="text-5xl md:text-7xl font-outfit font-bold tracking-tighter leading-tight">
                        {program.title}
                    </h1>
                </div>
            </header>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 flex flex-col gap-12">
                    <p className="text-xl font-light opacity-70 leading-relaxed">
                        {program.description}
                    </p>

                    <div className="flex flex-col gap-8">
                        <h3 className="text-xl font-outfit font-bold border-b border-white/10 pb-4">Curriculum Modules</h3>
                        <div className="flex flex-col gap-4">
                            {program.modules.map((m: string, i: number) => (
                                <div key={m} className="flex items-center gap-6 group">
                                    <span className="text-[10px] font-mono opacity-20 group-hover:opacity-100 group-hover:text-[var(--primary)] transition-all">M.0{i + 1}</span>
                                    <span className="text-lg font-light group-hover:pl-2 transition-all">{m}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit flex flex-col gap-8 p-10 border border-[var(--primary)]/20 bg-[var(--primary)]/5 rounded-3xl">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest opacity-40">Duration</span>
                        <span className="text-2xl font-outfit font-bold">{program.duration}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest opacity-40">Total Value</span>
                        <span className="text-4xl font-outfit font-bold text-[var(--primary)]">{program.price}</span>
                    </div>

                    <button className="w-full py-5 bg-[var(--primary)] text-black font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-all">
                        Enroll Now
                    </button>
                    <p className="text-center text-[10px] uppercase tracking-widest opacity-30">Limited Slots Available</p>
                </div>
            </section>
        </div>
    );
}
