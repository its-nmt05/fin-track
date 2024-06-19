import config from "../config/config"

export class Stock {
    async getData({ symbol, interval = "1d", range = "1mo" }) {
        try {
            const proxyUrl = "https://cors-anywhere.herokuapp.com/"
            const res = await fetch(
                `${proxyUrl}https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`
            )
            const data = await res.json()
            return data
        } catch (error) {
            return error
        }
    }
}

const stock = new Stock()

export default stock
