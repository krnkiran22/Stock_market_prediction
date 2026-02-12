'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, TrendingUp, BarChart3, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[100px] -z-10" />

            <div className="w-full px-8 lg:px-24 xl:px-32">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-bold mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                                </span>
                                LIVE MARKET INTELLIGENCE
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-6xl lg:text-8xl font-black text-brand-text mb-8 tracking-tighter leading-[0.9]"
                        >
                            Predict Stocks <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                                with AI Edge
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl"
                        >
                            Institutional-grade market forecasting powered by Llama 3 and
                            specialized LSTM models. Gain the signals you need to beat the market.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                        >
                            <Link
                                href="/ai-chat"
                                className="inline-flex items-center justify-center gap-3 bg-brand-primary text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-brand-primary/90 transition-all shadow-2xl shadow-brand-primary/30 active:scale-95 group"
                            >
                                <Bot className="h-6 w-6" />
                                Start Analysis
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#tech-stack"
                                className="inline-flex items-center justify-center gap-2 bg-white text-brand-text border-2 border-gray-100 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-gray-50 transition-all active:scale-95"
                            >
                                View Stack
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 w-full rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-8 border-white">
                            <img
                                src="/images/hero_viz.png"
                                alt="Stock Market AI Visualization"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        </div>

                        {/* Floating Stats Card */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 z-20 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 hidden xl:block"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-brand-secondary/20 p-3 rounded-2xl">
                                    <ShieldCheck className="h-8 w-8 text-brand-secondary" />
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-brand-text">82.4%</div>
                                    <div className="text-sm font-bold text-gray-400">MODEL ACCURACY</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
