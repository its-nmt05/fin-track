import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import databaseService from "../supabase/database"
import { Card, CardBody, Spinner } from "@nextui-org/react"
import { AddMoneyComponent, WalletTransactions } from "../components"

function Wallet() {
  const user = useSelector((state) => state.user)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  let currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  useEffect(() => {
    databaseService
      .getWallet({ user_id: user.id })
      .then(({ data }) => setData(data))
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="m-4 space-y-4">
      <div className="flex w-full justify-between">
        <p className="text-3xl font-bold">Your wallet</p>
        <AddMoneyComponent />
      </div>
      <Card className="w-fit ">
        <CardBody className="space-y-10">
          <p className="text-default-600">Available balance</p>
          <p className="text-3xl font-medium">
            {currencyFormatter.format(data?.balance || 0)}
          </p>
        </CardBody>
      </Card>
      <p className="text-3xl font-bold">Transaction history</p>
      <WalletTransactions transactions={data?.transactions} />
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Wallet
