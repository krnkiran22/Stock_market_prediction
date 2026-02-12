'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, BrainCircuit, LineChart } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            icon: <Search className="h-8 w-8 text-white" />,
            title: "Enter Stock Name",
            description: "Type the name or ticker symbol of any stock you want to analyze."
        },
        {
            icon: <BrainCircuit className="h-8 w-8 text-white" />,
            title: "AI Analyzes",
            description: "Our system runs the data through LSTM, XGBoost, and other ML models."
        },
        {
            icon: <LineChart className="h-8 w-8 text-white" />,
            title: "Get Predictions",
            description: "Receive price targets, signals, and a detailed institutional-grade report."
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="w-full px-8 lg:px-24 xl:px-32">
                <div className="text-center mb-20">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-text mb-4">How It Works</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Get professional market insights in three simple steps.</p>
                </div>

                <div className="relative">
                    {/* Connector Line (hidden on mobile) */}
                    <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-100 -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 text-center">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                className="flex flex-col items-center"
                            >
                                <div className="bg-brand-primary w-24 h-24 rounded-full flex items-center justify-center mb-8 relative shadow-lg shadow-brand-primary/20">
                                    <div className="absolute -top-2 -right-2 bg-brand-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">
                                        {idx + 1}
                                    </div>
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-brand-text mb-4">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
