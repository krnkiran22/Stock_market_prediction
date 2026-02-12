'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/marketing/Navbar';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import QuickActions from '@/components/chat/QuickActions';
import { getStockPrediction } from '@/services/groqApi';
import { Bot, TrendingUp, Globe } from 'lucide-react';

interface Message {
    role: 'assistant' | 'user';
    content: string;
}

export default function AIChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: `Hello! I'm your Stock Prediction Assistant. I can help you:
      
• Predict stock prices (e.g. RELIANCE, TCS, SBIN, ADANI)
• Analyze real-time market trends
• Provide buy/sell/hold signals
• Explain complex volatility patterns

Currently tracking: **RELIANCE, TCS, INFY, HDFC BANK, SBIN, ADANI, TATA MOTORS, WIPRO**, and more.

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
        <div className="flex flex-col h-[100dvh] bg-slate-50 overflow-hidden relative font-sans min-h-0">
            <Navbar />

            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.03] grayscale" />
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-brand-primary/10 via-brand-secondary/5 to-transparent blur-[120px]" />

                <div className="absolute inset-0 overflow-hidden opacity-10">
                    <div className="candle-container">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className={`candle ${i % 2 === 0 ? 'bull' : 'bear'}`} style={{
                                left: `${i * 8}%`,
                                height: `${15 + Math.random() * 30}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${4 + Math.random() * 2}s`
                            }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Application Area */}
            <main className="flex-1 flex flex-col items-center justify-start lg:justify-center relative z-10 pt-20 lg:pt-24 pb-4 px-2 sm:px-6 lg:px-12 xl:px-24 min-h-0 overflow-hidden">

                {/* Responsive Header */}
                <div className="text-center mb-4 lg:mb-8 shrink-0 mt-2 lg:mt-0">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] sm:text-[10px] font-bold tracking-widest uppercase mb-2">
                        <TrendingUp size={12} />
                        Neural Engine Active
                    </span>
                    <h1 className="text-xl sm:text-4xl font-extrabold text-brand-text mb-1 tracking-tight">Finlytics Terminal</h1>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto px-4 hidden sm:block">Real-time market analysis and predictive insights.</p>
                </div>

                {/* Main Chat Deck */}
                <div className="w-full max-w-[1400px] flex-1 lg:flex-none lg:h-[75vh] flex flex-col bg-white/70 backdrop-blur-2xl rounded-3xl lg:rounded-[2.5rem] border border-white/80 shadow-2xl overflow-hidden min-h-0">

                    {/* Header */}
                    <div className="px-4 py-3 lg:px-10 lg:py-6 border-b border-gray-100 bg-white/40 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2 lg:p-3 bg-brand-primary text-white rounded-xl lg:rounded-2xl shadow-lg ring-2 lg:ring-4 ring-brand-primary/10">
                                <Bot size={18} className="lg:w-6 lg:h-6" />
                            </div>
                            <div>
                                <h2 className="text-xs lg:text-lg font-black text-brand-text flex items-center gap-2">
                                    Finlytics v4.1
                                    <span className="hidden sm:inline-block text-[10px] bg-black text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">Pro</span>
                                </h2>
                                <div className="flex items-center gap-2 text-[8px] lg:text-[10px] text-brand-text/50 font-bold uppercase tracking-widest">
                                    <Globe size={10} /> Live Markets
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[9px] lg:text-[10px] font-bold text-green-600 uppercase tracking-tighter">Connected</span>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 pb-2 min-h-0 overscroll-contain touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
                        <div className="max-w-[1100px] mx-auto w-full px-3 lg:px-12">
                            {messages.map((msg, idx) => (
                                <ChatMessage key={idx} role={msg.role} content={msg.content} />
                            ))}
                            {isLoading && (
                                <div className="flex justify-start mb-6 animate-pulse px-2">
                                    <div className="bg-brand-primary/5 text-brand-primary p-3 rounded-2xl flex items-center gap-3 border border-brand-primary/10">
                                        <Bot size={16} className="animate-spin-slow" />
                                        <span className="text-[10px] font-bold">Forecasting...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Chat Input Area */}
                    <div className="bg-white/90 backdrop-blur-3xl border-t border-gray-100 p-3 sm:p-6 lg:p-8 shrink-0">
                        <div className="max-w-[1100px] mx-auto w-full">
                            <QuickActions onAction={handleSendMessage} isLoading={isLoading} />
                            <div className="mt-3 lg:mt-4">
                                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                            </div>
                            <p className="text-[9px] text-center text-gray-400 mt-4 lg:mt-6">
                                Educational purposes only. Market risks apply.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                @keyframes float-candles {
                    0% { transform: translateY(0); opacity: 0.1; }
                    50% { transform: translateY(-20px); opacity: 0.2; }
                    100% { transform: translateY(0); opacity: 0.1; }
                }
                .candle-container { display: flex; justify-content: space-around; align-items: flex-end; height: 100%; width: 100%; position: relative; }
                .candle { width: 4px; border-radius: 2px; animation: float-candles linear infinite; position: absolute; bottom: 0; }
                .bull { background: #22c55e; }
                .bear { background: #ef4444; }
                .animate-spin-slow { animation: spin 3s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
            `}</style>
        </div>
    );
}
