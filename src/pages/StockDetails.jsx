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

function StockDetails() {
  const { symbol } = useParams()
  const [stockData, setStockData] = useState(null)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   databaseService.getStockData({ symbol }).then(({ data, error }) => {
  //     if (!error) {
  //       setLoading(false)
  //       setStockData(data)
  //     }
  //   })
  // }, [])

  return !loading ? (
    !stockData ? (
      <div className="w-full flex sm:flex-row flex-col py-4 px-8 sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="w-full basis-3/4 h-fit">
          {/* <StockGraph stockData={stockData} /> */}
          <p>hey</p>
        </div>
        <div className="basis-1/4 flex sm:flex-col flex-row sm:space-y-4 space-y-0 sm:space-x-0 space-x-4">
          {/* <StockDetailsComponent price_data={stockData.prices[0]} /> */}
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
