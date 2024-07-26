import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react"
import React, { useState } from "react"
import { USDFormat } from "../utils/helper"

function BuySellShareComponent({ current_price = 100 }) {
  const operations = [
    { key: "buy", title: "Buy" },
    { key: "sell", title: "Sell" },
  ]
  const [currentOperation, setCurrentOperation] = useState(operations[0].key)
  const [shares, setShares] = useState(1)

  return (
    <Card className="w-full p-2">
      <CardHeader className="flex justify-between">
        <p className="text-xl font-medium">Order</p>
        <Tabs
          radius="full"
          color="primary"
          onSelectionChange={setCurrentOperation}
        >
          {operations.map((op) => (
            <Tab key={op.key} title={op.title} />
          ))}
        </Tabs>
      </CardHeader>
      <CardBody className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-default-500 font-medium">Shares</p>
          <Input
            min={1}
            max={100}
            type="number"
            size="sm"
            radius="lg"
            className="max-w-[40%]"
            value={shares}
            onValueChange={setShares}
            endContent={shares == 1 ? "share" : "shares"}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-default-500 font-medium">Price</p>
          <Input
            size="sm"
            isReadOnly
            radius="lg"
            value={current_price}
            startContent="$"
            className="max-w-[40%]"
          />
        </div>
        <Divider />
        <div className="flex items-center justify-between">
          <p className="font-medium">
            Total {currentOperation == "buy" ? "Investment" : "Profit"}
          </p>
          <p className="text-lg font-medium text-blue-500">
            {USDFormat(shares * current_price)}
          </p>
        </div>
      </CardBody>
      <CardFooter className="px-6">
        <Button className="w-full" radius="full" color="primary">
          {currentOperation.toUpperCase()} NOW
        </Button>
      </CardFooter>
    </Card>
  )
}

export default BuySellShareComponent
