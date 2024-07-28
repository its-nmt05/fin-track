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
  const [portfolioData, setPortfolioData] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    databaseService
      .getPortfolio({ user_id: user.id })
      .then(({ data, error }) => {
        setLoading(false)
        if (!error) {
          setPortfolioData(data)
        }
      })
  }, [])

  return !loading ? (
    <div className="space-y-12 m-5">
      <div className="w-full inline-flex">
        <PortfolioAllocations className="basis-1/3" />
        <TradingActivity className="basis-2/3" />
      </div>
      <TransactionsTable transactions={portfolioData?.transactions} />
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Portfolio
