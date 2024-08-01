import { Card, CardBody, Progress } from "@nextui-org/react"
import React from "react"
import { USDFormat } from "../utils/helper"

function AvailableBalance({ balance = 0, transactions = 0, className = "" }) {
  return (
    <Card className={`p-2 ${className}`}>
      <CardBody className="space-y-8">
        <p className="text-default-600">Available balance 💵💵</p>
        <div className="space-y-2">
          <Progress size="sm" label="Total transactions" value={transactions} />
          <p className="text-4xl font-medium">{USDFormat(balance)}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default AvailableBalance
