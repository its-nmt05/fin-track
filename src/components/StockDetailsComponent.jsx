import React from "react"
import StockGraph from "./StockGraph"

function StockDetailsComponent({ stockData }) {
  return <StockGraph stockInfo={stockData} />
}

export default StockDetailsComponent
