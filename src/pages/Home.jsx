import React from "react"
import useAuth from "../hooks/useAuth"
import { useSelector } from "react-redux"
import { sort } from "../utils/helper"
import InfoCard from "../components/InfoCard"

function Home() {
  const { user } = useAuth()
  const name = user?.user_metadata.name
  const stocks = useSelector((state) => state.data.stocks)
  const topStocks = sort(stocks, {
    property: "change",
    limit: 4,
    asc: false,
  })

  return (
    <div className="space-y-6">
      <p className="text-3xl font-medium">
        Welcome back,
        <br /> <strong>{name}</strong>
      </p>
      <div className="space-y-4">
        <p className="text-3xl font-bold">Top stocks</p>
        <div className="gap-4 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
          {topStocks.map((stock) => (
            <InfoCard key={stock.id} stockData={stock} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
