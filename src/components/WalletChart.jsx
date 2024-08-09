import { Card, CardBody } from "@nextui-org/react"
import React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"
import { capitalize, USDFormat } from "../utils/helper"

function WalletChart({ data }) {
  const CustomTooltip = ({ payload }) => {
    if (payload?.length) {
      const data = payload[0].payload
      return (
        <div className="backdrop-blur-sm bg-black/50 dark:bg-white/50 shadow-xl rounded-full px-3 py-1">
          <p className="text-sm text-default-200">
            {USDFormat(data.amount)} &#x2022; {capitalize(data.type)}
          </p>
        </div>
      )
    }
  }

  return (
    <Card className="basis-2/3">
      <CardBody>
        <ResponsiveContainer width="100%" aspect={2.25}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="green" stopOpacity={0.4} />
                <stop offset="95%" stopColor="green" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={CustomTooltip} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#16a253"
              fill="url(#gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}

export default WalletChart
