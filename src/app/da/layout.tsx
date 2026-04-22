'use client';

import Navbar from "@/components/Navbar";

export default function DALayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />
            <main className="pt-24 px-8 md:px-16 lg:px-24 pb-20">
                {children}
            </main>

            {/* Editorial Footer */}
            <footer className="border-t border-white/10 px-8 md:px-16 lg:px-24 py-12 flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="max-w-xs">
                    <h3 className="font-outfit font-bold text-xl mb-4 tracking-tighter">DA</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-light opacity-50 leading-relaxed">
                        A design studio and thought ecosystem exploring the future of the built environment.
                    </p>
                </div>

                <div className="flex gap-20">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-30">Explore</span>
                        <div className="flex flex-col gap-2">
                            <a href="/da/projects" className="text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100">Projects</a>
                            <a href="/da/ideas" className="text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100">Ideas</a>
                            <a href="/da/library" className="text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100">Library</a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-30">Credits</span>
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Made by Venturley Hub Team</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">© 2026 DA</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
