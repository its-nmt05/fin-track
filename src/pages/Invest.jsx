import React from "react"
import { InfoCard, StockDisclaimerComponent } from "../components"
import { useSelector } from "react-redux"

function Invest() {
  const stocks = useSelector((state) => state.data.stocks)

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center space-x-1">
        <p className="text-3xl font-bold">All stocks</p>
        <StockDisclaimerComponent />
      </div>
      <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {stocks?.map((stock) => (
          <InfoCard companyInfo={stock} />
        ))}
      </div>
    </div>
  )
}

export default Invest
