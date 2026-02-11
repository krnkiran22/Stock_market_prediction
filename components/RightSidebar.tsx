'use client'

import { useState } from 'react'

interface Message {
  id: number
  type: 'user' | 'ai'
  content: string
  timestamp: string
}

interface RiskMetric {
  label: string
  value: string
  isPositive: boolean
  percentage: number
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'ai',
    content: 'Hello! I\'m your AI trading assistant. Ask me anything about RELIANCE stock analysis, market trends, or portfolio optimization.',
    timestamp: '10:30 AM'
  },
  {
    id: 2,
    type: 'user',
    content: 'What are the key support levels for RELIANCE?',
    timestamp: '10:31 AM'
  },
  {
    id: 3,
    type: 'ai',
    content: 'Based on technical analysis, RELIANCE has strong support levels at ₹2,420 and ₹2,400. The immediate resistance is at ₹2,480. The stock is showing bullish momentum with RSI at 62.',
    timestamp: '10:31 AM'
  }
]

const riskMetrics: RiskMetric[] = [
  { label: 'Upside Potential', value: '+15.8%', isPositive: true, percentage: 70 },
  { label: 'Downside Risk', value: '-8.2%', isPositive: false, percentage: 30 },
  { label: 'Expected Volatility', value: '12.5%', isPositive: false, percentage: 45 },
  { label: 'Beta (vs NIFTY)', value: '1.15', isPositive: true, percentage: 60 },
]

// Risk Bar Component
function RiskBar({ metric }: { metric: RiskMetric }) {
  return (
    <div className="bg-trade-tertiary rounded p-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-trade-text-secondary">{metric.label}</p>
        <p className={`text-sm font-mono font-bold ${metric.isPositive ? 'text-trade-up' : 'text-trade-down'}`}>
          {metric.value}
        </p>
      </div>
      <div className="relative w-full h-1.5 bg-trade-main rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full transition-all duration-500 rounded-full ${
            metric.isPositive ? 'bg-trade-up' : 'bg-trade-down'
          }`}
          style={{ width: `${metric.percentage}%` }}
        />
      </div>
    </div>
  )
}

export default function RightSidebar() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputMessage, setInputMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'chat' | 'risk'>('chat')

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, newUserMessage])
    setInputMessage('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: 'I\'m analyzing your query. Based on current market data and ML models, RELIANCE shows strong fundamentals with positive momentum indicators.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <aside className="w-[360px] bg-trade-main border-l border-trade-border-light flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-trade-border-light bg-trade-secondary">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 px-4 py-3 text-xs font-semibold transition-colors ${
            activeTab === 'chat'
              ? 'text-trade-info border-b-2 border-trade-info bg-trade-tertiary'
              : 'text-trade-text-secondary hover:text-trade-text-primary hover:bg-trade-hover'
          }`}
        >
          AI ASSISTANT
        </button>
        <button
          onClick={() => setActiveTab('risk')}
          className={`flex-1 px-4 py-3 text-xs font-semibold transition-colors ${
            activeTab === 'risk'
              ? 'text-trade-info border-b-2 border-trade-info bg-trade-tertiary'
              : 'text-trade-text-secondary hover:text-trade-text-primary hover:bg-trade-hover'
          }`}
        >
          RISK & ANALYSIS
        </button>
      </div>

      {/* AI Assistant Section */}
      <div className={`flex-1 flex flex-col overflow-hidden ${activeTab === 'chat' ? 'block' : 'hidden'}`}>
        {/* Header */}
        <div className="p-4 border-b border-trade-border-light bg-trade-secondary">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-trade-up rounded-full animate-pulse"></div>
            <h2 className="text-sm font-semibold text-trade-text-primary">AI TRADING ASSISTANT</h2>
          </div>
          <p className="text-[10px] text-trade-text-tertiary">Powered by GPT-4 • Real-time Analysis</p>
        </div>

        {/* Chat Messages - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 pb-8 space-y-3 scroll-smooth">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded p-3 ${
                    message.type === 'user'
                      ? 'bg-trade-info text-white'
                      : 'bg-trade-tertiary text-trade-text-primary'
                  }`}
                >
                  <p className="text-xs leading-relaxed">{message.content}</p>
                </div>
                <p className="text-[9px] text-trade-text-tertiary mt-1 px-1">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-trade-border-medium bg-trade-secondary">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about stocks, trends, analysis..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-trade-tertiary border border-trade-border-light text-trade-text-primary text-xs px-3 py-2.5 rounded focus:outline-none focus:border-trade-info focus:ring-1 focus:ring-trade-info transition-all"
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-2.5 bg-trade-info hover:brightness-110 hover:shadow-md text-white rounded transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Risk Metrics Section */}
      <div className={`flex-1 flex flex-col overflow-hidden ${activeTab === 'risk' ? 'block' : 'hidden'}`}>
        <div className="flex-1 overflow-y-auto scroll-smooth pb-8">
        {/* Header */}
        <div className="p-4 border-b border-trade-border-light bg-trade-secondary sticky top-0 z-10">
          <h2 className="text-sm font-semibold text-trade-text-primary">RISK ANALYSIS</h2>
          <p className="text-[10px] text-trade-text-tertiary">Real-time Risk Assessment</p>
        </div>

        {/* Risk Metrics */}
        <div className="p-4 space-y-3">
          {riskMetrics.map((metric) => (
            <RiskBar key={metric.label} metric={metric} />
          ))}
        </div>

        {/* Overall Risk Score */}
        <div className="p-4 border-t border-trade-border-light bg-trade-secondary">
          <div className="bg-trade-tertiary rounded p-4 text-center">
            <p className="text-xs text-trade-text-secondary mb-2">OVERALL RISK SCORE</p>
            <div className="flex items-center justify-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-trade-warning">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <p className="text-2xl font-mono font-bold text-trade-warning">MODERATE</p>
            </div>
            <p className="text-[10px] text-trade-text-tertiary mt-2">Risk-Reward Ratio: 1.92</p>
          </div>
        </div>

        {/* Technical Indicators */}
        <div className="p-4 border-t border-trade-border-light">
          <h3 className="text-xs font-semibold text-trade-text-primary mb-3">TECHNICAL INDICATORS</h3>
          <div className="space-y-2">
            {[
              { name: 'RSI (14)', value: '62.5', signal: 'Neutral' },
              { name: 'MACD', value: '+0.45', signal: 'Bullish' },
              { name: 'Moving Avg', value: 'Above', signal: 'Bullish' },
            ].map((indicator) => (
              <div key={indicator.name} className="flex items-center justify-between text-xs">
                <span className="text-trade-text-secondary">{indicator.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-trade-text-primary">{indicator.value}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    indicator.signal === 'Bullish' ? 'bg-trade-up/20 text-trade-up' :
                    indicator.signal === 'Bearish' ? 'bg-trade-down/20 text-trade-down' :
                    'bg-trade-text-tertiary/20 text-trade-text-secondary'
                  }`}>
                    {indicator.signal}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News & Sentiment */}
        <div className="p-4 border-t border-trade-border-light bg-trade-secondary">
          <h3 className="text-xs font-semibold text-trade-text-primary mb-3">MARKET SENTIMENT</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-trade-text-secondary">News Sentiment</span>
              <span className="text-xs font-mono text-trade-up">+72% Positive</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-trade-text-secondary">Social Media</span>
              <span className="text-xs font-mono text-trade-up">+68% Bullish</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-trade-text-secondary">Analyst Rating</span>
              <span className="text-xs font-mono text-trade-up">Strong Buy</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </aside>
  )
}
