'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

const quickActions = [
    {
        label: "Predict RELIANCE",
        prompt: "Predict Reliance Industries stock price for the next 30 days"
    },
    {
        label: "Predict TCS",
        prompt: "Predict TCS stock price for the next 30 days"
    },
    {
        label: "Predict INFY",
        prompt: "Predict Infosys stock price for the next 30 days"
    },
    {
        label: "Predict SBIN",
        prompt: "Predict SBI stock price for the next 30 days"
    },
    {
        label: "Predict HDFC Bank",
        prompt: "Predict HDFC Bank stock price for the next 30 days"
    },
    {
        label: "Predict TATA MOTORS",
        prompt: "Predict Tata Motors stock price for the next 30 days"
    },
    {
        label: "Predict ADANI",
        prompt: "Predict Adani Enterprises stock price for the next 30 days"
    },
    {
        label: "Predict WIPRO",
        prompt: "Predict Wipro stock price for the next 30 days"
    },
    {
        label: "Market Outlook",
        prompt: "What is the current market outlook for Indian stocks?"
    }
];

interface QuickActionsProps {
    onAction: (prompt: string) => void;
    isLoading: boolean;
}

export default function QuickActions({ onAction, isLoading }: QuickActionsProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-6 animate-fadeIn">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 w-full ml-1">
                <Sparkles size={12} className="text-brand-accent" />
                Quick actions
            </div>
            {quickActions.map((action, idx) => (
                <button
                    key={idx}
                    onClick={() => !isLoading && onAction(action.prompt)}
                    disabled={isLoading}
                    className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition-all active:scale-95 disabled:opacity-50"
                >
                    {action.label}
                </button>
            ))}
        </div>
    );
}
