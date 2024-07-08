import React from "react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { FaEllipsis, FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6"

function InfoCard({
  companyInfo: { ticker, name, currentPrice, change, image },
  className = "",
}) {
  return (
    <Card className={`py-1 px-1 ${className}`}>
      <CardHeader className="flex space-x-2 justify-between items-start">
        <div className="flex space-x-2">
          <img className="rounded-full max-w-[50px] max-h-[50px]" src={image} />
          <div>
            <p className="text-md font-semibold">{ticker}</p>
            <p className="text-sm">{name}</p>
          </div>
        </div>
        <FaEllipsis />
      </CardHeader>
      <CardBody className="flex-row justify-between items-end">
        <p className="text-xl font-semibold">{currentPrice}</p>
        <div className="flex items-center justify-center space-x-2">
          <p>{change.value}</p>
          {change.increase ? (
            <FaCircleArrowUp color="lime" size={20} />
          ) : (
            <FaCircleArrowDown color="darkorange" size={20} />
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoCard
