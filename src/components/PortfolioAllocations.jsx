import React from "react"
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react"
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6"
import { fractionFormat, USDFormat } from "../utils/helper"
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

function PortfolioAllocations({
  className = "",
  data: { total, invested, portfolio_stocks },
}) {
  // calculate the % returns
  const p_return = (total - invested) / invested
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const CustomTooltip = ({ payload }) => {
    if (payload?.length) {
      const data = payload[0]
      return (
        <div className="bg-black bg-opacity-70 shadow-xl rounded-full px-3 py-1">
          <p className="text-sm text-default-200">
            {data.name} &#x2022; {data.value}
          </p>
        </div>
      )
    }
  }

  return (
    <Card className={`p-2 ${className}`}>
      <CardHeader>
        <p className="font-medium text-xl">Portfolio allocations</p>
      </CardHeader>
      <CardBody>
        <p className="text-tiny font-bold text-default-500">TOTAL</p>
        <div className="inline-flex space-x-2 items-center">
          <p className="text-2xl font-bold">{USDFormat(total)}</p>
          <Chip
            radius="sm"
            variant="flat"
            color={p_return > 0 ? "success" : "danger"}
          >
            <div className="inline-flex items-center space-x-2">
              {p_return > 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
              <p>{fractionFormat(p_return || 0)}%</p>
            </div>
          </Chip>
        </div>
        {portfolio_stocks.length == 0 ? (
          <div className="w-full text-center py-[20%]">
            <p className="text-default-600">Invest in some stocks first</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" aspect={1.5}>
            <PieChart>
              <Pie
                data={portfolio_stocks}
                cx="40%"
                dataKey="quantity"
                nameKey="symbol"
                innerRadius={50}
                outerRadius={100}
                legendType="circle"
              >
                {portfolio_stocks.map((_, index) => (
                  <Cell key={1} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={CustomTooltip} />
              <Legend
                legendType="circle"
                layout="vertical"
                align="right"
                verticalAlign="middle"
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardBody>
    </Card>
  )
}

export default PortfolioAllocations
