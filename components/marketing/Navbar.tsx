'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, MessageSquare, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
    fixed?: boolean;
}

export default function Navbar({ fixed = true }: NavbarProps) {
    return (
        <nav className={cn(
            "top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10",
            fixed ? "fixed" : "relative"
        )}>
            <div className="w-full px-8 lg:px-24 xl:px-32">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-3">
                        <div className="bg-brand-primary p-2 rounded-xl shadow-lg shadow-brand-primary/20">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter italic">STOCK ALGO<span className="text-brand-primary"> AI</span></span>
                    </div>

                    <div className="hidden md:flex items-center space-x-10">
                        <Link href="/" className="text-white/80 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">
                            Home
                        </Link>
                        <Link href="/ai-chat" className="text-white/80 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">
                            AI Terminal
                        </Link>
                        <Link href="#tech-stack" className="text-white/80 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">
                            About
                        </Link>
                        <Link
                            href="/ai-chat"
                            className="bg-white text-brand-text px-8 py-3 rounded-xl font-black text-sm hover:bg-brand-primary hover:text-white transition-all shadow-xl active:scale-95"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
