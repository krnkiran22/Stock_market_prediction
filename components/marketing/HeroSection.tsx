'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, TrendingUp, BarChart3, ShieldCheck, PlayCircle } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950">
            {/* Real Video / Animated Background Mix */}
            <div className="absolute inset-0 z-0">
                {/* Simulated Stock Market "Video" using high-quality GIF/Dynamic Gradient */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974717482-58-482f35d29e71?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-20 filter grayscale" />

                {/* Moving Candle Stream Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full flex justify-around items-end pb-20">
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: ['20%', '80%', '20%'], opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
                                className={`w-1 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-red-500'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Cyberpunk Accents */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/15 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="w-full px-8 lg:px-24 xl:px-32 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold mb-10 tracking-[0.2em] uppercase">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                                </span>
                                Quant-Level Neural Intelligence
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-7xl lg:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85] italic"
                        >
                            Trade with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-blue-400 to-brand-secondary">
                                Absolute Edge
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-xl text-gray-400 mb-14 leading-relaxed max-w-2xl font-light"
                        >
                            Experience the future of financial decision-making. Our proprietary ensemble
                            AI architecture predicts market volatility with institutional precision.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                        >
                            <Link
                                href="/ai-chat"
                                className="inline-flex items-center justify-center gap-4 bg-brand-primary text-white px-12 py-6 rounded-[2rem] text-xl font-black hover:bg-brand-primary/90 transition-all shadow-[0_20px_60px_-15px_rgba(37,99,235,0.4)] active:scale-95 group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 slant" />
                                <Bot className="h-7 w-7" />
                                Open Terminal
                                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link
                                href="#tech-stack"
                                className="inline-flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 px-12 py-6 rounded-[2rem] text-xl font-bold hover:bg-white/10 transition-all active:scale-95 backdrop-blur-md"
                            >
                                <BarChart3 className="h-6 w-6" />
                                View Engine
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 w-full aspect-video rounded-[3rem] overflow-hidden shadow-[0_48px_128px_-32px_rgba(0,0,0,0.8)] border border-white/20 group">
                            {/* Dummy Video Preview Surface */}
                            <div className="absolute inset-x-0 bottom-0 top-[60%] bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none" />
                            <img
                                src="https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?auto=format&fit=crop&q=80&w=2000"
                                alt="Real-time Analytics"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s] ease-linear"
                            />

                            {/* Overlay UI elements to simulate a "video" player/terminal */}
                            <div className="absolute top-8 left-8 flex items-center gap-3">
                                <div className="h-4 w-4 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-white text-[10px] uppercase font-bold tracking-[0.3em]">Live Feed / Node: 0x2A</span>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="p-8 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white cursor-pointer"
                                >
                                    <PlayCircle size={64} fill="currentColor" className="text-brand-primary" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Floating Tech Card */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-12 -right-12 z-20 bg-black/60 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-3xl border border-white/10 hidden xl:block min-w-[300px]"
                        >
                            <div className="flex items-center gap-6">
                                <div className="bg-brand-primary/20 p-4 rounded-2xl">
                                    <TrendingUp className="h-10 w-10 text-brand-primary" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Market Sentiment</div>
                                    <div className="text-4xl font-black text-white">+14.2%</div>
                                    <div className="flex items-center gap-2 text-[10px] text-green-400 font-bold">
                                        <ArrowRight className="h-3 w-3 -rotate-45" /> AGGRESSIVE BULLISH
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .slant {
                    transform: skewX(-20deg);
                }
            `}</style>
        </section>
    );
}
