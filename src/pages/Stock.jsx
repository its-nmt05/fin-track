import React from "react"
import { useParams } from "react-router-dom"
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react"
import {
  AvailableBalance,
  BuySellShareComponent,
  StockDetailsComponent,
  StockGraph,
  StockOwnerShipComponent,
} from "../components"
import { useWallet } from "../store/slice/walletSlice"
import { useStocks } from "../store/slice/stockSlice"
import image from "../static/images/no_data.svg"
import { usePortfolio } from "../store/slice/portfolioSlice"

function Stock() {
  const { symbol } = useParams()
  let quantity = 0
  let transactions = []

  const {
    data: { balance, wallet_transaction },
  } = useWallet() // get required info about wallet

  const { data: stocks, isLoading } = useStocks() // get required info about stocks
  const stockData = stocks.find((stock) => stock.symbol == symbol)

  const { data } = usePortfolio() // get required info about portfolio
  if (data.stocks) {
    const stock = data.stocks.find((stock) => stock.symbol == symbol)
    if (stock) {
      quantity = stock.quantity
    }
  }

  if (data.transactions) {
    transactions = data.transactions.filter((stock) => stock.symbol == symbol)
  }

  return !isLoading ? (
    stockData ? (
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/4 h-fit order-3 lg:order-1 flex flex-row lg:flex-col gap-4">
          <AvailableBalance
            balance={balance}
            transactions={wallet_transaction?.length}
            className="w-full h-fit"
          />
          <StockOwnerShipComponent
            quantity={quantity}
            transactions={transactions}
            className="w-full max-h-[70vh]"
          />
          <Card>
            <CardHeader>Latest News</CardHeader>
            <CardBody>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem beatae aut temporibus at id dolorum magnam quaerat
                velit debitis ad?
              </p>
            </CardBody>
          </Card>
        </div>
        <StockGraph
          stockData={stockData}
          className="lg:w-3/5 order-1 lg:order-2"
        />
        <div className="lg:w-1/4 h-fit order-2 lg:order-3 flex flex-row lg:flex-col gap-4">
          <StockDetailsComponent className="w-full" />
          <BuySellShareComponent
            symbol={stockData.symbol}
            current_price={stockData.current_price}
            quantity_owned={quantity}
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
