import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import databaseService from "../supabase/database"
import { Spinner } from "@nextui-org/react"
import image from "../static/images/no_data.svg"
import {
  BuySellShareComponent,
  StockDetailsComponent,
  StockGraph,
} from "../components"
import x from "../stocks/dummy-data"

function StockDetails() {
  const { symbol } = useParams()
  const [stockData, setStockData] = useState(x)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   databaseService.getStockData({ symbol }).then(({ data, error }) => {
  //     if (!error) {
  //       console.log(data)
  //       setLoading(false)
  //       setStockData(data)
  //     }
  //   })
  // }, [])

  return !loading ? (
    stockData ? (
      <div className="w-full flex lg:flex-row flex-col lg:space-x-6 space-y-4 lg:space-y-0">
        <div className="basis-3/4 w-full  h-fit">
          <StockGraph stockData={stockData} />
        </div>
        <div className="basis-1/4 flex lg:flex-col flex-row lg:space-y-6 space-x-4 lg:space-x-0">
          <StockDetailsComponent stockData={stockData.prices[0]} />
          <BuySellShareComponent />
        </div>
      </div>
    ) : (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <img src={image} alt="no_data" className="sm:w-[30%] w-[60%]" />
        <p className="text-xl">
          No stock found for <strong>{symbol}</strong>
        </p>
      </div>
    )
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default StockDetails
