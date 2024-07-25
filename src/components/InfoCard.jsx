import React from "react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { FaEllipsis, FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6"
import { USDFormat } from "../utils/helper"
import { useNavigate } from "react-router-dom"
import { Line, LineChart, ResponsiveContainer } from "recharts"

function InfoCard({
  companyInfo: { symbol, name, current_price, change, image, prices },
  className = "",
}) {
  prices = prices.map((value) => ({ amount: value }))

  const navigate = useNavigate()
  image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi_F5mBDcXHBlUDkSiJD9-ZmnKHIjG9h-nhQ&s"
  return (
    <Card
      isPressable
      isHoverable
      className={`py-1 px-1 ${className}`}
      onPress={() => navigate(`/stock/${symbol}`)}
    >
      <CardHeader className="flex space-x-2 justify-between items-start">
        <div className="flex space-x-2">
          <img className="rounded-full max-w-[50px] max-h-[50px]" src={image} />
          <div className="w-full flex flex-col items-start">
            <p className="text-md font-semibold">{symbol}</p>
            <p className="text-sm text-start">{name}</p>
          </div>
        </div>
        <FaEllipsis />
      </CardHeader>
      <CardBody>
        <div className="w-full flex flex-row justify-between">
          <ResponsiveContainer width="50%" aspect={2}>
            <LineChart data={prices}>
              <Line
                dataKey="amount"
                type="monotone"
                dot={false}
                stroke={change < 0 ? "crimson" : "limegreen"}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="space-y-1">
            <p className="text-xl font-semibold">{USDFormat(current_price)}</p>
            <div className="inline-flex items-center space-x-2">
              <p>{change}%</p>
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
