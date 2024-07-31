import React from "react"
import PortfolioStockCard from "./PortfolioStockCard"
import { useSelector } from "react-redux"

function PortfolioStockList({ portfolio_stocks = [] }) {
  const stocks = useSelector((state) => state.data.stocks)

  return portfolio_stocks.length == 0 ? (
    <div className="w-full text-center">
      <p className="text-lg text-default-600 font-medium">You have no stocks</p>
    </div>
  ) : (
    <ul className="flex flex-row space-x-4">
      {portfolio_stocks.map((portfolio_stock) => {
        let merged = {
          ...portfolio_stock,
          ...stocks.find((stock) => stock.symbol == portfolio_stock.symbol),
        }
        return (
          <li key={merged.id}>
            <PortfolioStockCard stock={merged} />
          </li>
        )
      })}
    </ul>
  )
}

export default PortfolioStockList
