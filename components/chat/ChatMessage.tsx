'use client';

import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
    role: 'assistant' | 'user';
    content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
    const isAI = role === 'assistant';

    return (
        <div className={cn(
            "flex w-full mb-6 animate-fadeIn",
            isAI ? "justify-start" : "justify-end"
        )}>
            <div className={cn(
                "flex max-w-[85%] sm:max-w-[75%]",
                isAI ? "flex-row" : "flex-row-reverse"
            )}>
                <div className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1 shadow-sm",
                    isAI ? "bg-brand-primary text-white mr-3" : "bg-gray-200 text-gray-600 ml-3"
                )}>
                    {isAI ? <Bot size={20} /> : <User size={20} />}
                </div>

                <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    isAI
                        ? "bg-white border border-gray-100 text-gray-800 shadow-sm"
                        : "bg-brand-primary text-white shadow-md shadow-brand-primary/10"
                )}>
                    {/* We'll use a simple formatter for the prediction reports which are structured with emojis and lines */}
                    <div className="whitespace-pre-wrap">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}
