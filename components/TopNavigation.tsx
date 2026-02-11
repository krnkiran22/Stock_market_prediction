'use client'

import { useState, useEffect, useRef } from 'react'

const tickerData = [
  { symbol: 'NIFTY 50', price: '21,456.75', change: '+125.30', changePercent: '+0.59%', isPositive: true },
  { symbol: 'SENSEX', price: '71,234.56', change: '+421.45', changePercent: '+0.60%', isPositive: true },
  { symbol: 'BANKNIFTY', price: '45,678.90', change: '-234.50', changePercent: '-0.51%', isPositive: false },
  { symbol: 'RELIANCE', price: '2,450.30', change: '+15.20', changePercent: '+0.62%', isPositive: true },
  { symbol: 'TCS', price: '3,820.50', change: '-22.10', changePercent: '-0.57%', isPositive: false },
  { symbol: 'INFY', price: '1,567.80', change: '+8.90', changePercent: '+0.57%', isPositive: true },
]

export default function TopNavigation() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileMenu])

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className="h-[60px] bg-trade-main border-b border-trade-border-medium flex items-center px-6 gap-6 flex-shrink-0">
      {/* Logo/Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-trade-info rounded flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <div>
          <h1 className="text-base font-bold text-trade-text-primary">TRADE<span className="text-trade-info">PRO</span></h1>
          <p className="text-[9px] text-trade-text-tertiary uppercase tracking-wider">Market Intelligence</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-80">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-trade-text-tertiary">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search stocks, indices, or symbols..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearch}
          className="w-full bg-trade-tertiary border border-trade-border-light text-trade-text-primary text-sm pl-10 pr-4 py-2.5 rounded focus:outline-none focus:border-trade-info focus:ring-1 focus:ring-trade-info transition-all"
        />
      </div>

      {/* Market Status */}
      <div className="flex items-center gap-2 px-4 py-2 bg-trade-secondary border border-trade-border-light rounded">
        <div className="w-2 h-2 bg-trade-up rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-trade-text-primary">Market Open</span>
        <span className="text-[10px] text-trade-text-tertiary">• 09:15 IST</span>
      </div>

      {/* Ticker - Scrolling */}
      <div className="flex-1 overflow-hidden relative">
        <div className="flex gap-8 animate-scroll whitespace-nowrap">
          {/* Duplicate for seamless loop */}
          {[...tickerData, ...tickerData].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 font-mono text-xs">
              <span className="text-trade-text-secondary">{item.symbol}</span>
              <span className="text-trade-text-primary font-medium">{item.price}</span>
              <span className={item.isPositive ? 'text-trade-up' : 'text-trade-down'}>
                {item.changePercent}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="relative" ref={profileRef}>
        <button 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-3 px-4 py-2 hover:bg-trade-hover border border-trade-border-light rounded transition-all group"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-trade-text-secondary group-hover:text-trade-info transition-colors">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <div className="text-left">
            <p className="text-xs font-medium text-trade-text-primary">Portfolio</p>
            <p className="text-[10px] text-trade-text-tertiary">₹16.5L</p>
          </div>
        </button>

        {/* Profile Dropdown Menu */}
        {showProfileMenu && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-trade-secondary border border-trade-border-medium rounded shadow-trade-lg z-50">
            <div className="p-4 border-b border-trade-border-light">
              <p className="text-sm font-semibold text-trade-text-primary">Trading Account</p>
              <p className="text-xs text-trade-text-tertiary mt-1">ID: TRP-2026-8475</p>
            </div>
            <div className="p-3">
              <div className="space-y-1">
                <button 
                  onClick={() => alert('Opening Portfolio View...')}
                  className="w-full text-left px-3 py-2 text-sm text-trade-text-primary hover:bg-trade-hover rounded transition-colors"
                >
                  View Portfolio
                </button>
                <button 
                  onClick={() => alert('Opening Transaction History...')}
                  className="w-full text-left px-3 py-2 text-sm text-trade-text-primary hover:bg-trade-hover rounded transition-colors"
                >
                  Transaction History
                </button>
                <button 
                  onClick={() => alert('Opening Account Settings...')}
                  className="w-full text-left px-3 py-2 text-sm text-trade-text-primary hover:bg-trade-hover rounded transition-colors"
                >
                  Account Settings
                </button>
                <button 
                  onClick={() => alert('Opening Risk Analysis...')}
                  className="w-full text-left px-3 py-2 text-sm text-trade-text-primary hover:bg-trade-hover rounded transition-colors"
                >
                  Risk Analysis
                </button>
              </div>
            </div>
            <div className="p-3 border-t border-trade-border-light">
              <button 
                onClick={() => {
                  setShowProfileMenu(false)
                  alert('Signing out...')
                }}
                className="w-full text-left px-3 py-2 text-sm text-trade-down hover:bg-trade-hover rounded transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </nav>
  )
}
