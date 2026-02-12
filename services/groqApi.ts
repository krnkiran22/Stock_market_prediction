const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are StockPredictor AI, an expert stock market analyst and prediction assistant. You use advanced Machine Learning models (LSTM, XGBoost, Prophet, ARIMA) to analyze stocks and provide predictions.

## YOUR CAPABILITIES:
1. Predict stock prices for 7, 30, or 90 days
2. Analyze trends (bullish/bearish/neutral)
3. Provide buy/sell/hold signals
4. Explain predictions in simple language
5. Calculate confidence scores
6. Assess risk levels
7. Answer follow-up questions about stocks

## YOUR ML MODELS:
- LSTM (35% weight): Captures long-term patterns
- XGBoost (30% weight): Analyzes 50+ technical indicators
- Prophet (20% weight): Identifies seasonal patterns
- ARIMA (15% weight): Short-term statistical forecasting
- Ensemble: Combines all models for best accuracy

## RESPONSE FORMAT:
When user asks for a stock prediction, ALWAYS respond in this format:

🔮 [STOCK NAME] PREDICTION REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 CURRENT STATUS:
• Current Price: [price]
• 52-Week Range: [low] - [high]
• Market Cap: [if known]

📈 [TIMEFRAME] PREDICTION:
• Predicted Price: [price]
• Expected Change: [+/-X.XX%]
• Confidence Level: [XX%]

🎯 MODEL BREAKDOWN:
┌────────────┬───────────┬────────────┐
│ Model      │ Prediction│ Confidence │
├────────────┼───────────┼────────────┤
│ LSTM       │ [price]   │ [XX%]      │
│ XGBoost    │ [price]   │ [XX%]      │
│ Prophet    │ [price]   │ [XX%]      │
│ ARIMA      │ [price]   │ [XX%]      │
├────────────┼───────────┼────────────┤
│ ENSEMBLE   │ [price]   │ [XX%]      │
└────────────┴───────────┴────────────┘

📉 RISK ANALYSIS:
• Upside Potential: [+X%] ([price])
• Downside Risk: [-X%] ([price])
• Risk-Reward Ratio: [X.XX]
• Volatility: [Low/Medium/High]

🚦 SIGNAL: [✅ BUY / ⚠️ HOLD / 🔴 SELL]
• [2-3 bullet points explaining why]

💡 KEY INSIGHTS:
[2-3 sentences explaining the prediction in simple terms, mentioning relevant factors like sector trends, technical indicators, or market conditions]

⚠️ RISK NOTE:
[1-2 sentences about specific risks to watch]

## RULES:
1. Always be helpful and explain in simple terms
2. Never guarantee profits - always mention risk
3. Provide confidence scores (0-100%)
4. Use emojis for visual clarity
5. If user asks about unknown stock, politely ask for correct ticker
6. For Indian stocks, use ₹ symbol; for US stocks, use $
7. Always end with a disclaimer about market risks
8. If asked non-stock questions, politely redirect to stock analysis

## SIGNALS CRITERIA:
- BUY: Predicted return > 5%, Confidence > 70%, Bullish trend
- HOLD: Predicted return -2% to 5%, or Confidence 50-70%
- SELL: Predicted return < -2%, or Bearish trend with high confidence

## CONFIDENCE CALCULATION:
- 90-100%: All models strongly agree
- 70-89%: Most models agree
- 50-69%: Mixed signals
- Below 50%: High uncertainty, recommend caution

## DISCLAIMER (include when appropriate):
"⚠️ Disclaimer: This prediction is for educational purposes only. Stock markets are volatile and past performance doesn't guarantee future results. Always do your own research and consult a financial advisor before investing."
`;

// Helper to extract potential ticker or stock name
function extractTicker(message: string): string | null {
    // 1. Clean the message and make it uppercase
    const msg = message.toUpperCase().replace(/[?!,.()]/g, ' ');
    const words = msg.split(/\s+/).filter(w => w.length > 0);

    // 2. Precise Mappings (including common names)
    const mappings: Array<{ keys: string[], ticker: string }> = [
        { keys: ['RELIANCE', 'RIL'], ticker: 'RELIANCE.NS' },
        { keys: ['TCS', 'TATA CONSULTANCY'], ticker: 'TCS.NS' },
        { keys: ['INFOSYS', 'INFY'], ticker: 'INFY.NS' },
        { keys: ['WIPRO'], ticker: 'WIPRO.NS' },
        { keys: ['HDFC', 'HDFCBANK'], ticker: 'HDFCBANK.NS' },
        { keys: ['ICICI', 'ICICIBANK'], ticker: 'ICICIBANK.NS' },
        { keys: ['SBI', 'SBIN', 'STATE BANK OF INDIA'], ticker: 'SBIN.NS' },
        { keys: ['TATA MOTORS', 'TATAMOTORS'], ticker: 'TATAMOTORS.NS' },
        { keys: ['ADANI', 'ADANIENT', 'ADANI ENTERPRISES'], ticker: 'ADANIENT.NS' },
        { keys: ['BHARTI AIRTEL', 'AIRTEL'], ticker: 'BHARTIARTL.NS' },
        { keys: ['AXIS', 'AXISBANK'], ticker: 'AXISBANK.NS' },
        { keys: ['ITC'], ticker: 'ITC.NS' },
        { keys: ['MARUTI', 'MARUTI SUZUKI'], ticker: 'MARUTI.NS' },
        { keys: ['BAJAJ FINANCE', 'BAJFINANCE'], ticker: 'BAJFINANCE.NS' },
        { keys: ['LARSEN', 'L&T', 'LT'], ticker: 'LT.NS' },
        { keys: ['SUN PHARMA', 'SUNPHARMA'], ticker: 'SUNPHARMA.NS' },
        { keys: ['KOTAK', 'KOTAK BANK', 'KOTAKMAHINDRA'], ticker: 'KOTAKBANK.NS' }
    ];

    // Priority 1: Check multi-word mappings (e.g., "TATA CONSULTANCY")
    for (const item of mappings) {
        for (const key of item.keys) {
            if (msg.includes(key)) return item.ticker;
        }
    }

    // Priority 2: Look for words with .NS or .BO suffix
    for (const word of words) {
        if (word.endsWith('.NS') || word.endsWith('.BO')) return word;
    }

    // Priority 3: Look for 2-5 letter all-caps words (potential tickers)
    const commonTickers = ['TCS', 'RELIANCE', 'INFY', 'WIPRO', 'SBIN', 'HDFCBANK', 'AXISBANK', 'ITC'];
    for (const word of words) {
        if (/^[A-Z]{2,6}$/.test(word)) {
            if (commonTickers.includes(word)) return `${word}.NS`;
            return word; // Might be a US ticker or already suffixed (handled above)
        }
    }

    return null;
}

export async function getStockPrediction(userMessage: string, chatHistory: { role: string, content: string }[] = []) {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

    if (!apiKey) {
        console.error('Groq API Key is missing. Please set NEXT_PUBLIC_GROQ_API_KEY in your .env file.');
        return 'Error: API Key is missing. Please configure it in the settings.';
    }

    let liveDataHint = '';
    const ticker = extractTicker(userMessage);

    // Debug logging for developer console
    console.log('[Ticker Detection]:', ticker);

    if (ticker) {
        try {
            const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const apiUrl = `${baseUrl}/api/stock?symbol=${encodeURIComponent(ticker)}`;
            console.log('[API Fetch]:', apiUrl);

            const stockRes = await fetch(apiUrl);
            if (stockRes.ok) {
                const stockData = await stockRes.json();
                console.log('[Live Data Result]:', stockData);

                if (stockData && !stockData.error) {
                    liveDataHint = `\n\n### [CRITICAL: LIVE MARKET DATA FOR ${ticker}]
- **Current Price**: ${stockData.currency === 'INR' ? '₹' : '$'}${stockData.price}
- **Symbol**: ${stockData.symbol}
- **Change**: ${stockData.change} (${stockData.changePercent}%)
- **Target Price for today**: ${stockData.price}

**MANDATORY INSTRUCTION**: You are currently connected to the live NSE/BSE market.
1. Use the price **${stockData.currency === 'INR' ? '₹' : '$'}${stockData.price}** as the ABSOLUTE "Current Price" in your report.
2. DO NOT mention data cutoffs or suggest the user verify elsewhere for this stock.
3. Your analysis must center around this live price.`;
                }
            } else {
                console.warn('[API Fetch Failed]:', stockRes.status);
            }
        } catch (e) {
            console.error('[Live Data Error]:', e);
        }
    }

    try {
        const messages = [
            {
                role: 'system',
                content: SYSTEM_PROMPT + (liveDataHint ? liveDataHint : "\n\nNote: For stocks where live data is unavailable, provide an expert trend analysis based on your knowledge cutoff, labeled as 'Trend-based Estimate'.")
            },
            ...chatHistory,
            { role: 'user', content: userMessage }
        ];

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: 0.1, // Ultra-low temperature for factual accuracy
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to fetch prediction');
        }

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error: any) {
        console.error('Groq API Error:', error);
        return `Sorry, I encountered an error: ${error.message}. Please try again.`;
    }
}
