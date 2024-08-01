import React from "react"
import useAuth from "../hooks/useAuth"
import { greet } from "../utils/helper"
import { useStocks } from "../store/slice/stockSlice"
import { SortedStockList } from "../components"
import { Spinner } from "@nextui-org/react"

function Home() {
  const { user } = useAuth()
  const name = user?.user_metadata?.name
  const { isLoading, data } = useStocks()

  return !isLoading ? (
    <div className="space-y-6">
      <p className="text-3xl font-medium">
        {greet()},
        <br /> <strong>{name}</strong>
      </p>
      <div className="space-y-4">
        <p className="text-3xl font-bold">Top stocks</p>
        <SortedStockList data={data} property="change" asc={false} />
      </div>
      <div className="space-y-4">
        <p className="text-3xl font-bold">Worst performing</p>
        <SortedStockList data={data} property="change" />
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Home
