import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Spinner } from "@nextui-org/react"
import image from "../static/images/no_data.svg"
import {
  AvailableBalance,
  BuySellShareComponent,
  StockDetailsComponent,
  StockGraph,
} from "../components"
import x from "../stocks/dummy-data"
import { useWallet } from "../store/slice/walletSlice"
import { useStocks } from "../store/slice/stockSlice"

function Stock() {
  const { symbol } = useParams()
  const { data: walletData } = useWallet()
  const { data: stocks } = useStocks()

  // get required info about wallet and stock
  const { balance, wallet_transaction } = { ...walletData }
  const { current_price } = {
    ...stocks.find((stock) => stock.symbol == symbol),
  }

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
      <div className="flex flex-col lg:flex-row gap-4">
        <AvailableBalance
          balance={balance}
          transactions={wallet_transaction?.length}
          className="lg:w-1/4 h-fit order-3 lg:order-1"
        />
        <StockGraph
          stockData={stockData}
          className="lg:w-3/5 order-1 lg:order-2"
        />
        <div className="lg:w-1/4 h-fit order-2 lg:order-3 flex flex-row lg:flex-col gap-4">
          <StockDetailsComponent
            stockData={stockData.prices[0]}
            className="w-full"
          />
          <BuySellShareComponent
            balance={balance}
            current_price={current_price}
            className="w-full"
          />
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

export default Stock
