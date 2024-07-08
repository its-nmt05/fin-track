import config from "../config/config"

export class Stock {
    async getData({ symbol, interval = "1d", range = "1mo" }) {
        if (range == "1d") interval = "5m"
        try {
            const proxyUrl = "https://cors-anywhere.herokuapp.com/"
            const res = await fetch(
                `${proxyUrl}https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`
            )
            const data = await res.json()
            const meta = data?.chart.result[0].meta
            const stock = data?.chart.result[0]

            const stockData = {
                symbol: meta.symbol,
                currency: meta.currency,
                fullExchangeName: meta.fullExchangeName,
                regularMarketPrice: meta.regularMarketPrice,
                regularMarketDayHigh: meta.regularMarketDayHigh,
                regularMarketDayLow: meta.regularMarketDayLow,

                timestamp: stock.timestamp.map((time) => new Date(time * 1000)),
                indicators: stock.indicators.quote[0],
            }

            return stockData
        } catch (error) {
            return error
        }
    }
}

const stock = new Stock()

export default stock
