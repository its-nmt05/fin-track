import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react"
import React from "react"
import { IoArrowDownCircle, IoArrowUpCircle } from "react-icons/io5"

function WalletComponent({ wallet }) {
  return (
    <Card
      isPressable
      key={wallet.name}
      className={`w-fit px-2 ${wallet.color}`}
    >
      <CardHeader>
        <p className="text-lg font-semibold">{wallet.name}</p>
      </CardHeader>
      <CardBody>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium text-default-500">Balance</p>
            <p>${wallet.balance}</p>
          </div>
          <div className="space-x-3">
            <Button
              title="Withdraw"
              color="success"
              variant="flat"
              isIconOnly
              radius="lg"
            >
              <IoArrowUpCircle size={24} />
            </Button>
            <Button
              title="Deposit"
              color="danger"
              variant="flat"
              isIconOnly
              radius="lg"
            >
              <IoArrowDownCircle size={24} />
            </Button>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex-col justify-start items-start">
        <p className="text-sm font-medium text-default-500">Last updated on</p>
        <p>
          {new Date(wallet.updated_at).toLocaleTimeString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </CardFooter>
    </Card>
  )
}

export default WalletComponent
