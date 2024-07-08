import React from "react"
import { PortfolioAllocations, TransactionsTable } from "../components"

function Portfolio() {
  return (
    <div className="space-y-12 m-5">
      <PortfolioAllocations />
      <TransactionsTable />
    </div>
  )
}

export default Portfolio
