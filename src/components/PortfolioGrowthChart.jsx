import { Card, CardBody, CardHeader } from "@nextui-org/react"
import React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { USDFormat } from "../utils/helper"

function PortfolioGrowthChart({ data = [], className = "" }) {
  const CustomTooltip = ({ payload }) => {
    if (payload?.length) {
      const data = payload[0].payload
      return (
        <div className="backdrop-blur-sm bg-black bg-opacity-50 shadow-xl rounded-full px-3 py-1">
          <p className="text-sm text-default-200">
            Total: {USDFormat(data.amount)}
          </p>
        </div>
      )
    }
  }

  data = data.map((value) => ({ amount: value }))

  return (
    <Card className={`p-2 ${className}`}>
      <CardHeader className="pt-1">
        <div>
          <p className="text-xl font-bold">Portfolio Growth</p>
          <p className="text-default-600 text-sm">
            This is the blended growth of all the stocks in your portfolio
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" aspect={2.8}>
          <AreaChart data={data} margin={{ left: 5, right: 5, top: 5 }}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="green" stopOpacity={0.3} />
                <stop offset="95%" stopColor="green" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip content={CustomTooltip} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#16A253"
              fill="url(#gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}

export default PortfolioGrowthChart
