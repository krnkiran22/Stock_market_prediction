'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

const quickActions = [
    {
        label: "RELIANCE",
        prompt: "Predict Reliance Industries stock price for the next 30 days"
    },
    {
        label: "TCS",
        prompt: "Predict TCS stock price for the next 30 days"
    },
    {
        label: "SBIN",
        prompt: "Predict SBI stock price for the next 30 days"
    },
    {
        label: "ADANI",
        prompt: "Predict Adani Enterprises stock price for the next 30 days"
    },
    {
        label: "INFY",
        prompt: "Predict Infosys stock price for the next 30 days"
    },
    {
        label: "HDFC BANK",
        prompt: "Predict HDFC Bank stock price for the next 30 days"
    },
    {
        label: "TATA MOTORS",
        prompt: "Predict Tata Motors stock price for the next 30 days"
    },
    {
        label: "WIPRO",
        prompt: "Predict Wipro stock price for the next 30 days"
    }
];

interface QuickActionsProps {
    onAction: (prompt: string) => void;
    isLoading: boolean;
}

export default function QuickActions({ onAction, isLoading }: QuickActionsProps) {
    return (
        <div className="w-full">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                <Sparkles size={10} className="text-brand-primary" />
                Quick Analysis
            </div>

            {/* Scrollable container for mobile, wrapping for desktop */}
            <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-visible gap-2 pb-2 sm:pb-0 custom-scrollbar-hide">
                {quickActions.map((action, idx) => (
                    <button
                        key={idx}
                        onClick={() => !isLoading && onAction(action.prompt)}
                        disabled={isLoading}
                        className="flex-shrink-0 bg-white border border-gray-100 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
                    >
                        {action.label}
                    </button>
                ))}
            </div>

            <style jsx>{`
                .custom-scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .custom-scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
