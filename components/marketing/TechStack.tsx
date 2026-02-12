'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const stackData = [
    {
        title: "FRONTEND",
        headerColor: "bg-blue-500",
        items: ["React.js / Next.js", "Tailwind CSS", "Recharts", "Axios"]
    },
    {
        title: "AI / ML",
        headerColor: "bg-purple-500",
        items: ["Groq Cloud LLM", "LLaMA 3.3 70B", "TensorFlow/Keras", "Scikit-learn"]
    },
    {
        title: "ML MODELS",
        headerColor: "bg-pink-500",
        items: ["LSTM Neural Network", "XGBoost", "Facebook Prophet", "ARIMA"]
    },
    {
        title: "DATA & APIs",
        headerColor: "bg-orange-500",
        items: ["Yahoo Finance", "Alpha Vantage", "REST APIs", "JSON"]
    }
];

export default function TechStack() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="w-full px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-black text-brand-primary tracking-tight mb-4">
                        TECHNOLOGY STACK
                    </h2>
                    <div className="h-1.5 w-24 bg-brand-primary mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stackData.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col rounded-xl overflow-hidden shadow-xl border border-gray-100 h-full"
                        >
                            <div className={cn("py-4 text-center font-bold text-white tracking-widest text-lg", category.headerColor)}>
                                {category.title}
                            </div>
                            <div className="flex-1 bg-gray-50/50 p-6 flex flex-col gap-4">
                                {category.items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        className="bg-white p-4 rounded-lg shadow-sm text-center font-medium text-gray-700 border border-gray-50 cursor-default hover:border-brand-primary/20 hover:shadow-md transition-all"
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Requirements Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 py-6 border-t border-gray-100"
                >
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-semibold text-gray-400 uppercase tracking-widest">
                        Requirements: Intel i5+ • 8GB RAM • Windows/Linux • VS Code • Node.js • Python 3.x
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
