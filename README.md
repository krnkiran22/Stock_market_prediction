# Stock Market Portfolio Optimization & Prediction System

A professional, institutional-grade stock market prediction platform built with Next.js and TypeScript, combining the sophistication of Bloomberg Terminal with modern web usability.

## 🎯 Features

### Core Functionality
- **Real-time Stock Watchlist** with mini sparklines and live price updates
- **Interactive Candlestick Charts** with multiple timeframes (1D, 1W, 1M, 3M, 1Y)
- **ML-Powered Predictions** using 5 different models (LSTM, Random Forest, Gradient Boosting, ARIMA, SVM)
- **AI Trading Assistant** powered by GPT-4 for real-time market analysis
- **Risk Assessment Dashboard** with comprehensive metrics
- **Technical Indicators** (RSI, MACD, Moving Averages)
- **Market Sentiment Analysis** from news and social media

### Design Philosophy
- **Professional Trading Interface**: Bloomberg Terminal meets Modern Web
- **Information-Dense Layout**: Maximum data visibility without scrolling
- **High-Contrast Dark Theme**: Optimized for extended trading hours
- **Monospace Typography**: All financial data in JetBrains Mono for precision
- **Inline SVG Icons**: No external icon libraries, pure hand-coded SVGs
- **Minimal Animations**: Subtle, professional transitions only

## 🎨 Design System

### Color Palette
- **Background**: #0B0E11 (Primary), #161A1F (Secondary), #1F2937 (Tertiary)
- **Bullish**: #00C896 (Teal Green)
- **Bearish**: #FF3B69 (Coral Red)
- **Info**: #2D5BFF (Deep Blue)
- **Warning**: #FFB020 (Amber)

### Typography
- **UI Font**: Inter (sans-serif)
- **Data Font**: JetBrains Mono (monospace) for all prices, percentages, volumes

### Layout Structure
- **Top Navigation**: 60px fixed height
- **Left Sidebar**: 320px fixed width (Watchlist)
- **Main Content**: Flexible (Charts & Predictions)
- **Right Sidebar**: 360px fixed width (AI Chat & Risk)

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd Stock_market_prediction
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
Stock_market_prediction/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── TopNavigation.tsx   # Top nav bar with ticker
│   ├── LeftSidebar.tsx     # Watchlist with sparklines
│   ├── MainContent.tsx     # Charts & predictions
│   └── RightSidebar.tsx    # AI chat & risk metrics
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── README.md               # This file
```

## 🔧 Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom color system
- **Fonts**: Inter (UI), JetBrains Mono (Data)
- **Icons**: Inline SVG (no libraries)

## 📊 Component Architecture

### TopNavigation
- Live market ticker with scrolling animation
- Search functionality
- Market status indicator
- User profile access

### LeftSidebar (Watchlist)
- Stock cards with mini sparklines
- Real-time price updates
- Color-coded gains/losses
- Quick stats footer

### MainContent
- Interactive candlestick chart
- Multiple timeframe selection
- Prediction parameter inputs
- ML model breakdown table
- Confidence visualization

### RightSidebar
- AI chat interface
- Risk analysis metrics
- Technical indicators
- Market sentiment tracking

## 🎯 Key Features Explained

### ML Model Predictions
Five models contribute to the final signal:
1. **LSTM Neural Network** (35% weight)
2. **Random Forest** (25% weight)
3. **Gradient Boosting** (20% weight)
4. **ARIMA** (10% weight)
5. **Support Vector Machine** (10% weight)

### Risk Metrics
- **Upside Potential**: Expected maximum gain
- **Downside Risk**: Potential loss exposure
- **Volatility**: Price fluctuation measure
- **Beta**: Correlation with market index

### Confidence Levels
- 0-50%: Red (High Risk)
- 51-70%: Amber (Moderate Risk)
- 71-85%: Blue (Good Confidence)
- 86-100%: Green (High Confidence)

## 🔒 Strict Design Constraints

✅ **Followed**:
- No icon libraries (Lucide, FontAwesome, etc.)
- All icons are inline SVG with currentColor
- Strict color system adherence
- Monospace fonts for all financial data
- Maximum border radius: 4-6px
- Dense, information-rich layout
- Professional institutional aesthetic

❌ **Avoided**:
- Random or AI-generated colors
- Large rounded corners
- Gradients
- Bouncy animations
- Excessive whitespace
- Consumer fintech styling

## 📝 Customization

### Adding New Stocks
Edit the `watchlistStocks` array in `LeftSidebar.tsx`:
```typescript
const watchlistStocks: StockData[] = [
  {
    symbol: 'SYMBOL',
    name: 'Company Name',
    price: '1,234.56',
    // ... more properties
  }
]
```

### Modifying Colors
Update `tailwind.config.ts` color system:
```typescript
colors: {
  'trade-main': '#0B0E11',
  // ... customize colors
}
```

### Adjusting Layout
Modify widths in component files:
- Left Sidebar: `w-[320px]`
- Right Sidebar: `w-[360px]`
- Top Nav: `h-[60px]`

## 🐛 Known Limitations

- Chart data is currently simulated (integrate real API later)
- AI responses are mock (connect to actual GPT-4 API)
- Real-time updates need WebSocket implementation
- Historical data requires backend integration

## 🚀 Future Enhancements

- [ ] Real-time data feeds via WebSocket
- [ ] Backend API for ML predictions
- [ ] User authentication & portfolios
- [ ] Advanced charting (indicators, overlays)
- [ ] Mobile responsive design
- [ ] Export reports (PDF/Excel)
- [ ] Multi-language support
- [ ] Dark/Light theme toggle (optional)

## 📄 License

This project is for educational and demonstration purposes.

## 👨‍💻 Development Notes

### Performance Optimization
- Components use React hooks efficiently
- Minimal re-renders with proper state management
- SVG charts render smoothly
- Tailwind purges unused CSS in production

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Color contrast ratios meet WCAG AA
- Screen reader friendly labels

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- No IE11 support

---

**Built with precision for professional traders and investors.**
