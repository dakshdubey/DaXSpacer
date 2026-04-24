'use client';

export default function DALibrary() {
    return (
        <div className="flex flex-col gap-24">
            <header className="flex flex-col gap-6">
                <span className="text-[10px] uppercase tracking-[0.5em] font-medium opacity-30">Library</span>
                <h1 className="text-5xl md:text-7xl font-outfit font-bold tracking-tighter">Visual Library</h1>
            </header>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <div key={i} className="break-inside-avoid border border-white/10 group cursor-crosshair">
                        <div className={`w-full bg-white/5 relative flex items-center justify-center`} style={{ height: `${200 + (i % 3) * 100}px` }}>
                            <span className="text-[10px] uppercase tracking-widest opacity-10 group-hover:opacity-40 transition-opacity">Visual {i.toString().padStart(2, '0')}</span>
                        </div>
                        <div className="p-4 flex justify-between items-center bg-background">
                            <span className="text-[10px] uppercase font-light opacity-50">Exploration {i}</span>
                            <span className="text-[10px] font-mono opacity-20">DA-V0{i}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
