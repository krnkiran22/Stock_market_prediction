'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, MessageSquare, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-primary p-1.5 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-brand-primary">Stock Predictor AI</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/home" className="text-brand-text hover:text-brand-primary transition-colors font-medium">
                            Home
                        </Link>
                        <Link href="/ai-chat" className="text-brand-text hover:text-brand-primary transition-colors font-medium">
                            AI Chat
                        </Link>
                        <Link href="#about" className="text-brand-text hover:text-brand-primary transition-colors font-medium">
                            About
                        </Link>
                        <Link
                            href="/ai-chat"
                            className="bg-brand-primary text-white px-5 py-2 rounded-full font-medium hover:bg-brand-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            Start Predicting
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
