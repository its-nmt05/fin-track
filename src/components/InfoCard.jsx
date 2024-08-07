import React from "react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { FaCircleArrowDown, FaCircleArrowUp, FaEllipsis } from "react-icons/fa6"
import { fractionFormat, USDFormat } from "../utils/helper"
import { useNavigate } from "react-router-dom"
import { StockChart } from "./"

function InfoCard({
  stockData: { symbol, name, current_price, change, image, prices },
  className = "",
}) {
  const navigate = useNavigate()
  prices = prices.map((value) => ({ amount: value }))

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
          <StockChart change={change} data={prices} aspect={2} />
          <div className="flex flex-col justify-end items-end lg:space-y-1">
            <p className="text-xl font-semibold">{USDFormat(current_price)}</p>
            <div className="inline-flex items-center space-x-1">
              <p>{fractionFormat(change)}%</p>
              {change > 0 ? (
                <FaCircleArrowUp size={20} color="limegreen" />
              ) : (
                <FaCircleArrowDown size={20} color="crimson" />
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoCard
