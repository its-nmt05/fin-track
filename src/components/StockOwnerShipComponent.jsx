import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react"
import React from "react"
import { dateFormat, numFormat, USDFormat } from "../utils/helper"

function StockOwnerShipComponent({
  quantity = 0,
  transactions = [],
  className = "",
}) {
  return (
    <Card className={`py-2 px-1 ${className}`}>
      <CardHeader className="pb-0">
        <div>
          You currently own <strong>{numFormat(quantity)}</strong>{" "}
          {quantity == 1 ? "quantity" : "quanities"} of this stock.
        </div>
      </CardHeader>
      <CardBody>
        {transactions.length == 0 ? (
          <p className="text-default-600 text-center py-8">
            No transactions found
          </p>
        ) : (
          <div>
            <p className="font-bold text-xl mb-1">Transactions</p>
            {transactions.map((tran) => {
              const { id, symbol, time, quantity, price, operation } = tran
              return (
                <div key={id}>
                  <p className="text-tiny">
                    <strong>{symbol}</strong> &#x2022; {dateFormat(time)}
                  </p>
                  <p className="text-tiny text-default-600 mb-1 line-clamp-1">{id}</p>
                  <div className="space-x-1">
                    <Chip
                      size="sm"
                      radius="sm"
                      color={operation == "buy" ? "success" : "danger"}
                      variant="flat"
                    >
                      {operation.toUpperCase()}
                    </Chip>
                    <Chip
                      size="sm"
                      radius="sm"
                      color={operation == "buy" ? "success" : "danger"}
                      variant="flat"
                    >
                      {numFormat(quantity)} &#x2022; {USDFormat(price)}
                    </Chip>
                  </div>
                  <Divider className="mt-2" />
                </div>
              )
            })}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default StockOwnerShipComponent
