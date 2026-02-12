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
        <div className="border-t border-gray-200 bg-white p-4">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about any stock (e.g. Predict TCS for 30 days)..."
                    disabled={isLoading}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary disabled:opacity-50 transition-all"
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-brand-primary text-white p-3 rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center min-w-[50px] active:scale-95"
                >
                    {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                </button>
            </form>
        </div>
    );
}
