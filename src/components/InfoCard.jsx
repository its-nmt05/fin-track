import React from "react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { FaEllipsis, FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6"
import { fractionFormat, USDFormat } from "../utils/helper"
import { useNavigate } from "react-router-dom"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

function InfoCard({
  stockData: { symbol, name, current_price, change, image, prices },
  className = "",
}) {
  if (symbol == "CRDT") console.log(change)
  const navigate = useNavigate()
  prices = prices.map((value) => ({ amount: value }))
  image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi_F5mBDcXHBlUDkSiJD9-ZmnKHIjG9h-nhQ&s"
  return (
    <Card
      isPressable
      isHoverable
      className={`p-1 ${className}`}
      onPress={() => navigate(`/stock/${symbol}`)}
    >
      <CardHeader className="flex space-x-2 justify-between items-start">
        <div className="flex space-x-2">
          <img className="rounded-full max-w-[50px] max-h-[50px]" src={image} />
          <div className="w-full flex flex-col items-start">
            <p className="text-md font-semibold">{symbol}</p>
            <p className="text-sm text-start line-clamp-1">{name}</p>
          </div>
        </div>
        <FaEllipsis />
      </CardHeader>
      <CardBody>
        <div className="w-full flex flex-row justify-between">
          <ResponsiveContainer width="50%" aspect={2}>
            <AreaChart
              data={prices}
              margin={{ left: 0, right: 0, top: 2, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={change < 0 ? "red" : "green"}
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor={change < 0 ? "crimson" : "limegreen"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="amount"
                type="monotone"
                stroke={change < 0 ? "crimson" : "limegreen"}
                fill="url(#gradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-end items-end space-y-1">
            <p className="text-xl font-semibold">{USDFormat(current_price)}</p>
            <div className="inline-flex items-center space-x-2">
              <p>{fractionFormat(change)}%</p>
              {change < 0 ? (
                <FaCircleArrowDown size={20} color="crimson" />
              ) : (
                <FaCircleArrowUp size={20} color="limegreen" />
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoCard
