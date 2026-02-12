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
        <div className="flex flex-col h-screen bg-brand-bg overflow-hidden relative">
            <Navbar />

            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] -z-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[80px] -z-0 pointer-events-none" />

            <main className="flex-1 flex flex-col overflow-hidden relative z-10 pt-16">
                {/* Chat Container */}
                <div className="w-full flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 custom-scrollbar">
                        <div className="max-w-[1400px] mx-auto w-full">
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
                    </div>

                    {/* Footer Area with Quick Actions and Input */}
                    <div className="bg-white/50 backdrop-blur-sm border-t border-gray-100 p-6">
                        <div className="max-w-[1400px] mx-auto w-full">
                            <QuickActions onAction={handleSendMessage} isLoading={isLoading} />
                            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />

                            <p className="text-[10px] text-center text-gray-400 mt-3">
                                Institutional-grade AI predictions. Use for educational purposes only.
                            </p>
                        </div>
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
