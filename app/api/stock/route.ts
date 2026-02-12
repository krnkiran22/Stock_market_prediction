import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get('symbol');

    if (!symbol) {
        return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    try {
        // Using v8/finance/chart which is more reliable than the quote endpoint
        const response = await fetch(
            `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                },
                next: { revalidate: 300 },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Yahoo Finance Error Status: ${response.status}`, errorText);
            throw new Error(`Failed to fetch from Yahoo Finance: ${response.status}`);
        }

        const data = await response.json();
        const result = data.chart?.result?.[0];

        if (!result) {
            return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
        }

        const meta = result.meta;
        const price = meta.regularMarketPrice;
        const prevClose = meta.chartPreviousClose;
        const change = price - prevClose;
        const changePercent = (change / prevClose) * 100;

        return NextResponse.json({
            symbol: meta.symbol,
            price: price.toFixed(2),
            currency: meta.currency,
            change: change.toFixed(2),
            changePercent: changePercent.toFixed(2),
            range: `${result.indicators.quote[0].low?.[0]?.toFixed(2) || 'N/A'} - ${result.indicators.quote[0].high?.[0]?.toFixed(2) || 'N/A'}`,
            yearRange: "Check live for 52w",
            marketCap: "N/A",
            name: meta.symbol, // Chart API doesn't always provide full name
        });
    } catch (error) {
        console.error('Stock API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
    }
}
