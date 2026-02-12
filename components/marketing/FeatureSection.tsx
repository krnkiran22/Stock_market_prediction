'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Cpu, BarChart3 } from 'lucide-react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
        <div className="bg-brand-bg w-14 h-14 rounded-2xl flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-brand-text mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
);

export default function FeatureSection() {
    const features = [
        {
            icon: <TrendingUp className="h-7 w-7" />,
            title: "ML-Powered Predictions",
            description: "LSTM, XGBoost, Prophet & ARIMA models analyze historical patterns to forecast future price movements."
        },
        {
            icon: <Cpu className="h-7 w-7" />,
            title: "AI Insights",
            description: "Groq Llama 3 LLM explains complex technical predictions in plain English for clear decision-making."
        },
        {
            icon: <BarChart3 className="h-7 w-7" />,
            title: "Real-time Analysis",
            description: "Get instant predictions with confidence scores and risk assessments based on current market conditions."
        }
    ];

    return (
        <section className="py-24 bg-brand-bg">
            <div className="w-full px-8 lg:px-24 xl:px-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-text mb-4">Powerful Features</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Our advanced AI system combines multiple technical models to give you the most accurate market outlook.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} {...feature} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
