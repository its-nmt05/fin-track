import React from "react"
import StockGraph from "./StockGraph"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { USDFormat } from "../utils/helper"

function StockDetailsComponent({
  price_data: { open, close, low, high, volume },
}) {
  return (
    <Card className="w-full p-2">
      <CardHeader>
        <p className="text-xl font-medium">Details</p>
      </CardHeader>
      <CardBody className="space-y-2">
        <div className="flex justify-between">
          <p className="text-default-500 font-medium">Open</p>
          <p className="font-medium">{USDFormat(open)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-default-500 font-medium">Close</p>
          <p className="font-medium">{USDFormat(close)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-default-500 font-medium">High</p>
          <p className="font-medium">{USDFormat(high)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-default-500 font-medium">Low</p>
          <p className="font-medium">{USDFormat(low)}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-default-500 font-medium">%Change</p>
          <p className="text-green-500 font-bold">$300</p>
        </div>
        <div className="flex justify-between">
          <p className="text-default-500 font-medium">Volume</p>
          <p className="font-medium">{volume}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default StockDetailsComponent
