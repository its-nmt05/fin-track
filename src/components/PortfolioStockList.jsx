import React from "react"
import { PortfolioStockCard } from "./"
import image from "../static/images/no_data.svg"

function PortfolioStockList({ stocks = [] }) {
  return stocks.length == 0 ? (
    <div className="flex flex-col justify-center items-center">
      <img src={image} alt="no_data" className="sm:w-[25%] w-[60%]" />
      <p className="text-xl font-bold">You have no stocks</p>
    </div>
  ) : (
    <div className="gap-4 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
      {stocks.map((stock) => (
        <PortfolioStockCard key={stock.id} stock={stock} />
      ))}
    </div>
  )
}

export default PortfolioStockList
