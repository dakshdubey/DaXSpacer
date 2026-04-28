'use client';

import Navbar from "@/components/Navbar";

export default function SpacerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="min-h-screen text-white selection:bg-primary selection:text-background relative"
            style={{
                background: `
                    radial-gradient(ellipse 80% 60% at 15% 90%, rgba(248,151,254,0.28) 0%, rgba(147,90,240,0.18) 35%, transparent 70%),
                    radial-gradient(ellipse 60% 50% at 85% 10%, rgba(72,58,204,0.22) 0%, rgba(23,32,144,0.15) 50%, transparent 80%),
                    radial-gradient(ellipse 100% 80% at 50% 50%, #0A1051 0%, #06094A 50%, #03042C 100%)
                `,
            }}
        >
            {/* Star field layer */}
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 0,
                    backgroundImage: `
                        radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px),
                        radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px),
                        radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '160px 160px, 100px 100px, 220px 220px',
                    backgroundPosition: '0 0, 80px 80px, 40px 130px',
                }}
            />

            {/* All content above star field */}
            <div className="relative z-10">
                <Navbar />
                <main className="pt-24 px-8 md:px-16 lg:px-24 pb-20">
                    {children}
                </main>

                {/* Futuristic Footer */}
                <footer className="border-t border-primary/10 px-8 md:px-16 lg:px-24 py-16 bg-gradient-to-b from-transparent to-primary/5">
                    <div className="flex flex-col lg:flex-row justify-between gap-16">
                        <div className="max-w-md">
                            <h3 className="font-outfit font-bold text-2xl mb-6 tracking-tighter text-primary">SPACER</h3>
                            <p className="text-sm tracking-wide font-light opacity-60 leading-relaxed">
                                The bridge between architecture education and real-world practice. Empowering the next generation of designers with industry-ready workflows.
                            </p>

                            <div className="mt-12 flex gap-4">
                                <div className="px-4 py-2 border border-primary/20 bg-primary/5 rounded-full">
                                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">1500+ Students</span>
                                </div>
                                <div className="px-4 py-2 border border-primary/20 bg-primary/5 rounded-full">
                                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">2026 Founded</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
                            <div className="flex flex-col gap-6">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Programs</span>
                                <div className="flex flex-col gap-3">
                                    <a href="/spacer/programs?type=workshop" className="text-xs tracking-wider opacity-60 hover:opacity-100 hover:text-primary transition-all">Workshops</a>
                                    <a href="/spacer/programs?type=course" className="text-xs tracking-wider opacity-60 hover:opacity-100 hover:text-primary transition-all">Courses</a>
                                    <a href="/spacer/programs?type=studio" className="text-xs tracking-wider opacity-60 hover:opacity-100 hover:text-primary transition-all">Studio Programs</a>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Platform</span>
                                <div className="flex flex-col gap-3">
                                    <a href="/spacer/about" className="text-xs tracking-wider opacity-60 hover:opacity-100 hover:text-primary transition-all">Vision</a>
                                    <a href="/spacer/contact" className="text-xs tracking-wider opacity-60 hover:opacity-100 hover:text-primary transition-all">Enrollment</a>
                                    <a href="#" className="text-xs tracking-wider opacity-60 hover:opacity-100 hover:text-primary transition-all">Resources</a>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Community</span>
                                <div className="flex flex-col gap-3">
                                    <a href="/" className="text-xs tracking-wider opacity-60 hover:opacity-100 hover:text-primary transition-all italic">Go to Gateway</a>
                                    <a href="#" className="text-xs tracking-wider opacity-60 hover:opacity-100 hover:text-primary transition-all">Discord</a>
                                    <a href="#" className="text-xs tracking-wider opacity-60 hover:opacity-100 hover:text-primary transition-all">Events</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 pt-8 border-t border-primary/5 flex justify-between items-center">
                        <p className="text-[10px] uppercase tracking-[0.2em] opacity-30">© 2026 SPACER. All Rights Reserved.</p>
                        <div className="h-[1px] flex-1 mx-12 bg-gradient-to-r from-primary/10 to-transparent" />
                    </div>
                </footer>
            </div>
        </div>
    );
}
