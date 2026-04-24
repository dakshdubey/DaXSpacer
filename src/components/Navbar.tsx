'use client';

import Link from 'next/link';
import { useEcosystem } from '@/context/EcosystemContext';

export default function Navbar() {
    const { ecosystem } = useEcosystem();

    if (ecosystem === 'gateway') return null;

    const isDA = ecosystem === 'da';
    const logoColor = isDA ? 'text-highlight' : 'text-primary';
    const accentColor = isDA ? 'bg-highlight' : 'bg-primary';

    const daNav = [
        { name: 'Projects', href: '/da/projects' },
        { name: 'Ideas', href: '/da/ideas' },
        { name: 'Library', href: '/da/library' },
        { name: 'About', href: '/da/about' },
    ];

    const spacerNav = [
        { name: 'Programs', href: '/spacer/programs' },
        { name: 'About', href: '/spacer/about' },
        { name: 'Contact', href: '/spacer/contact' },
    ];

    const currentNav = isDA ? daNav : spacerNav;

    return (
        <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
            <Link href="/" className={`text-xl font-outfit font-bold tracking-tighter ${logoColor}`}>
                {isDA ? 'DA' : 'SPACER'}
            </Link>

            <div className="flex items-center gap-8">
                {currentNav.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-[10px] uppercase tracking-[0.3em] font-light opacity-50 hover:opacity-100 transition-opacity"
                    >
                        {item.name}
                    </Link>
                ))}
                <div className={`h-4 w-[1px] ${accentColor} opacity-20`} />
                <Link
                    href={isDA ? '/spacer' : '/da'}
                    className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-80 hover:opacity-100"
                >
                    {isDA ? 'SPACER' : 'DA'}
                </Link>
            </div>
        </nav>
    );
}
