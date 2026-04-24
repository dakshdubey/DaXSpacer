'use client';

export default function SpacerAbout() {
    return (
        <div className="flex flex-col gap-32">
            {/* Vision Section */}
            <section className="min-h-[60vh] flex flex-col justify-center">
                <h1 className="text-5xl md:text-7xl font-outfit font-bold tracking-tighter leading-tight max-w-4xl mb-12">
                    Bridging the gap between theory and industry.
                </h1>
                <p className="text-xl md:text-2xl font-light opacity-60 max-w-3xl leading-relaxed">
                    SPACER was founded to address the lack of practical, high-quality upskilling opportunities in architecture school. We empower learners to think critically and become confident contributors.
                </p>
            </section>

            {/* Philosophy Grids */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                <div className="p-16 bg-background flex flex-col gap-8">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[var(--primary)] font-bold">The Problem</span>
                    <p className="text-sm opacity-60 leading-relaxed font-light">
                        Traditional academic boundaries often leave students unprepared for the rapid evolution of tools and practical site complexities. Universities teach deeply, but often not at the speed of the industry.
                    </p>
                </div>
                <div className="p-16 bg-background flex flex-col gap-8">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[var(--primary)] font-bold">The Solution</span>
                    <p className="text-sm opacity-60 leading-relaxed font-light">
                        SPACER provides a studio-based learning ecosystem. We don&apos;t just teach software; we teach workflows. We don&apos;t just show solutions; we simulate real-world project logic.
                    </p>
                </div>
            </section>

            {/* Founding Story */}
            <section className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="aspect-square bg-white/5 border border-white/10 group overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-[0.4em] opacity-20">Bharath | Founder</span>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    <h2 className="text-4xl font-outfit font-bold">Meet the Founder</h2>
                    <div className="h-px w-24 bg-[var(--primary)]/40" />
                    <p className="opacity-60 leading-relaxed font-light italic text-lg">
                        &quot;I design and build systems, infrastructure, and buildings with a strong belief that education shapes the future of the built environment. After architecture school, I realized students across many countries face similar gaps in upskilling. SPACER is my commitment to making specialized knowledge accessible to everyone.&quot;
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--primary)]">Bharath — Architect & Educator</span>
                </div>
            </section>
        </div>
    );
}
