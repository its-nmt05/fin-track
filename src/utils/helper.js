let USDFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
})

function USDFormat(amount) {
    return USDFormatter.format(amount)
}

function capitalize(string) {
    if (!string) return ""
    return string[0].toUpperCase().concat(string.slice(1))
}

function dateFormat(dateString) {
    return "12th Sep, 2005"
}

function numFormat(num) {
    return num.toString().padStart(2, 0)
}

export { USDFormat, capitalize, dateFormat, numFormat }
