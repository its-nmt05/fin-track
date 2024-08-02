import React from "react"
import { useParams } from "react-router-dom"
import { Spinner } from "@nextui-org/react"
import {
  AvailableBalance,
  BuySellShareComponent,
  StockDetailsComponent,
  StockGraph,
} from "../components"
import { useWallet } from "../store/slice/walletSlice"
import { useStocks } from "../store/slice/stockSlice"
import image from "../static/images/no_data.svg"

function Stock() {
  const { symbol } = useParams()
  const {
    data: { balance, wallet_transaction },
  } = useWallet() // get required info about wallet

  const { data: stocks, isLoading } = useStocks() // get required info about stock
  const stockData = stocks.find((stock) => stock.symbol == symbol)

  return !isLoading ? (
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
          <StockDetailsComponent className="w-full" />
          <BuySellShareComponent
            symbol={stockData.symbol}
            current_price={stockData.current_price}
            balance={balance}
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
