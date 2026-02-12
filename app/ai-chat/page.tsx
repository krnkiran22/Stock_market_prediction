'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/marketing/Navbar';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import QuickActions from '@/components/chat/QuickActions';
import { getStockPrediction } from '@/services/groqApi';
import { Bot, TrendingUp, BarChart3, Globe, Shield } from 'lucide-react';

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
        <div className="flex flex-col h-screen bg-slate-50 overflow-hidden relative font-sans">
            <Navbar />

            {/* Dynamic Background: Moving Stock Candles & Video Overlays */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Background Video Layer */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.05] grayscale" />

                {/* Vibrant Gradients */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-brand-primary/20 via-brand-secondary/10 to-transparent blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[100px]" />
                <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-brand-secondary/10 rounded-full blur-[80px]" />

                {/* Static/Moving Stock Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />

                {/* Simulated Moving "Candles" Animation Overlay */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="candle-container">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className={`candle ${i % 2 === 0 ? 'bull' : 'bear'}`} style={{
                                left: `${i * 5}%`,
                                height: `${20 + Math.random() * 40}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${3 + Math.random() * 2}s`
                            }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Centered App Layout */}
            <main className="flex-1 flex flex-col items-center justify-center relative z-10 pt-24 pb-8 px-4 lg:px-12 xl:px-24">

                <div className="text-center mb-8 hidden lg:block">
                    <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold tracking-widest uppercase mb-4">
                        <TrendingUp size={12} />
                        Neural Forecasting Engine Active
                    </span>
                    <h1 className="text-4xl font-extrabold text-brand-text mb-2 tracking-tight">AI Financial Terminal</h1>
                    <p className="text-sm text-gray-500 max-w-lg mx-auto">Analyze global symbols with real-time volatility tracking and deep predictive insights.</p>
                </div>

                {/* Main Chat Deck (Large & Centered) */}
                <div className="w-full max-w-[1400px] h-full lg:h-[85vh] flex flex-col bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/80 shadow-[0_32px_128px_-32px_rgba(37,99,235,0.15)] overflow-hidden ring-1 ring-black/[0.03]">

                    {/* Premium Header */}
                    <div className="px-10 py-8 border-b border-gray-100 bg-white/40 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="p-3 bg-brand-primary text-white rounded-2xl shadow-lg ring-4 ring-brand-primary/10">
                                    <Bot size={24} />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                            </div>
                            <div>
                                <h2 className="text-lg font-heavy text-brand-text flex items-center gap-2">
                                    Predictor Core v4.1
                                    <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter">Pro</span>
                                </h2>
                                <div className="flex items-center gap-3 text-xs text-brand-text/50">
                                    <span className="flex items-center gap-1"><Globe size={11} /> Global Markets</span>
                                    <span className="flex items-center gap-1"><Shield size={11} /> Encrypted Data</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden sm:flex items-center gap-6">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">System Status</span>
                                <span className="text-xs font-bold text-green-600">Operational</span>
                            </div>
                            <div className="h-10 w-[1px] bg-gray-100" />
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Neural Lag</span>
                                <span className="text-xs font-bold text-brand-primary">12ms</span>
                            </div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white/10 pt-10">
                        <div className="max-w-[1100px] mx-auto w-full px-6 lg:px-12 pb-12">
                            {messages.map((msg, idx) => (
                                <ChatMessage key={idx} role={msg.role} content={msg.content} />
                            ))}
                            {isLoading && (
                                <div className="flex justify-start mb-8 animate-pulse px-4">
                                    <div className="bg-brand-primary/10 text-brand-primary p-5 rounded-[2rem] flex items-center gap-4 border border-brand-primary/5 shadow-sm">
                                        <div className="relative">
                                            <Bot size={22} className="animate-spin-slow" />
                                            <div className="absolute inset-0 bg-brand-primary/20 blur-md rounded-full" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold tracking-tight">Processing Market Signals...</span>
                                            <span className="text-[10px] opacity-70">Running multi-model ensemble analysis</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Chat Input Group */}
                    <div className="bg-white/80 backdrop-blur-3xl border-t border-gray-100 p-8 lg:p-12">
                        <div className="max-w-[1100px] mx-auto w-full">
                            <QuickActions onAction={handleSendMessage} isLoading={isLoading} />
                            <div className="mt-6">
                                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                            </div>

                            <div className="flex items-center justify-center gap-8 mt-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest"><BarChart3 size={14} /> Technicals</div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest"><Globe size={14} /> Macro Data</div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest"><Shield size={14} /> SEC Filings</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                @keyframes float-candles {
                    0% { transform: translateY(0) scale(1); opacity: 0.1; }
                    50% { transform: translateY(-30px) scale(1.05); opacity: 0.2; }
                    100% { transform: translateY(0) scale(1); opacity: 0.1; }
                }
                
                .candle-container {
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                    height: 100%;
                    width: 100%;
                    padding-bottom: 50px;
                }

                .candle {
                    width: 6px;
                    border-radius: 4px;
                    background: #cbd5e1;
                    animation: float-candles linear infinite;
                    position: absolute;
                    bottom: 0;
                }

                .bull { background: #22c55e; box-shadow: 0 0 15px rgba(34, 197, 94, 0.4); }
                .bear { background: #ef4444; box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }

                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: white;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E5E7EB;
                    border-radius: 10px;
                    border: 2px solid white;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #D1D5DB;
                }

                @media (max-width: 1024px) {
                    .pt-56 { padding-top: 14rem; }
                }
            `}</style>
        </div>
    );
}
