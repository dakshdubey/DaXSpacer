'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type Ecosystem = 'gateway' | 'da' | 'spacer';

interface EcosystemContextType {
    ecosystem: Ecosystem;
    setEcosystem: (eco: Ecosystem) => void;
}

const EcosystemContext = createContext<EcosystemContextType | undefined>(undefined);

export function EcosystemProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [ecosystem, setEcosystem] = useState<Ecosystem>('gateway');

    useEffect(() => {
        if (pathname.startsWith('/da')) {
            setEcosystem('da');
        } else if (pathname.startsWith('/spacer')) {
            setEcosystem('spacer');
        } else {
            setEcosystem('gateway');
        }
    }, [pathname]);

    return (
        <EcosystemContext.Provider value={{ ecosystem, setEcosystem }}>
            {children}
        </EcosystemContext.Provider>
    );
}

export function useEcosystem() {
    const context = useContext(EcosystemContext);
    if (context === undefined) {
        throw new Error('useEcosystem must be used within an EcosystemProvider');
    }
    return context;
}
