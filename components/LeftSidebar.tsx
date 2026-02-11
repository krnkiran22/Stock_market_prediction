'use client'

import { useState } from 'react'

interface StockData {
  symbol: string
  name: string
  price: string
  change: string
  changePercent: string
  isPositive: boolean
  sparklineData: number[]
}

const watchlistStocks: StockData[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    price: '2,450.30',
    change: '+15.20',
    changePercent: '+0.62%',
    isPositive: true,
    sparklineData: [2420, 2425, 2418, 2432, 2428, 2435, 2440, 2438, 2445, 2450]
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy',
    price: '3,820.50',
    change: '-22.10',
    changePercent: '-0.57%',
    isPositive: false,
    sparklineData: [3850, 3845, 3840, 3835, 3830, 3828, 3825, 3822, 3820, 3820]
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    price: '1,567.80',
    change: '+8.90',
    changePercent: '+0.57%',
    isPositive: true,
    sparklineData: [1555, 1558, 1560, 1562, 1565, 1563, 1566, 1568, 1567, 1568]
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank',
    price: '1,645.20',
    change: '-8.50',
    changePercent: '-0.51%',
    isPositive: false,
    sparklineData: [1655, 1652, 1650, 1648, 1646, 1645, 1644, 1645, 1646, 1645]
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank',
    price: '985.45',
    change: '+5.75',
    changePercent: '+0.59%',
    isPositive: true,
    sparklineData: [975, 978, 980, 982, 983, 984, 985, 986, 985, 985]
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel',
    price: '1,234.60',
    change: '+12.40',
    changePercent: '+1.01%',
    isPositive: true,
    sparklineData: [1210, 1215, 1220, 1222, 1225, 1228, 1230, 1232, 1234, 1235]
  }
]

// Mini Sparkline Component
function MiniSparkline({ data, isPositive }: { data: number[], isPositive: boolean }) {
  const width = 80
  const height = 24
  const padding = 2

  const minValue = Math.min(...data)
  const maxValue = Math.max(...data)
  const range = maxValue - minValue || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding
    const y = height - padding - ((value - minValue) / range) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="opacity-80">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? '#00C896' : '#FF3B69'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Stock Card Component
function StockCard({ stock, isActive, onClick }: { stock: StockData, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 border-b border-trade-border-light hover:bg-trade-hover transition-all text-left group ${
        isActive ? 'bg-trade-tertiary border-l-2 border-l-trade-info' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-sm font-semibold text-trade-text-primary">{stock.symbol}</h3>
          <p className="text-[10px] text-trade-text-tertiary truncate">{stock.name}</p>
        </div>
        <MiniSparkline data={stock.sparklineData} isPositive={stock.isPositive} />
      </div>
      
      <div className="flex items-end justify-between mt-2">
        <div>
          <p className="text-base font-mono font-bold text-trade-text-primary">₹{stock.price}</p>
        </div>
        <div className="text-right">
          <p className={`text-xs font-mono ${stock.isPositive ? 'text-trade-up' : 'text-trade-down'}`}>
            {stock.changePercent}
          </p>
          <p className={`text-[10px] font-mono ${stock.isPositive ? 'text-trade-up' : 'text-trade-down'}`}>
            {stock.change}
          </p>
        </div>
      </div>
    </button>
  )
}

export default function LeftSidebar() {
  const [activeStock, setActiveStock] = useState(0)
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all')
  const [showAddStock, setShowAddStock] = useState(false)

  return (
    <aside className="w-[320px] bg-trade-main border-r border-trade-border-medium flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-trade-border-medium bg-trade-secondary">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-trade-text-primary tracking-wide">WATCHLIST</h2>
          <button 
            onClick={() => setShowAddStock(!showAddStock)}
            className="p-1.5 hover:bg-trade-hover rounded transition-all group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-trade-text-secondary group-hover:text-trade-info transition-colors">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded shadow-sm transition-all ${
              activeTab === 'all'
                ? 'bg-trade-info text-white'
                : 'text-trade-text-secondary hover:bg-trade-hover hover:text-trade-text-primary border border-trade-border-light'
            }`}
          >
            All Stocks
          </button>
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`px-3 py-1.5 text-xs font-medium rounded shadow-sm transition-all ${
              activeTab === 'favorites'
                ? 'bg-trade-info text-white'
                : 'text-trade-text-secondary hover:bg-trade-hover hover:text-trade-text-primary border border-trade-border-light'
            }`}
          >
            Favorites
          </button>
        </div>

        {/* Add Stock Modal */}
        {showAddStock && (
          <div className="mt-3 p-3 bg-trade-tertiary border border-trade-border-light rounded">
            <input
              type="text"
              placeholder="Enter stock symbol..."
              className="w-full bg-trade-main border border-trade-border-light text-trade-text-primary text-xs px-2 py-1.5 rounded focus:outline-none focus:border-trade-info mb-2"
            />
            <div className="flex gap-2">
              <button className="flex-1 px-2 py-1 text-xs bg-trade-info text-white rounded hover:brightness-110 transition-all">
                Add
              </button>
              <button 
                onClick={() => setShowAddStock(false)}
                className="flex-1 px-2 py-1 text-xs bg-trade-hover text-trade-text-secondary rounded hover:bg-trade-border-light transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stock List - Scrollable */}
      <div className="flex-1 overflow-y-auto scroll-smooth pb-4">
        {watchlistStocks.map((stock, index) => (
          <StockCard
            key={stock.symbol}
            stock={stock}
            isActive={activeStock === index}
            onClick={() => setActiveStock(index)}
          />
        ))}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-trade-border-light bg-trade-secondary">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-[10px] text-trade-text-tertiary mb-1">GAINERS</p>
            <p className="text-sm font-mono font-semibold text-trade-up">3</p>
          </div>
          <div>
            <p className="text-[10px] text-trade-text-tertiary mb-1">LOSERS</p>
            <p className="text-sm font-mono font-semibold text-trade-down">2</p>
          </div>
          <div>
            <p className="text-[10px] text-trade-text-tertiary mb-1">NEUTRAL</p>
            <p className="text-sm font-mono font-semibold text-trade-text-secondary">1</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
