'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, TrendingUp, BarChart3, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background blobs for premium look */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-semibold mb-6">
                            Next-Gen Market Intelligence
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-extrabold text-brand-text mb-6 tracking-tight"
                    >
                        Predict Stock Prices <br />
                        <span className="text-brand-primary">with AI Precision</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-gray-600 mb-10 leading-relaxed"
                    >
                        Use Machine Learning & AI to forecast market movements
                        and make smarter investment decisions with institutional-grade insights.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/ai-chat"
                            className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-primary/90 transition-all shadow-xl hover:shadow-brand-primary/20 active:scale-95 group"
                        >
                            <Bot className="h-6 w-6" />
                            Start Predicting
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="inline-flex items-center justify-center gap-2 bg-white text-brand-text border-2 border-gray-100 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all active:scale-95"
                        >
                            Learn More
                        </Link>
                    </motion.div>

                    {/* Stats/Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-8 lg:gap-16"
                    >
                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                            <ShieldCheck className="h-5 w-5 text-brand-secondary" />
                            82%+ Accuracy
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                            <TrendingUp className="h-5 w-5 text-brand-secondary" />
                            Real-time Data
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                            <BarChart3 className="h-5 w-5 text-brand-secondary" />
                            Advanced ML Models
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
