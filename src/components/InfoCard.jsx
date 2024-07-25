import React from "react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { FaEllipsis, FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6"
import { USDFormat } from "../utils/helper"
import { Link, useNavigate } from "react-router-dom"

function InfoCard({
  companyInfo: { symbol, name, current_price, change, image },
  className = "",
}) {
  image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi_F5mBDcXHBlUDkSiJD9-ZmnKHIjG9h-nhQ&s"
  return (
    <Link to={`/stock/${symbol}`}>
      <Card isPressable isHoverable className={`py-1 px-1 ${className}`}>
        <CardHeader className="flex space-x-2 justify-between items-start">
          <div className="flex space-x-2">
            <img
              className="rounded-full max-w-[50px] max-h-[50px]"
              src={image}
            />
            <div className="w-full flex flex-col items-start">
              <p className="text-md font-semibold">{symbol}</p>
              <p className="text-sm">{name}</p>
            </div>
          </div>
          <FaEllipsis />
        </CardHeader>
        <CardBody className="flex-row justify-between items-end">
          <p className="text-xl font-semibold">{USDFormat(current_price)}</p>
          <div className="flex items-center justify-center space-x-2">
            <p>{change}</p>
            {true ? (
              <FaCircleArrowUp color="lime" size={20} />
            ) : (
              <FaCircleArrowDown color="darkorange" size={20} />
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}

export default InfoCard
