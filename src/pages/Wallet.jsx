import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import databaseService from "../supabase/database"
import { Spinner } from "@nextui-org/react"
import { AddMoneyComponent, TransactionsHistory } from "../components"

function Wallet() {
  const user = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   databaseService
  //     .getWallet({ user_id: user.id })
  //     .then(({ data }) => console.log(data))
  //     .finally(() => setLoading(false))
  // }, [])

  return !loading ? (
    <div className="m-4 space-y-4">
      <div className="flex w-full justify-between">
        <p className="text-3xl font-bold">Your wallet</p>
        <AddMoneyComponent />
      </div>
      <p className="text-3xl font-bold">Transaction history</p>
      <TransactionsHistory />
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Wallet
