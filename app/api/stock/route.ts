import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get('symbol');

    if (!symbol) {
        return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    try {
        // We try to fetch from Yahoo Finance public API
        // Indian stocks usually need .NS or .BO suffix
        const response = await fetch(
            `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept': 'application/json',
                },
                next: { revalidate: 300 }, // Cache for 5 minutes
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch from Yahoo Finance');
        }

        const data = await response.json();
        const result = data.quoteResponse?.result?.[0];

        if (!result) {
            return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
        }

        return NextResponse.json({
            symbol: result.symbol,
            price: result.regularMarketPrice,
            currency: result.currency,
            change: result.regularMarketChange,
            changePercent: result.regularMarketChangePercent,
            range: `${result.regularMarketDayLow} - ${result.regularMarketDayHigh}`,
            yearRange: `${result.fiftyTwoWeekLow} - ${result.fiftyTwoWeekHigh}`,
            marketCap: result.marketCap,
            name: result.longName || result.shortName,
        });
    } catch (error) {
        console.error('Stock API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
    }
}
