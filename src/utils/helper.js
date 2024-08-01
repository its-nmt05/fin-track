import { useStocks } from "../store/slice/stockSlice"

let USDFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
})

let numFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
})

function USDFormat(amount) {
    return USDFormatter.format(amount)
}

function capitalize(string) {
    if (!string) return ""
    return string[0].toUpperCase().concat(string.slice(1))
}

function dateFormat(dateString) {
    return new Date(dateString).toLocaleString("en-US")
}

function numFormat(num) {
    return num.toString().padStart(2, 0)
}

function fractionFormat(num) {
    return numFormatter.format(num)
}

function sort(array, { property, limit, asc = true }) {
    const copy = array ? array.slice() : [] // create a soft copy of the array
    return copy
        .sort((a, b) => {
            if (asc) {
                return a[property] > b[property] ? 1 : -1
            } else {
                return a[property] < b[property] ? 1 : -1
            }
        })
        .slice(0, limit)
}

function greet() {
    const hour = new Date().getHours()
    let message
    if (hour < 12) {
        message = "Good morning"
    } else if (hour >= 12 && hour <= 17) {
        message = "Good afternoon"
    } else {
        message = "Good evening"
    }
    return message
}

// filter portfolio stocks
function filterStocks(stocks = []) {
    const { data } = useStocks() // get stocks from store
    const filtered = stocks.reduce((acc, stock) => {
        const { symbol, price, quantity } = stock
        if (!(symbol in acc)) {
            acc[symbol] = {
                orders: [],
                invested: 0,
                total_quantity: 0,
                avg: 0,
                ...data.find((stock) => symbol == stock.symbol),
            }
        }
        acc[symbol].orders.push(stock)
        acc[symbol].invested += price * quantity
        acc[symbol].total_quantity += quantity
        acc[symbol].average_price =
            acc[symbol].invested / acc[symbol].total_quantity
        return acc
    }, {})

    return Object.entries(filtered)
}

export {
    USDFormat,
    capitalize,
    dateFormat,
    numFormat,
    fractionFormat,
    sort,
    greet,
    filterStocks,
}
