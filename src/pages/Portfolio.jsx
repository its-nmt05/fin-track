import React, { useCallback, useEffect, useMemo } from "react"
import {
  PortfolioStockList,
  TradingActivity,
  TransactionsTable,
} from "../components"
import { Spinner } from "@nextui-org/react"
import { usePortfolio } from "../store/slice/portfolioSlice"
import { filterStocks } from "../utils/helper"

function Portfolio() {
  const { data, isLoading } = usePortfolio()
  const { portfolio_transaction, portfolio_stocks } = data
  const filteredStocks = filterStocks(portfolio_stocks)
  
  return !isLoading ? (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-3xl font-bold">Your stocks</p>
        <PortfolioStockList portfolio_stocks={filteredStocks} />
      </div>
      <div className="space-y-4">
        <p className="text-3xl font-bold">Your portfolio</p>
        <div className="flex lg:flex-row flex-col lg:space-x-6 lg:space-y-0 space-y-6">
          {/* <PortfolioAllocations className="basis-1/3" data={data} /> */}
          <TradingActivity className="basis-2/3" />
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-3xl font-bold">Transaction history</p>
        <TransactionsTable transactions={portfolio_transaction} />
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Portfolio
