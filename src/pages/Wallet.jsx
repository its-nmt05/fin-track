import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import databaseService from "../supabase/database"
import {
  Spinner,
} from "@nextui-org/react"
import { AddWalletComponent } from "../components"
import WalletComponent from "../components/WalletComponent"

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
    <div className="m-4 space-y-4">
      <div className="w-full inline-flex justify-between">
        <p className="text-2xl font-bold">Your wallets</p>
        <AddWalletComponent />
      </div>
      <div className="inline-flex space-x-4">
        {wallets.map((wallet) => (
          <WalletComponent wallet={wallet}/>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Wallet
