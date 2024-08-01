import React from "react"
import { Card, CardBody, Progress, Spinner } from "@nextui-org/react"
import {
  AddMoneyComponent,
  WalletChart,
  WalletTransactions,
  WithdrawMoneyComponent,
} from "../components"
import { USDFormat } from "../utils/helper"
import { useWallet } from "../store/slice/walletSlice"

function Wallet() {
  const { isLoading, data } = useWallet()
  const { id, wallet_transaction, balance } = { ...data }

  return !isLoading ? (
    <div className="space-y-4">
      <div className="flex w-full justify-between">
        <p className="text-3xl font-bold">Your wallet</p>
        <AddMoneyComponent wallet_id={id} />
      </div>
      <div className="w-full flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 pb-5">
        <div className="basis-1/3 flex flex-col justify-between space-y-5">
          <Card className="p-2">
            <CardBody className="space-y-8">
              <p className="text-default-600">Available balance 💵💵</p>
              <div className="space-y-2">
                <Progress
                  size="sm"
                  label="Total transactions"
                  value={wallet_transaction.length}
                />
                <p className="text-4xl font-medium">{USDFormat(balance)}</p>
              </div>
            </CardBody>
          </Card>
          <WithdrawMoneyComponent balance={balance} wallet_id={id} />
        </div>
        <WalletChart data={wallet_transaction} />
      </div>
      <p className="text-3xl font-bold">Transaction history</p>
      <WalletTransactions transactions={wallet_transaction} />
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Wallet
