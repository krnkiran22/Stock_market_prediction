'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
    fixed?: boolean;
}

export default function Navbar({ fixed = true }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={cn(
            "top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 transition-all duration-300",
            fixed ? "fixed" : "relative"
        )}>
            <div className="w-full px-6 lg:px-24 xl:px-32">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        <div className="bg-brand-primary p-2 rounded-xl shadow-lg shadow-brand-primary/20">
                            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <span className="text-xl sm:text-2xl font-black text-white tracking-tighter italic uppercase">
                            FINLYTICS
                        </span>
                    </Link>

                    {/* Desktop Menu */}
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

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-white/80 hover:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 animate-slideIn">
                    <div className="flex flex-col p-8 space-y-6">
                        <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-white text-lg font-bold uppercase tracking-widest">
                            Home
                        </Link>
                        <Link href="/ai-chat" onClick={() => setIsMenuOpen(false)} className="text-white text-lg font-bold uppercase tracking-widest">
                            AI Terminal
                        </Link>
                        <Link href="#tech-stack" onClick={() => setIsMenuOpen(false)} className="text-white text-lg font-bold uppercase tracking-widest">
                            About
                        </Link>
                        <Link
                            href="/ai-chat"
                            onClick={() => setIsMenuOpen(false)}
                            className="bg-brand-primary text-white px-6 py-4 rounded-xl font-black text-center text-lg shadow-xl shadow-brand-primary/20"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
