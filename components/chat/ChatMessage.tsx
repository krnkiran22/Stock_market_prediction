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
            "flex w-full mb-5 sm:mb-6 animate-fadeIn",
            isAI ? "justify-start" : "justify-end"
        )}>
            <div className={cn(
                "flex max-w-[92%] sm:max-w-[85%]",
                isAI ? "flex-row" : "flex-row-reverse"
            )}>
                <div className={cn(
                    "flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mt-1 shadow-sm",
                    isAI ? "bg-brand-primary text-white mr-2 sm:mr-3" : "bg-gray-200 text-gray-600 ml-2 sm:ml-3"
                )}>
                    {isAI ? <Bot size={16} className="sm:w-5 sm:h-5" /> : <User size={16} className="sm:w-5 sm:h-5" />}
                </div>

                <div className={cn(
                    "p-3.5 sm:p-5 rounded-2xl lg:rounded-[1.5rem] text-[14px] sm:text-[15px] leading-[1.5] sm:leading-[1.6] tracking-tight font-medium overflow-hidden",
                    isAI
                        ? "bg-white border border-gray-100 text-slate-700 shadow-sm"
                        : "bg-brand-primary text-white shadow-lg shadow-brand-primary/10"
                )}>
                    <div className="whitespace-pre-wrap break-words">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}
