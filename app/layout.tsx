import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Finlytics - AI Stock Prediction Terminal',
  description: 'Professional institutional-grade stock market prediction and financial analysis platform powered by AI.',
  openGraph: {
    title: 'Finlytics - AI Stock Prediction Terminal',
    description: 'Professional institutional-grade stock market prediction platform',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finlytics - AI Stock Prediction Terminal',
    description: 'Professional institutional-grade stock market prediction platform',
    images: ['/images/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
