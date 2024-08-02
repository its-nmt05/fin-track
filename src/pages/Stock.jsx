import React from "react"
import { useParams } from "react-router-dom"
import { Spinner } from "@nextui-org/react"
import {
  AvailableBalance,
  BuySellShareComponent,
  StockGraph,
} from "../components"
import { useWallet } from "../store/slice/walletSlice"
import { useStocks } from "../store/slice/stockSlice"

function Stock() {
  const { symbol } = useParams()
  const {
    data: { balance, wallet_transaction },
  } = useWallet() // get required info about wallet

  const { data: stocks, isLoading } = useStocks() // get required info about stock
  const stockData = stocks.find((stock) => stock.symbol == symbol)

  return !isLoading ? (
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
        {/* <StockDetailsComponent
          stockData={stockData.prices[0]}
          className="w-full"
        /> */}
        <BuySellShareComponent
          symbol={stockData.symbol}
          current_price={stockData.current_price}
          balance={balance}
          className="w-full"
        />
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Stock
