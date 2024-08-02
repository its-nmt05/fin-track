import React from "react"
import {
  AddMoneyComponent,
  AvailableBalance,
  WalletChart,
  WalletTransactions,
  WithdrawMoneyComponent,
} from "../components"
import { useWallet } from "../store/slice/walletSlice"

function Wallet() {
  const { data: { id, wallet_transaction, balance } = {} } = useWallet()

  return (
    <div className="space-y-4">
      <div className="flex w-full justify-between">
        <p className="text-3xl font-bold">Your wallet</p>
        <AddMoneyComponent wallet_id={id} />
      </div>
      <div className="w-full flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 pb-5">
        <div className="basis-1/3 flex flex-col justify-between space-y-5">
          <AvailableBalance
            balance={balance}
            transactions={wallet_transaction?.length}
          />
          <WithdrawMoneyComponent balance={balance} wallet_id={id} />
        </div>
        <WalletChart data={wallet_transaction} />
      </div>
      <p className="text-3xl font-bold">Transaction history</p>
      <WalletTransactions transactions={wallet_transaction} />
    </div>
  )
}

export default Wallet
