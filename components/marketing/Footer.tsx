import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="w-full px-6 lg:px-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-primary p-1.5 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-brand-primary">Stock Predictor AI</span>
                    </div>

                    <div className="flex gap-8 text-sm text-gray-600">
                        <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-brand-primary transition-colors">Disclaimer</a>
                        <a href="#" className="hover:text-brand-primary transition-colors">Contact</a>
                    </div>

                    <div className="text-sm text-gray-500">
                        © 2025 Stock Predictor AI. All rights reserved.
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
                    <p>
                        Disclaimer: Stock market investments are subject to market risks. All predictions are AI-generated based on historical data
                        and should not be taken as financial advice. Always perform your own due diligence.
                    </p>
                </div>
            </div>
        </footer>
    );
}
