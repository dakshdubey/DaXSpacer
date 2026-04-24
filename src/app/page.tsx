'use client';

import { useState, useEffect } from 'react';
import ThreeScene from '@/components/ThreeScene';
import TransitionOverlay from '@/components/TransitionOverlay';
import SoundToggle from '@/components/SoundToggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function GatewayPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-background select-none overflow-x-hidden min-h-screen">
      {/* Initial Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-[10px] tracking-[0.3em] font-light uppercase opacity-50">Configuring Space...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Background Experience - Fixed in background */}
      <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none">
        <ThreeScene />
      </div>

      {/* Global UI Controls */}
      <div className="fixed top-8 right-8 z-50 pointer-events-auto">
        <SoundToggle />
      </div>

      {/* Section 1: Cinematic Gateway */}
      <section className="relative z-10 h-screen w-full flex flex-col items-center justify-center pointer-events-none">
        <div className="w-full h-full flex flex-col pointer-events-auto">
          <TransitionOverlay />
        </div>

        {/* Scroll Indicator */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[8px] uppercase tracking-[0.4em]">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent opacity-40 animate-pulse" />
          </motion.div>
        )}
      </section>

      {/* Section 2: Philosophical Foundation (DA) */}
      <section className="relative z-10 min-h-screen w-full py-32 px-12 md:px-24 flex flex-col justify-center bg-background/40 backdrop-blur-sm">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.8, x: 0 }}
            className="text-[10px] uppercase tracking-[0.6em] mb-8 block text-highlight"
          >
            The Foundation | DA
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-outfit font-bold tracking-tighter leading-[0.9] mb-12">
            Design is a deep research project.
          </h2>
          <p className="text-xl md:text-3xl font-light opacity-60 leading-relaxed max-w-3xl">
            DA (Design Aspirations) is where we strip away the noise. We explore the architectural protocol that defines the interaction between humans and space.
          </p>
        </div>
      </section>

      {/* Section 3: Technical Evolution (SPACER) */}
      <section className="relative z-10 min-h-screen w-full py-32 px-12 md:px-24 flex flex-col items-end justify-center bg-background/40 backdrop-blur-sm">
        <div className="max-w-4xl text-right">
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 0.4, x: 0 }}
            className="text-[10px] uppercase tracking-[0.6em] mb-8 block text-[var(--primary)]"
          >
            The Evolution | SPACER
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-outfit font-bold tracking-tighter leading-[0.9] mb-12 text-[var(--primary)]">
            Upskilling for a better planet.
          </h2>
          <p className="text-xl md:text-3xl font-light opacity-60 leading-relaxed max-w-3xl ml-auto">
            SPACER translates architectural thinking into practical mastery. From computational logic to site reality, we empower the next generation of AEC professionals.
          </p>
        </div>
      </section>

      {/* Section 4: Global Network & Initiatives */}
      <section className="relative z-10 min-h-screen w-full py-32 px-12 md:px-24 flex flex-col justify-center bg-background/60 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-3xl font-outfit font-bold mb-6 italic text-[var(--primary)]">Global Network</h3>
            <p className="opacity-50 font-light leading-relaxed mb-12">
              Operational in Bengaluru, and expanding across global AEC hubs. Supporting a community of 5000+ researchers and students.
            </p>
            <div className="flex flex-wrap gap-4">
              {['BENGALURU', 'DUBAI', 'SINGAPORE', 'LONDON'].map(city => (
                <span key={city} className="px-3 py-1 border border-white/10 text-[8px] tracking-[0.2em]">{city}</span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col gap-8 justify-center"
          >
            <div className="p-8 border border-white/5 bg-white/[0.02]">
              <h4 className="text-lg font-outfit font-bold mb-2">Sustainable Infrastructure</h4>
              <p className="text-[10px] opacity-40 leading-relaxed uppercase tracking-widest">Ongoing Research Initiative 2026</p>
            </div>
            <div className="p-8 border border-[var(--primary)]/10 bg-[var(--primary)]/5">
              <h4 className="text-lg font-outfit font-bold mb-2">AI in AEC Workflow</h4>
              <p className="text-[10px] opacity-40 leading-relaxed uppercase tracking-widest text-[var(--primary)]">Professional Upskilling Track</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: The Convergence */}
      <section className="relative z-10 py-48 px-12 md:px-24 border-t border-white/5 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-3xl font-outfit font-bold mb-8 italic">Choose your entry.</h3>
            <div className="flex gap-4">
              <a href="/da" className="px-8 py-4 border border-highlight text-[10px] uppercase tracking-widest font-bold text-highlight hover:bg-highlight hover:text-background transition-all">Studio DA</a>
              <a href="/spacer" className="px-8 py-4 border border-primary text-[10px] uppercase tracking-widest font-bold text-primary hover:bg-primary hover:text-background transition-all">Spacer Platform</a>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="text-sm opacity-40 leading-relaxed font-light"
          >
            DA x SPACER is more than a collaboration; it is a gateway to the future of the built environment. Whether you seek design philosophy or practical mastery, your path starts here.
          </motion.p>
        </div>

        <div className="mt-48 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[8px] uppercase tracking-[0.4em] opacity-30">
          <span>Made by Venturley Hub Team</span>
          <span>© 2026 DA x SPACER</span>
        </div>
      </section>
    </main>
  );
}
