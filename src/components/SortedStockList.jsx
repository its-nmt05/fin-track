import React from "react"
import InfoCard from "./InfoCard"
import { sort } from "../utils/helper"

function SortedStockList({ data, property, limit = 4, asc = true }) {
  const sorted = sort(data, { property, limit, asc })
  return (
    <div className="gap-4 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
      {sorted.map((stock) => (
        <InfoCard key={stock.id} stockData={stock} />
      ))}
    </div>
  )
}

export default SortedStockList
