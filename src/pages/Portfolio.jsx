import React, { useEffect, useState } from "react"
import {
  PortfolioAllocations,
  PortfolioStockList,
  TradingActivity,
  TransactionsTable,
} from "../components"
import databaseService from "../supabase/database"
import useAuth from "../hooks/useAuth"
import { Link, Spinner } from "@nextui-org/react"
import image from "../static/images/no_data.svg"

function Portfolio() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    Promise.all([
      databaseService.getPortfolio({ user_id: user.id }),
      databaseService.getPortfolioData({ uid: user.id }),
    ]).then((res) => {
      const { data: data1, error1 } = res[0]
      const { data: data2, error2 } = res[1]
      if (!error1 && !error2) {
        setLoading(false)
        setData({ ...data1, ...data2 })
      }
    })
  }, [])
  console.log(data)
  return !loading ? (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-3xl font-bold">Your stocks</p>
        {data.portfolio_stocks.length > 0 ? (
          <PortfolioStockList portfolio_stocks={data.portfolio_stocks} />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img src={image} alt="no_data" className="sm:w-[25%] w-[60%]" />
            <p className="text-xl font-bold">You have no stocks</p>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <p className="text-3xl font-bold">Your portfolio</p>
        <div className="flex lg:flex-row flex-col lg:space-x-6">
          <PortfolioAllocations className="basis-1/3" data={data} />
          <TradingActivity className="basis-2/3" />
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-3xl font-bold">Transaction history</p>
        <TransactionsTable transactions={data.portfolio_transaction} />
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Portfolio
