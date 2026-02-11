'use client'

import { useState, useEffect } from 'react'

interface ModelPrediction {
  name: string
  prediction: string
  confidence: number
  weight: number
}

const modelData: ModelPrediction[] = [
  { name: 'LSTM Neural Network', prediction: 'BUY', confidence: 87, weight: 35 },
  { name: 'Random Forest', prediction: 'BUY', confidence: 82, weight: 25 },
  { name: 'Gradient Boosting', prediction: 'BUY', confidence: 79, weight: 20 },
  { name: 'ARIMA', prediction: 'HOLD', confidence: 65, weight: 10 },
  { name: 'Support Vector Machine', prediction: 'BUY', confidence: 75, weight: 10 },
]

// Chart Component with Candlesticks
function StockChart() {
  const width = 1200
  const height = 500
  const padding = { top: 40, right: 60, bottom: 60, left: 80 }

  // Sample candlestick data (generated on client-side only to avoid hydration mismatch)
  const [candleData, setCandleData] = useState<Array<{open: number, high: number, low: number, close: number, volume: number, x: number}>>([])
  const [chartPeriod, setChartPeriod] = useState('1M')
  const [chartType, setChartType] = useState<'candles' | 'line'>('candles')

  useEffect(() => {
    // Generate data only on client side - fewer candles for cleaner look
    const dataPoints = chartPeriod === '1D' ? 15 : chartPeriod === '1W' ? 20 : chartPeriod === '1M' ? 30 : chartPeriod === '3M' ? 40 : chartPeriod === '1Y' ? 50 : 60
    const data = Array.from({ length: dataPoints }, (_, i) => {
      const basePrice = 2400
      const trend = i * 2 // Slight upward trend for better visualization
      const open = basePrice + trend + (Math.random() - 0.5) * 30
      const volatility = 15 + Math.random() * 25
      const close = open + (Math.random() - 0.5) * volatility
      const high = Math.max(open, close) + Math.random() * 15
      const low = Math.min(open, close) - Math.random() * 15
      const volume = Math.random() * 1000000 + 500000 // Volume data
      return { open, high, low, close, volume, x: i }
    })
    setCandleData(data)
  }, [chartPeriod])

  // Show loading state during SSR or before data loads
  if (candleData.length === 0) {
    return (
      <div className="relative h-[500px] bg-trade-secondary flex items-center justify-center">
        <div className="shimmer w-full h-full"></div>
      </div>
    )
  }

  const priceMin = Math.min(...candleData.map(d => d.low))
  const priceMax = Math.max(...candleData.map(d => d.high))
  const priceRange = priceMax - priceMin

  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const xScale = chartWidth / candleData.length
  const yScale = chartHeight / priceRange

  return (
    <div className="relative h-[500px]">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="bg-trade-secondary" preserveAspectRatio="xMidYMid meet">
        {/* Chart border/axes */}
        <rect
          x={padding.left}
          y={padding.top}
          width={chartWidth}
          height={chartHeight}
          fill="none"
          stroke="#374151"
          strokeWidth="1.5"
        />

        {/* Horizontal Grid lines - only 4 lines for cleaner look */}
        {[0.25, 0.5, 0.75].map((ratio, i) => {
          const y = padding.top + chartHeight * ratio
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#1F2937"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            </g>
          )
        })}

        {/* Vertical Grid lines - evenly spaced */}
        {[0.2, 0.4, 0.6, 0.8].map((ratio, i) => {
          const x = padding.left + chartWidth * ratio
          return (
            <line
              key={`v-${i}`}
              x1={x}
              y1={padding.top}
              x2={x}
              y2={height - padding.bottom}
              stroke="#1F2937"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.3"
            />
          )
        })}

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding.top + chartHeight * ratio
          const price = Math.round(priceMax - ratio * priceRange)
          return (
            <g key={`y-${i}`}>
              <text
                x={padding.left - 15}
                y={y}
                fill="#9BA3AF"
                fontSize="12"
                textAnchor="end"
                dominantBaseline="middle"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="500"
              >
                ₹{price.toLocaleString()}
              </text>
              {/* Price level indicator */}
              <circle
                cx={padding.left - 5}
                cy={y}
                r="2"
                fill="#6B7280"
              />
            </g>
          )
        })}

        {/* Candlesticks or Line */}
        {chartType === 'candles' ? (
          candleData.map((candle, i) => {
            const x = padding.left + i * xScale + xScale / 2
            const yHigh = padding.top + (priceMax - candle.high) * yScale
            const yLow = padding.top + (priceMax - candle.low) * yScale
            const yOpen = padding.top + (priceMax - candle.open) * yScale
            const yClose = padding.top + (priceMax - candle.close) * yScale
            const isBullish = candle.close > candle.open
            const color = isBullish ? '#26A69A' : '#EF5350'
            const candleWidth = Math.min(xScale * 0.6, 16) // Max width for better visibility
            const bodyHeight = Math.max(Math.abs(yClose - yOpen), 3) // Minimum height for visibility

            return (
              <g key={i} className="candle-group">
                {/* Shadow for depth */}
                <line
                  x1={x}
                  y1={yHigh}
                  x2={x}
                  y2={yLow}
                  stroke={color}
                  strokeWidth="1"
                  opacity="0.3"
                  strokeLinecap="round"
                />
                
                {/* Wick (High-Low line) */}
                <line
                  x1={x}
                  y1={yHigh}
                  x2={x}
                  y2={yLow}
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                
                {/* Candle Body with border */}
                <rect
                  x={x - candleWidth / 2}
                  y={Math.min(yOpen, yClose)}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={color}
                  stroke={isBullish ? '#1E8074' : '#C93A47'}
                  strokeWidth="1"
                  rx="1"
                />
                
                {/* Highlight on top of bullish candles */}
                {isBullish && (
                  <rect
                    x={x - candleWidth / 2 + 1}
                    y={Math.min(yOpen, yClose) + 1}
                    width={candleWidth - 2}
                    height={Math.max(bodyHeight * 0.3, 1)}
                    fill="white"
                    opacity="0.2"
                    rx="1"
                  />
                )}
              </g>
            )
          })
        ) : (
          /* Line Chart */
          <>
            {/* Area fill under line */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00C896" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#00C896" stopOpacity="0"/>
              </linearGradient>
            </defs>
            
            {/* Area */}
            <path
              d={`
                M ${padding.left + xScale / 2},${padding.top + (priceMax - candleData[0].close) * yScale}
                ${candleData.map((candle, i) => {
                  const x = padding.left + i * xScale + xScale / 2
                  const y = padding.top + (priceMax - candle.close) * yScale
                  return `L ${x},${y}`
                }).join(' ')}
                L ${padding.left + (candleData.length - 1) * xScale + xScale / 2},${height - padding.bottom}
                L ${padding.left + xScale / 2},${height - padding.bottom}
                Z
              `}
              fill="url(#lineGradient)"
            />
            
            {/* Line */}
            <polyline
              points={candleData.map((candle, i) => {
                const x = padding.left + i * xScale + xScale / 2
                const y = padding.top + (priceMax - candle.close) * yScale
                return `${x},${y}`
              }).join(' ')}
              fill="none"
              stroke="#00C896"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {candleData.map((candle, i) => {
              if (i % Math.ceil(candleData.length / 10) === 0 || i === candleData.length - 1) {
                const x = padding.left + i * xScale + xScale / 2
                const y = padding.top + (priceMax - candle.close) * yScale
                return (
                  <circle
                    key={`point-${i}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#00C896"
                    stroke="white"
                    strokeWidth="2"
                  />
                )
              }
              return null
            })}
          </>
        )}

        {/* Prediction line (last candles with projection) */}
        {candleData.length > 10 && (
          <>
            <polyline
              points={candleData.slice(-10).map((candle, i) => {
                const x = padding.left + (candleData.length - 10 + i) * xScale + xScale / 2
                const y = padding.top + (priceMax - candle.close) * yScale
                return `${x},${y}`
              }).join(' ')}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray="8 4"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Prediction endpoint indicator */}
            <circle
              cx={padding.left + (candleData.length - 1) * xScale + xScale / 2}
              cy={padding.top + (priceMax - candleData[candleData.length - 1].close) * yScale}
              r="5"
              fill="#3B82F6"
              stroke="white"
              strokeWidth="2"
            />
          </>
        )}

        {/* Current price line */}
        {candleData.length > 0 && (
          <>
            <line
              x1={padding.left}
              y1={padding.top + (priceMax - candleData[candleData.length - 1].close) * yScale}
              x2={width - padding.right}
              y2={padding.top + (priceMax - candleData[candleData.length - 1].close) * yScale}
              stroke="#FFB020"
              strokeWidth="2"
              strokeDasharray="6 3"
              opacity="0.6"
            />
            <rect
              x={width - padding.right + 5}
              y={padding.top + (priceMax - candleData[candleData.length - 1].close) * yScale - 12}
              width="70"
              height="24"
              fill="#FFB020"
              rx="3"
            />
            <text
              x={width - padding.right + 40}
              y={padding.top + (priceMax - candleData[candleData.length - 1].close) * yScale}
              fill="white"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              ₹{Math.round(candleData[candleData.length - 1].close).toLocaleString()}
            </text>
          </>
        )}

        {/* X-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const x = padding.left + chartWidth * ratio
          const date = new Date()
          date.setDate(date.getDate() - Math.floor((1 - ratio) * 30))
          return (
            <text
              key={`x-${i}`}
              x={x}
              y={height - padding.bottom + 30}
              fill="#9BA3AF"
              fontSize="11"
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="500"
            >
              {date.getDate()}/{date.getMonth() + 1}
            </text>
          )
        })}
      </svg>

      {/* Chart Controls */}
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((period) => (
          <button
            key={period}
            onClick={() => setChartPeriod(period)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              period === chartPeriod
                ? 'bg-trade-info text-white shadow-md'
                : 'bg-trade-tertiary text-trade-text-secondary hover:bg-trade-hover border border-trade-border-light'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Chart Stats */}
      {candleData.length > 0 && (
        <div className="absolute top-16 left-4 bg-trade-tertiary/90 backdrop-blur-sm border border-trade-border-light rounded p-2 z-10">
          <div className="flex gap-4 text-[10px]">
            <div>
              <span className="text-trade-text-tertiary">O: </span>
              <span className="text-trade-text-primary font-mono">₹{Math.round(candleData[candleData.length - 1].open)}</span>
            </div>
            <div>
              <span className="text-trade-text-tertiary">H: </span>
              <span className="text-trade-up font-mono">₹{Math.round(candleData[candleData.length - 1].high)}</span>
            </div>
            <div>
              <span className="text-trade-text-tertiary">L: </span>
              <span className="text-trade-down font-mono">₹{Math.round(candleData[candleData.length - 1].low)}</span>
            </div>
            <div>
              <span className="text-trade-text-tertiary">C: </span>
              <span className="text-trade-text-primary font-mono font-semibold">₹{Math.round(candleData[candleData.length - 1].close)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Chart Type */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button 
          onClick={() => setChartType('candles')}
          className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
            chartType === 'candles'
              ? 'bg-trade-info text-white border-trade-info'
              : 'bg-trade-tertiary text-trade-text-secondary hover:bg-trade-hover border-trade-border-light'
          }`}
        >
          Candles
        </button>
        <button 
          onClick={() => setChartType('line')}
          className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
            chartType === 'line'
              ? 'bg-trade-info text-white border-trade-info'
              : 'bg-trade-tertiary text-trade-text-secondary hover:bg-trade-hover border-trade-border-light'
          }`}
        >
          Line
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-trade-tertiary border border-trade-border-light rounded p-3 z-10">
        <div className="flex gap-4 text-xs">
          {chartType === 'candles' ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#26A69A] rounded"></div>
                <span className="text-trade-text-secondary">Bullish</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#EF5350] rounded"></div>
                <span className="text-trade-text-secondary">Bearish</span>
              </div>
            </>
          ) : null}
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-trade-info"></div>
            <span className="text-trade-text-secondary">Prediction</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Confidence Bar
function ConfidenceBar({ confidence }: { confidence: number }) {
  let color = '#FF3B69' // Red (0-50%)
  if (confidence > 85) color = '#00C896' // Green (86-100%)
  else if (confidence > 70) color = '#2D5BFF' // Blue (71-85%)
  else if (confidence > 50) color = '#FFB020' // Amber (51-70%)

  return (
    <div className="relative w-full h-2 bg-trade-tertiary rounded-full overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full transition-all duration-500 rounded-full"
        style={{ width: `${confidence}%`, backgroundColor: color }}
      />
    </div>
  )
}

export default function MainContent() {
  const [timeframe, setTimeframe] = useState('7')
  const [investment, setInvestment] = useState('200000')
  const [isLoading, setIsLoading] = useState(false)
  const [showPrediction, setShowPrediction] = useState(false)

  const handlePredict = () => {
    setIsLoading(true)
    setShowPrediction(false)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowPrediction(true)
    }, 2000)
  }

  const overallSignal = 'BUY'
  const overallConfidence = 84
  const expectedReturn = '+12.5%'
  const targetPrice = '₹2,750'

  return (
    <main className="flex-1 overflow-y-auto bg-trade-main scroll-smooth">
      <div className="p-6 pb-12">
        {/* Stock Header */}
        <div className="mb-6">
          <div className="flex items-end justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-trade-text-primary mb-1">RELIANCE INDUSTRIES</h1>
              <p className="text-sm text-trade-text-tertiary">NSE: RELIANCE • Mumbai Stock Exchange</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-mono font-bold text-trade-text-primary">₹2,450.30</p>
              <p className="text-sm font-mono text-trade-up">+15.20 (+0.62%)</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-5 gap-4 mt-4">
            {[
              { label: 'OPEN', value: '₹2,435.00' },
              { label: 'HIGH', value: '₹2,465.50' },
              { label: 'LOW', value: '₹2,430.20' },
              { label: 'VOLUME', value: '4.2M' },
              { label: 'MKT CAP', value: '₹16.5T' },
            ].map((stat) => (
              <div key={stat.label} className="bg-trade-secondary p-3 rounded">
                <p className="text-[10px] text-trade-text-tertiary mb-1">{stat.label}</p>
                <p className="text-sm font-mono font-semibold text-trade-text-primary">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-trade-secondary border border-trade-border-light rounded overflow-hidden mb-6">
          <StockChart />
        </div>

        {/* Prediction Input Panel */}
        <div className="bg-trade-secondary border border-trade-border-medium rounded p-6 mb-6">
          <h2 className="text-sm font-bold text-trade-text-primary mb-4 tracking-wide">PREDICTION PARAMETERS</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-trade-text-secondary mb-2 uppercase tracking-wider">Timeframe</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full bg-trade-tertiary border border-trade-border-light text-trade-text-primary text-sm px-3 py-2.5 rounded focus:outline-none focus:border-trade-info focus:ring-1 focus:ring-trade-info transition-all cursor-pointer"
              >
                <option value="1">1 Day</option>
                <option value="7">7 Days</option>
                <option value="30">30 Days</option>
                <option value="90">90 Days</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-trade-text-secondary mb-2 uppercase tracking-wider">Investment Amount (₹)</label>
              <input
                type="text"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                className="w-full bg-trade-tertiary border border-trade-border-light text-trade-text-primary text-sm font-mono px-3 py-2.5 rounded focus:outline-none focus:border-trade-info focus:ring-1 focus:ring-trade-info transition-all"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handlePredict}
                disabled={isLoading}
                className="w-full bg-trade-info hover:brightness-110 hover:shadow-lg text-white font-semibold text-sm px-6 py-2.5 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isLoading ? 'Analyzing...' : 'Generate Prediction'}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-6 pt-6 border-t border-trade-border-light">
              <div className="flex flex-col items-center justify-center py-8">
                <svg className="animate-spin h-12 w-12 text-trade-info mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-sm text-trade-text-secondary">Analyzing market data with ML models...</p>
                <p className="text-xs text-trade-text-tertiary mt-1">This may take a few seconds</p>
              </div>
            </div>
          )}

          {/* Prediction Results - Shown after generation */}
          {showPrediction && !isLoading && (
            <div className="mt-6 pt-6 border-t border-trade-border-light animate-fadeIn">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-sm font-bold text-trade-text-primary mb-1 tracking-wide">PREDICTION SIGNAL</h2>
                  <p className="text-xs text-trade-text-tertiary">Based on 5 ML Models • {timeframe} Days Forecast</p>
                </div>
                
                {/* Signal Badge */}
                <div className={`px-8 py-4 rounded shadow-lg transform transition-all duration-300 hover:scale-105 ${overallSignal === 'BUY' ? 'bg-trade-up' : 'bg-trade-down'}`}>
                  <p className="text-3xl font-bold text-white">{overallSignal}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-xs text-trade-text-secondary mb-2">CONFIDENCE LEVEL</p>
                  <p className="text-2xl font-mono font-bold text-trade-text-primary mb-2">{overallConfidence}%</p>
                  <ConfidenceBar confidence={overallConfidence} />
                </div>
                
                <div>
                  <p className="text-xs text-trade-text-secondary mb-2">EXPECTED RETURN</p>
                  <p className="text-2xl font-mono font-bold text-trade-up">{expectedReturn}</p>
                  <p className="text-xs text-trade-text-tertiary mt-1">{timeframe}-day projection</p>
                </div>
                
                <div>
                  <p className="text-xs text-trade-text-secondary mb-2">TARGET PRICE</p>
                  <p className="text-2xl font-mono font-bold text-trade-text-primary">{targetPrice}</p>
                  <p className="text-xs text-trade-text-tertiary mt-1">Potential upside</p>
                </div>
              </div>

              {/* Investment Breakdown */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-trade-tertiary rounded">
                <div>
                  <p className="text-[10px] text-trade-text-tertiary mb-1">INVESTMENT</p>
                  <p className="text-base font-mono font-bold text-trade-text-primary">₹{parseInt(investment).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-trade-text-tertiary mb-1">POTENTIAL GAIN</p>
                  <p className="text-base font-mono font-bold text-trade-up">₹{Math.round(parseInt(investment) * 0.125).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-trade-text-tertiary mb-1">SHARE QUANTITY</p>
                  <p className="text-base font-mono font-bold text-trade-text-primary">{Math.floor(parseInt(investment) / 2450)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Model Breakdown Table - Shown after prediction */}
        {showPrediction && (
          <div className="bg-trade-secondary border border-trade-border-medium rounded overflow-hidden mb-6">
            <div className="p-4 border-b border-trade-border-medium bg-trade-tertiary">
              <h2 className="text-sm font-bold text-trade-text-primary tracking-wide">MODEL BREAKDOWN</h2>
            </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-trade-tertiary">
                  <th className="text-left text-xs text-trade-text-secondary font-medium px-4 py-3">MODEL NAME</th>
                  <th className="text-left text-xs text-trade-text-secondary font-medium px-4 py-3">PREDICTION</th>
                  <th className="text-left text-xs text-trade-text-secondary font-medium px-4 py-3">CONFIDENCE</th>
                  <th className="text-left text-xs text-trade-text-secondary font-medium px-4 py-3">WEIGHT</th>
                  <th className="text-left text-xs text-trade-text-secondary font-medium px-4 py-3">CONTRIBUTION</th>
                </tr>
              </thead>
              <tbody>
                {modelData.map((model, idx) => (
                  <tr
                    key={model.name}
                    className={`border-t border-trade-border-light ${idx % 2 === 0 ? 'bg-trade-secondary' : 'bg-[#1A1F25]'}`}
                  >
                    <td className="px-4 py-3 text-sm text-trade-text-primary">{model.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                        model.prediction === 'BUY' ? 'bg-trade-up/20 text-trade-up' : 
                        model.prediction === 'SELL' ? 'bg-trade-down/20 text-trade-down' : 
                        'bg-trade-text-tertiary/20 text-trade-text-secondary'
                      }`}>
                        {model.prediction}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-trade-text-primary">{model.confidence}%</span>
                        <div className="flex-1 max-w-[100px]">
                          <ConfidenceBar confidence={model.confidence} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-trade-text-primary">{model.weight}%</td>
                    <td className="px-4 py-3 text-sm font-mono text-trade-text-primary">
                      {(model.confidence * model.weight / 100).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </div>
    </main>
  )
}
