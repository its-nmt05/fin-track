import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import databaseService from "../supabase/database"
import { Card, CardBody, Progress, Spinner } from "@nextui-org/react"
import {
  AddMoneyComponent,
  WalletTransactions,
  WithdrawMoneyComponent,
} from "../components"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { USDFormat } from "../utils/helper"
import useAuth from "../hooks/useAuth"

function Wallet() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    databaseService
      .getWallet({
        user_id: user.id,
        onPayload: (payload) => setData(payload),
      })
      .then(({ data, error }) => {
        setData(data)
        if (!error) {
          setLoading(false)
        }
      })
  }, [])

  return !loading ? (
    <div className="mx-8 my-4 space-y-4">
      <div className="flex w-full justify-between">
        <p className="text-3xl font-bold">Your wallet</p>
        <AddMoneyComponent />
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
                  value={data?.transactions.length || 0}
                />
                <p className="text-4xl font-medium">
                  {USDFormat(data?.balance || 0)}
                </p>
              </div>
            </CardBody>
          </Card>
          <WithdrawMoneyComponent balance={data?.balance || 0} />
        </div>
        <Card className="basis-2/3">
          <CardBody>
            <ResponsiveContainer width="100%" aspect={2.3}>
              <LineChart
                data={data?.transactions}
                margin={{ left: 5, right: 5, top: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#16a253" />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
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
