import React, { useEffect, useState } from "react"
import {
  PortfolioAllocations,
  TradingActivity,
  TransactionsTable,
} from "../components"
import databaseService from "../supabase/database"
import useAuth from "../hooks/useAuth"
import { Spinner } from "@nextui-org/react"

function Portfolio() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    databaseService
      .getPortfolio({ user_id: user.id })
      .then(({ data, error }) => {
        console.log(data)
        setLoading(false)
        if (!error) {
          setData(data)
        }
      })
  }, [])

  return !loading ? (
    <div className="space-y-8">
      <div className="flex lg:flex-row flex-col lg:space-x-6">
        <PortfolioAllocations className="basis-1/3" />
        <TradingActivity className="basis-2/3" />
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
