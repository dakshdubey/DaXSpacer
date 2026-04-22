'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SoundToggle() {
    const [muted, setMuted] = useState(true);

    return (
        <button
            onClick={() => setMuted(!muted)}
            className="flex items-center gap-3 group px-4 py-2"
        >
            <div className="flex items-end gap-[2px] h-3">
                {[2, 4, 3, 5, 2].map((h, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            height: muted ? 1 : [`${h * 20}%`, `${h * 10}%`, `${h * 20}%`],
                            opacity: muted ? 0.2 : 0.8
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.1
                        }}
                        className="w-[1.5px] bg-white"
                    />
                ))}
            </div>
            <span className="text-[10px] tracking-[0.3em] font-light uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                {muted ? 'Sound Off' : 'Sound On'}
            </span>
        </button>
    );
}
