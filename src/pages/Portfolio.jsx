import React from "react"
import {
  PortfolioAllocations,
  TradingActivity,
  TransactionsTable,
} from "../components"

function Portfolio() {
  return (
    <div className="space-y-12 m-5">
      <div className="w-full inline-flex">
        <PortfolioAllocations className="basis-1/3"/>
        <TradingActivity className="basis-2/3"/>
      </div>
      <TransactionsTable />
    </div>
  )
}

export default Portfolio
