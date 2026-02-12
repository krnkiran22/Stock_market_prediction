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
    const msg = message.toUpperCase();

    // Explicit Name to Ticker Mapping
    const mappings: { [key: string]: string } = {
        'RELIANCE': 'RELIANCE.NS',
        'TCS': 'TCS.NS',
        'INFY': 'INFY.NS',
        'INFOSYS': 'INFY.NS',
        'HDFC': 'HDFCBANK.NS',
        'ICICIBANK': 'ICICIBANK.NS',
        'SBIN': 'SBIN.NS',
        'SBI': 'SBIN.NS',
        'TATAMOTORS': 'TATAMOTORS.NS',
        'ADANI': 'ADANIENT.NS'
    };

    for (const [name, ticker] of Object.entries(mappings)) {
        if (msg.includes(name)) return ticker;
    }

    // Fallback: search for words that look like tickers
    const words = msg.split(/\s+/);
    for (const word of words) {
        if (word.endsWith('.NS') || word.endsWith('.BO')) return word;
        if (/^[A-Z]{2,6}$/.test(word)) return word;
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

    if (ticker) {
        try {
            // Fetch live data from our internal API
            const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const stockRes = await fetch(`${baseUrl}/api/stock?symbol=${ticker}`);
            if (stockRes.ok) {
                const stockData = await stockRes.json();
                liveDataHint = `\n\n[REAL-TIME MARKET DATA FOR ${ticker}]:
- Current Price: ${stockData.currency === 'INR' ? '₹' : '$'}${stockData.price}
- Name: ${stockData.name}
- Today's Range: ${stockData.range}
- 52-Week Range: ${stockData.yearRange}
- Change: ${stockData.change} (${stockData.changePercent.toFixed(2)}%)
- Market Cap: ${stockData.marketCap}
Use this REAL-TIME data for the "CURRENT STATUS" section of your report. Do not hallucinate different prices.`;
            }
        } catch (e) {
            console.error('Failed to fetch live stock data:', e);
        }
    }

    try {
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT + (liveDataHint ? liveDataHint : "\n\nNote: If no real-time data is provided, tell the user you are an AI with a data cutoff and recommend verifying with a live source.") },
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
                temperature: 0.1, // Lower temperature for more factual prediction reports
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
