'use client';

import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    return (
        <div className="p-0">
            <form onSubmit={handleSubmit} className="w-full flex gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about any stock (e.g. Predict TCS for 30 days)..."
                    disabled={isLoading}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary disabled:opacity-50 transition-all"
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-brand-primary text-white p-2 rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center min-w-[44px] active:scale-95"
                >
                    {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
            </form>
        </div>
    );
}
