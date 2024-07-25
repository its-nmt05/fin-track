let USDFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
})

function USDFormat(amount) {
    return USDFormatter.format(amount)
}

export { USDFormat }
