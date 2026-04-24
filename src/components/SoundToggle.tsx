'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Royalty-free forest ambient sound (CC0 - freesound.org / pixabay)
const FOREST_SOUND_URL = 'https://cdn.pixabay.com/audio/2022/03/15/audio_8cb749afb6.mp3';

export default function SoundToggle() {
    const [muted, setMuted] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Create audio element once on mount
    useEffect(() => {
        const audio = new Audio(FOREST_SOUND_URL);
        audio.loop = true;
        audio.volume = 0;
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    // Fade volume on mute/unmute
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (!muted) {
            // Play and fade in
            audio.play().catch(() => {/* autoplay blocked - user gesture required */ });
            let vol = 0;
            const fadeIn = setInterval(() => {
                vol = Math.min(vol + 0.02, 0.35);
                audio.volume = vol;
                if (vol >= 0.35) clearInterval(fadeIn);
            }, 50);
        } else {
            // Fade out then pause
            const fadeOut = setInterval(() => {
                audio.volume = Math.max(audio.volume - 0.02, 0);
                if (audio.volume <= 0) {
                    clearInterval(fadeOut);
                    audio.pause();
                }
            }, 50);
        }
    }, [muted]);

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
                        className="w-[1.5px] bg-primary"
                    />
                ))}
            </div>
            <span className="text-[10px] tracking-[0.3em] font-light uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                {muted ? 'Sound Off' : 'Sound On'}
            </span>
        </button>
    );
}
