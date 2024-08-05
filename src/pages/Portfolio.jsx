import React from "react"
import {
  PortfolioAllocations,
  PortfolioStockList,
  PortfolioGrowthChart,
  TransactionsTable,
} from "../components"
import { Spinner } from "@nextui-org/react"
import { usePortfolio } from "../store/slice/portfolioSlice"

function Portfolio() {
  const { data, isLoading } = usePortfolio()
  const { transactions } = data
  const { current, invested, growth, stocks } = data

  return !isLoading ? (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="text-3xl font-bold">Your stocks</p>
        <PortfolioStockList stocks={stocks} />
      </div>
      <div className="space-y-4">
        <p className="text-3xl font-bold">Your portfolio</p>
        <div className="flex lg:flex-row flex-col lg:space-x-6 lg:space-y-0 space-y-6">
          <PortfolioAllocations
            className="basis-1/3"
            current={current}
            invested={invested}
            stocks={stocks}
          />
          <PortfolioGrowthChart data={growth} className="basis-2/3" />
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-3xl font-bold">Transaction history</p>
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Portfolio
