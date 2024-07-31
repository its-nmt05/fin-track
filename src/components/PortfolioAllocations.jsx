import React from "react"
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react"
import { FaArrowTrendDown, FaArrowTrendUp, FaEllipsis } from "react-icons/fa6"
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

  return (
    <Card className={`w-fit p-2 ${className}`}>
      <CardHeader>
        <div className="w-full inline-flex items-center justify-between">
          <p className="font-medium text-xl">Portfolio allocations</p>
          <FaEllipsis />
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-tiny font-bold text-default-500">TOTAL</p>
        <div className="inline-flex space-x-2 items-center mb-4">
          <p className="text-2xl font-bold">{USDFormat(total)}</p>
          <Chip
            radius="sm"
            variant="flat"
            color={p_return > 0 ? "success" : "danger"}
          >
            <div className="inline-flex items-center space-x-2">
              {p_return > 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
              <p>{fractionFormat(p_return)}%</p>
            </div>
          </Chip>
        </div>
        <ResponsiveContainer width="90%" aspect={1.5}>
          <PieChart>
            <Pie
              data={portfolio_stocks}
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
            <Tooltip />
            <Legend
              legendType="circle"
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}

export default PortfolioAllocations
