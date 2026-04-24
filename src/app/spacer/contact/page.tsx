'use client';

export default function SpacerContact() {
    return (
        <div className="flex flex-col gap-24">
            <header className="flex flex-col gap-6">
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[var(--primary)]">Communication</span>
                <h1 className="text-5xl md:text-7xl font-outfit font-bold tracking-tighter">Join the Ecosystem</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                {/* Contact Form */}
                <div className="flex flex-col gap-12">
                    <p className="text-lg opacity-60 font-light leading-relaxed">
                        Have questions about our programs or want to collaborate with SPACER? Send us a message and our team will get back to you.
                    </p>

                    <form className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Full Name</label>
                            <input type="text" className="bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[var(--primary)] transition-colors" placeholder="Type your name..." />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Email Address</label>
                            <input type="email" className="bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[var(--primary)] transition-colors" placeholder="your@email.com" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Inquiry Type</label>
                            <select className="bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer appearance-none">
                                <option className="bg-background">Workshop Enrollment</option>
                                <option className="bg-background">Studio Program Inquiry</option>
                                <option className="bg-background">Collaboration</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Message</label>
                            <textarea rows={4} className="bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[var(--primary)] transition-colors resize-none" placeholder="Your thoughts..." />
                        </div>

                        <button className="mt-8 px-12 py-5 bg-[var(--primary)] text-black font-bold uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-all">
                            Send Inquiry
                        </button>
                    </form>
                </div>

                {/* Contact Details */}
                <div className="flex flex-col gap-16 lg:pl-16 lg:border-l border-white/5">
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--primary)] font-bold">Location</span>
                        <p className="text-xl font-outfit font-medium">BENGALURU, INDIA</p>
                        <p className="text-[10px] opacity-40 uppercase tracking-widest">Global Ecosystem, Digital-First Studio</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--primary)] font-bold">Email</span>
                        <p className="text-xl font-outfit font-medium hover:text-[var(--primary)] cursor-pointer">HELLO@SPACER.XYZ</p>
                    </div>

                    <div className="flex flex-col gap-6 text-[10px] uppercase tracking-[0.3em] opacity-30 mt-auto leading-relaxed">
                        <span>DA x SPACER</span>
                        <span>© 2026 ALL RIGHTS RESERVED</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
