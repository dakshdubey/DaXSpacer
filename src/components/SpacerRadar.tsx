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
        { title: '30+', subtitle: 'INDUSTRY MENTORS' },
        { title: '98%', subtitle: 'CONFIDENCE BOOST' },
        { title: '03+', subtitle: 'CORE PROGRAMS' },
        { title: 'LIVE', subtitle: 'STUDIO SIMULATIONS' },
        { title: '100%', subtitle: 'OUTPUT DRIVEN' },
        { title: 'GLOBAL', subtitle: 'NETWORK ACCESS' },
        { title: 'AI', subtitle: 'EMPOWERED WORKFLOWS' },
        { title: '5+', subtitle: 'WORKSHOP MODULES' },
        { title: 'COMPUTATIONAL', subtitle: 'DESIGN THINKING' },
        { title: 'ENVIRONMENTAL', subtitle: 'INTELLIGENCE' },
        { title: 'ADVANCED', subtitle: 'TECH INTEGRATION' },
        { title: 'PORTFOLIO', subtitle: 'GRADE RESULTS' },
        { title: 'PRACTICAL', subtitle: 'MASTERY FOCUS' },
        { title: '0%', subtitle: 'THEORY, 100% ACTION' },
        { title: 'NEW', subtitle: 'UPCOMING BATCH INTAKE' }
    ];

    const leaderLabels = {
        topRight: ['AI Sync', 'Studio Engine', 'Neural Mapping', 'Data Telemetry', 'API Hub'],
        bottomLeft: ['Practical Mastery', 'Industry Ready', 'Portfolio Grade', 'Studio Workflow', 'Ecosystem']
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
            centerX = width / 2;
            centerY = height / 2;
            // Robust radius calculation to avoid clipping
            maxRadius = Math.min(width * 0.45, height * 0.55);
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
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 10 + pulse * 8, 0, Math.PI * 2);
                    ctx.strokeStyle = node.color;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.fillStyle = node.color;
                } else {
                    ctx.fillStyle = node.color;
                }
                ctx.beginPath();
                ctx.arc(node.x, node.y, isHighlight ? 6 : 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            // Draw ANimated Leader Lines
            if (easedDp > 0.4) {
                const lineProgress = Math.min(1, (easedDp - 0.4) / 0.6);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * lineProgress})`;
                ctx.lineWidth = 0.5;
                ctx.font = '10px monospace';

                // Top Right
                leaderLabels.topRight.forEach((label, i) => {
                    const node = nodes[i + 1];
                    const destX = width - 140;
                    const destY = 80 + i * 25;

                    const midX = node.x + (destX - 30 - node.x) * lineProgress;
                    const midY = node.y + (destY - node.y) * lineProgress;

                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(midX, midY);
                    if (lineProgress > 0.95) ctx.lineTo(destX, destY);
                    ctx.stroke();

                    if (lineProgress > 0.9) {
                        ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * (lineProgress - 0.9) * 10})`;
                        ctx.fillText(label.toUpperCase(), destX + 5, destY + 2);
                    }
                });

                // Bottom Left
                leaderLabels.bottomLeft.forEach((label, i) => {
                    const node = nodes[nodes.length - 1 - i];
                    const destX = 140;
                    const destY = height - 150 - i * 25;

                    const midX = node.x + (destX + 30 - node.x) * lineProgress;
                    const midY = node.y + (destY - node.y) * lineProgress;

                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(midX, midY);
                    if (lineProgress > 0.95) ctx.lineTo(destX, destY);
                    ctx.stroke();

                    if (lineProgress > 0.9) {
                        ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * (lineProgress - 0.9) * 10})`;
                        ctx.textAlign = 'right';
                        ctx.fillText(label.toUpperCase(), destX - 5, destY + 2);
                        ctx.textAlign = 'left';
                    }
                });
            }

            // Draw center waveform
            if (easedDp > 0.2) {
                const waveformWidth = maxRadius * 1.4;
                const barWidth = waveformWidth / numBars;
                const maxBarHeight = maxRadius * 0.45;
                const startX = centerX - waveformWidth / 2;
                const waveDp = Math.min(1, (easedDp - 0.2) / 0.8);
                ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * waveDp})`;
                for (let i = 0; i < numBars; i++) {
                    waveform[i] += (waveformTargets[i] - waveform[i]) * 0.1;
                    if (Math.abs(waveformTargets[i] - waveform[i]) < 0.05) waveformTargets[i] = Math.random();
                    const bell = Math.sin((i / (numBars - 1)) * Math.PI);
                    const h = waveform[i] * maxBarHeight * bell * waveDp;
                    ctx.beginPath();
                    ctx.roundRect(startX + i * barWidth + 1, centerY - h, barWidth - 2, h * 2, 2);
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
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                if (Math.sqrt((clickX - node.x) ** 2 + (clickY - node.y) ** 2) < 50) { hit = i; break; }
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
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full max-w-[1600px] aspect-video relative mx-auto"
        >
            <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />

            {/* Center Telemetry Display (Pinned to true center) */}
            {showTelemetry && activeTelemetry && (
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3A334B]/85 backdrop-blur-lg border border-white/10 p-6 rounded-lg shadow-2xl shadow-black/60 transition-all flex flex-col items-center duration-300 ${flicker ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                    style={{ transform: 'translate(-50%, -50%) translateZ(60px)' }}
                >
                    <p className="text-[20px] md:text-[36px] font-outfit font-bold text-white text-center mb-1">
                        {activeTelemetry.title}
                    </p>
                    <p className="text-[12px] md:text-[14px] font-mono font-bold text-[var(--primary)] uppercase whitespace-nowrap tracking-[0.3em]">
                        {activeTelemetry.subtitle}
                    </p>
                </div>
            )}
        </div>
    );
}
