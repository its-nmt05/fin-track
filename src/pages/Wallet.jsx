import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import databaseService from "../supabase/database"
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react"
import { AddWalletComponent } from "../components"

function Wallet() {
  const user = useSelector((state) => state.user)
  const [loading, setLoading] = useState(true)
  const [wallets, setWallets] = useState([])

  useEffect(() => {
    databaseService
      .getWallets({ user_id: user.id })
      .then(({ data }) => {
        setWallets(data)
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="w-full inline-flex justify-between p-4">
      <div>
        {wallets.map((wallet) => (
          <Card
            isPressable
            key={wallet.name}
            className={`w-fit mb-4 ${wallet.color}`}
          >
            <CardHeader>{wallet.name}</CardHeader>
            <CardBody>{wallet.balance}</CardBody>
          </Card>
        ))}
      </div>
      <AddWalletComponent />
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Wallet
