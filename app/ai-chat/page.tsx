'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/marketing/Navbar';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import QuickActions from '@/components/chat/QuickActions';
import { getStockPrediction } from '@/services/groqApi';
import { Bot, LineChart } from 'lucide-react';

interface Message {
    role: 'assistant' | 'user';
    content: string;
}

export default function AIChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: `Hello! I'm your Stock Prediction Assistant. I can help you:
      
• Predict stock prices (7/30/90 days)
• Analyze trends and patterns
• Provide buy/sell/hold signals
• Explain market movements

Which stock would you like to analyze today?`
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (content: string) => {
        const userMessage: Message = { role: 'user', content };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const chatHistory = messages.map(m => ({
                role: m.role,
                content: m.content
            }));

            const aiResponse = await getStockPrediction(content, chatHistory);
            setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-brand-bg overflow-hidden">
            <Navbar />

            <main className="flex-1 mt-16 flex flex-col items-center justify-between overflow-hidden">
                {/* Chat Container */}
                <div className="w-full max-w-4xl flex-1 flex flex-col overflow-hidden px-4 py-6">
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {messages.map((msg, idx) => (
                            <ChatMessage key={idx} role={msg.role} content={msg.content} />
                        ))}
                        {isLoading && (
                            <div className="flex justify-start mb-6 animate-pulse">
                                <div className="bg-brand-primary/10 text-brand-primary p-4 rounded-2xl flex items-center gap-3">
                                    <Bot size={20} className="animate-bounce" />
                                    <span className="text-sm font-medium">Analyzing market data...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer Area with Quick Actions and Input */}
                    <div className="mt-4">
                        <QuickActions onAction={handleSendMessage} isLoading={isLoading} />
                        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />

                        <p className="text-[10px] text-center text-gray-400 mt-2 pb-2">
                            Institutional-grade AI predictions. Use for educational purposes only.
                        </p>
                    </div>
                </div>
            </main>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}</style>
        </div>
    );
}
