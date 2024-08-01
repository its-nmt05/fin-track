import React from "react"
import { InfoCard, StockDisclaimerComponent } from "../components"
import { useStocks } from "../store/slice/stockSlice"
import { Spinner } from "@nextui-org/react"

function Invest() {
  const { data, isLoading } = useStocks()

  return !isLoading ? (
    <div className="space-y-4">
      <div className="flex flex-row items-center space-x-1">
        <p className="text-3xl font-bold">All stocks</p>
        <StockDisclaimerComponent />
      </div>
      <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((stock) => (
          <InfoCard key={stock.id} stockData={stock} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Invest
