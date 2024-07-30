import { Card, CardBody, CardHeader } from "@nextui-org/react"
import React from "react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { fractionFormat, USDFormat } from "../utils/helper"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6"

function PortfolioStockCard({
  stock: { symbol, image, quantity, price, current_price, prices = [], change },
}) {
  // calculate the return %
  const p_return = (current_price - price) / price
  prices = prices.map((value) => ({ amount: value }))

  image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi_F5mBDcXHBlUDkSiJD9-ZmnKHIjG9h-nhQ&s"

  return (
    <Card className="min-w-[14rem] p-1">
      <CardHeader className="pb-0 justify-between">
        <div className="flex space-x-2">
          <img className="rounded-full max-w-[28px] max-h-[28px]" src={image} />
          <p className="text-lg font-bold">{symbol}</p>
        </div>
        <ResponsiveContainer width="50%" aspect={1.8}>
          <AreaChart
            data={prices}
            margin={{ left: 5, right: 0, top: 5, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={change > 0 ? "red" : "green"}
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor={change > 0 ? "crimson" : "limegreen"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="amount"
              type="monotone"
              dot={false}
              stroke={change > 0 ? "crimson" : "#16a253"}
              fill="url(#gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardHeader>
      <CardBody className="space-y-1">
        <div className="inline-flex justify-between">
          <p className="text-default-600">Total Invested</p>
          <p className="font-medium">{USDFormat(quantity * price)}</p>
        </div>
        <div className="inline-flex justify-between">
          <p className="text-default-600">Total Return</p>
          <div className="flex items-center space-x-1">
            <p
              className={`font-medium ${
                p_return < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {fractionFormat(p_return)}%
            </p>
            {p_return < 0 ? (
              <FaCircleArrowDown size={20} color="crimson" />
            ) : (
              <FaCircleArrowUp size={20} color="limegreen" />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default PortfolioStockCard
