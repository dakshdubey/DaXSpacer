'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

type RadarNode = {
    angle: number;
    color: string;
    title: string;
    subtitle: string;
    x: number;
    y: number;
};

interface SpacerRadarProps {
    scrollProgress: MotionValue<number>;
}

export default function SpacerRadar({ scrollProgress }: SpacerRadarProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [activeTelemetry, setActiveTelemetry] = useState<{ title: string, subtitle: string } | null>({
        title: "INITIALIZING...",
        subtitle: "SCROLL TO SYNC TELEMETRY"
    });

    const [showTelemetry, setShowTelemetry] = useState(false);
    const [flicker, setFlicker] = useState(false);
    const targetIdxRef = useRef<number>(0);
    const scrollIdxRef = useRef<number>(-1);

    const colors = ['#ffffff', '#ff4d4d', '#4dff4d', '#b366ff', '#ffa64d'];
    const spacerInfoData = [
        { title: '1500+', subtitle: 'STUDENTS EMPOWERED' },
        { title: '2024', subtitle: 'FOUNDED YEAR' },
        { title: 'STUDIO', subtitle: 'BASED LEARNING' },
        { title: 'REAL', subtitle: 'WORKFLOWS' },
        { title: 'OUTPUT', subtitle: 'DRIVEN PROGRAMS' },
        { title: 'LIVE', subtitle: 'WORKSHOPS & SESSIONS' },
        { title: 'PORTFOLIO', subtitle: 'GRADE OUTCOMES' },
        { title: 'AI + TECH', subtitle: 'INTEGRATION' },
        { title: 'COMPUTATIONAL', subtitle: 'DESIGN THINKING' },
        { title: 'ENVIRONMENTAL', subtitle: 'SIMULATION' },
        { title: 'AEC', subtitle: 'INDUSTRY FOCUS' }, // Architecture, Engineering, Construction
        { title: 'GLOBAL', subtitle: 'LEARNING ECOSYSTEM' },
        { title: 'MENTOR', subtitle: 'GUIDED PROGRAMS' },
        { title: 'PRACTICAL', subtitle: 'MASTERY MODEL' },
        { title: '0%', subtitle: 'PASSIVE LEARNING' },
        { title: '100%', subtitle: 'HANDS-ON EXECUTION' }
    ];

    const leaderLabels = {
        topRight: [
            'Studio Workflow',
            'AI Integration',
            'Computational Design',
            'Environmental Simulation',
            'Data-Driven Design'
        ],
        bottomLeft: [
            'Portfolio Outcomes',
            'Industry Ready Skills',
            'Real Project Simulation',
            'Mentor Feedback Loop',
            'Built Environment Ecosystem'
        ]
    };

    useMotionValueEvent(scrollProgress, "change", (latest) => {
        if (latest > 0.05 && !showTelemetry) setShowTelemetry(true);
        if (latest <= 0.05 && showTelemetry) setShowTelemetry(false);

        const currentIdx = Math.floor(latest * 15.99);

        if (currentIdx !== scrollIdxRef.current && currentIdx >= 0) {
            scrollIdxRef.current = currentIdx;
            targetIdxRef.current = currentIdx;
            setFlicker(true);
            setTimeout(() => setFlicker(false), 50);
            setActiveTelemetry({
                title: spacerInfoData[currentIdx].title,
                subtitle: spacerInfoData[currentIdx].subtitle
            });
        }
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d')!;
        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let centerX = 0;
        let centerY = 0;
        let maxRadius = 0;
        let isMobile = false;

        const numBars = 32;
        const waveform = Array.from({ length: numBars }, () => Math.random());
        const waveformTargets = Array.from({ length: numBars }, () => Math.random());

        const numNodes = 16;
        const nodes: RadarNode[] = Array.from({ length: numNodes }, (_, i) => {
            const data = spacerInfoData[i % spacerInfoData.length];
            return {
                angle: (Math.PI * 2 * i) / numNodes,
                color: colors[Math.floor(Math.random() * colors.length)],
                title: data.title,
                subtitle: data.subtitle,
                x: 0,
                y: 0
            };
        });

        const resize = () => {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width * 2;
            canvas.height = height * 2;
            ctx.scale(2, 2);
            isMobile = width < 768;
            centerX = width / 2;
            centerY = height / 2;
            // Responsive radius calculation
            maxRadius = isMobile ? Math.min(width * 0.30, height * 0.30) : Math.min(width * 0.36, height * 0.36);
        };

        const draw = (time: number) => {
            ctx.clearRect(0, 0, width, height);

            const currentP = scrollProgress.get();
            const easedDp = currentP === 1 ? 1 : 1 - Math.pow(2, -10 * currentP);

            if (easedDp <= 0.01) {
                animationFrameId = requestAnimationFrame(draw);
                return;
            }

            // Draw concentric rings
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 1;
            [1, 0.6, 0.3].forEach(scale => {
                ctx.beginPath();
                ctx.arc(centerX, centerY, maxRadius * scale, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * easedDp));
                ctx.stroke();
            });

            // Draw nodes
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                node.x = centerX + Math.cos(node.angle - Math.PI / 2) * maxRadius;
                node.y = centerY + Math.sin(node.angle - Math.PI / 2) * maxRadius;

                const nodeProgressThreshold = i / nodes.length;
                const nodeOpacity = Math.max(0, Math.min(1, (easedDp - nodeProgressThreshold) * 10));
                if (nodeOpacity <= 0) continue;

                const isHighlight = i === targetIdxRef.current;
                ctx.globalAlpha = nodeOpacity;
                if (isHighlight) {
                    const pulse = (Math.sin(time * 0.003) + 1) / 2;
                    const pr = isMobile ? 6 : 10;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, pr + pulse * 8, 0, Math.PI * 2);
                    ctx.strokeStyle = node.color;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.fillStyle = node.color;
                } else {
                    ctx.fillStyle = node.color;
                }
                ctx.beginPath();
                ctx.arc(node.x, node.y, isHighlight ? (isMobile ? 4 : 6) : (isMobile ? 2 : 4), 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            // Draw Animated Leader Lines — each label reveals one-by-one as scroll progresses
            if (width > 480) {
                // Each label gets its own staggered threshold (0.08 apart), so they pop in sequentially
                const LABEL_STAGGER = 0.08;
                const LABEL_START = 0.35; // first label starts drawing at 35% scroll
                ctx.font = isMobile ? '8px monospace' : '13px monospace';

                // ── Top Right labels ──
                leaderLabels.topRight.forEach((label, i) => {
                    const labelStart = LABEL_START + i * LABEL_STAGGER;
                    if (easedDp < labelStart) return; // not yet revealed

                    const lp = Math.min(1, (easedDp - labelStart) / 0.18); // each label takes 18% of scroll to fully draw

                    const node = nodes[i + 1];
                    const destX = width - (isMobile ? 70 : 150);
                    const destY = (isMobile ? 35 : 90) + i * (isMobile ? 16 : 32);
                    const midX = node.x + (destX - node.x) * 0.3;
                    const midY = node.y + (destY - node.y) * 0.3;

                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * lp})`;
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    const p1 = Math.min(1, lp * 3);
                    ctx.lineTo(node.x + (midX - node.x) * p1, node.y + (midY - node.y) * p1);
                    if (lp > 0.33) {
                        const p2 = Math.min(1, (lp - 0.33) * 3);
                        ctx.lineTo(midX + (destX - (isMobile ? 18 : 44) - midX) * p2, midY + (destY - midY) * p2);
                    }
                    if (lp > 0.66) {
                        const p3 = Math.min(1, (lp - 0.66) * 3);
                        ctx.lineTo(destX - (isMobile ? 18 : 44) + (isMobile ? 18 : 44) * p3, destY);
                    }
                    ctx.stroke();

                    if (lp > 0.85) {
                        const textAlpha = Math.min(1, (lp - 0.85) * 6.67);
                        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * textAlpha})`;
                        ctx.textAlign = 'left';
                        ctx.fillText(label.toUpperCase(), destX + 6, destY + (isMobile ? 3 : 5));
                    }
                });

                // ── Bottom Left labels ──
                leaderLabels.bottomLeft.forEach((label, i) => {
                    // Offset bottom-left by half a stagger so they interleave nicely
                    const labelStart = LABEL_START + 0.04 + i * LABEL_STAGGER;
                    if (easedDp < labelStart) return;

                    const lp = Math.min(1, (easedDp - labelStart) / 0.18);

                    const node = nodes[nodes.length - 1 - i];
                    const destX = (isMobile ? 70 : 150);
                    const destY = height - (isMobile ? 65 : 170) - i * (isMobile ? 16 : 32);
                    const midX = node.x - (node.x - destX) * 0.3;
                    const midY = node.y + (destY - node.y) * 0.3;

                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * lp})`;
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    const p1 = Math.min(1, lp * 3);
                    ctx.lineTo(node.x + (midX - node.x) * p1, node.y + (midY - node.y) * p1);
                    if (lp > 0.33) {
                        const p2 = Math.min(1, (lp - 0.33) * 3);
                        ctx.lineTo(midX + (destX + (isMobile ? 18 : 44) - midX) * p2, midY + (destY - midY) * p2);
                    }
                    if (lp > 0.66) {
                        const p3 = Math.min(1, (lp - 0.66) * 3);
                        ctx.lineTo(destX + (isMobile ? 18 : 44) - (isMobile ? 18 : 44) * p3, destY);
                    }
                    ctx.stroke();

                    if (lp > 0.85) {
                        const textAlpha = Math.min(1, (lp - 0.85) * 6.67);
                        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * textAlpha})`;
                        // Always render left-aligned from a safe margin so text never clips off left edge
                        ctx.textAlign = 'left';
                        ctx.fillText(label.toUpperCase(), isMobile ? 6 : 8, destY + (isMobile ? 3 : 5));
                    }
                });
            }

            // Draw center waveform
            if (easedDp > 0.2) {
                const waveformWidth = maxRadius * (isMobile ? 1.1 : 1.4);
                const barWidth = waveformWidth / numBars;
                const maxBarHeight = maxRadius * (isMobile ? 0.3 : 0.45);
                const startX = centerX - waveformWidth / 2;
                const waveDp = Math.min(1, (easedDp - 0.2) / 0.8);
                ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * waveDp})`;
                for (let i = 0; i < numBars; i++) {
                    waveform[i] += (waveformTargets[i] - waveform[i]) * 0.1;
                    if (Math.abs(waveformTargets[i] - waveform[i]) < 0.05) waveformTargets[i] = Math.random();
                    const bell = Math.sin((i / (numBars - 1)) * Math.PI);
                    const h = waveform[i] * maxBarHeight * bell * waveDp;
                    ctx.beginPath();
                    ctx.roundRect(startX + i * barWidth + 1, centerY - h, barWidth - 2, h * 2, 1);
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleClick = (e: MouseEvent) => {
            if (scrollProgress.get() < 0.8) return;
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            let hit = -1;
            const hitZone = isMobile ? 30 : 50;
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                if (Math.sqrt((clickX - node.x) ** 2 + (clickY - node.y) ** 2) < hitZone) { hit = i; break; }
            }
            if (hit !== -1) {
                targetIdxRef.current = hit;
                setActiveTelemetry({ title: nodes[hit].title, subtitle: nodes[hit].subtitle });
            }
        };

        window.addEventListener('resize', resize);
        container.addEventListener('click', handleClick);
        resize();
        draw(0);

        return () => {
            window.removeEventListener('resize', resize);
            container?.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full max-w-none aspect-square md:aspect-video relative mx-auto"
        >
            <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />

            {/* Center Telemetry Display */}
            {showTelemetry && activeTelemetry && (
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3A334B]/85 backdrop-blur-lg border border-white/10 p-3 md:p-6 rounded-lg shadow-2xl shadow-black/60 transition-all flex flex-col items-center duration-300 ${flicker ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                    style={{ transform: 'translate(-50%, -50%) translateZ(60px)' }}
                >
                    <p className="text-[14px] md:text-[36px] font-outfit font-bold text-white text-center mb-1 leading-tight">
                        {activeTelemetry.title}
                    </p>
                    <p className="text-[8px] md:text-[14px] font-mono font-bold text-[var(--primary)] uppercase whitespace-nowrap tracking-[0.2em] md:tracking-[0.3em]">
                        {activeTelemetry.subtitle}
                    </p>
                </div>
            )}
        </div>
    );
}
