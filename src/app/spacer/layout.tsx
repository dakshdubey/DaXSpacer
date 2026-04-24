'use client';

import Navbar from "@/components/Navbar";

export default function SpacerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-background">
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
    );
}
