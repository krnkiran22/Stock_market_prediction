'use client';

import React from 'react';
import Navbar from '@/components/marketing/Navbar';
import HeroSection from '@/components/marketing/HeroSection';
import FeatureSection from '@/components/marketing/FeatureSection';
import HowItWorks from '@/components/marketing/HowItWorks';
import Footer from '@/components/marketing/Footer';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white overflow-auto scroll-smooth">
            <Navbar />
            <main>
                <HeroSection />
                <FeatureSection />
                <HowItWorks />
            </main>
            <Footer />
        </div>
    );
}
