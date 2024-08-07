import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import React from "react"
import { dateFormat, numFormat, USDFormat } from "../utils/helper"

function StockOwnerShipComponent({
  quantity = 0,
  transactions = [],
  className = "",
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  return (
    <>
      <Card className={`py-2 px-1 ${className}`}>
        <CardBody className="pb-2">
          <div className="h-full flex flex-col justify-between gap-6">
            <p>
              You currently own <strong>{numFormat(quantity)}</strong>{" "}
              {quantity == 1 ? "quantity" : "quanities"} of this stock.
            </p>
            <Button className="bg-black text-white w-full" onPress={onOpen}>
              View all transactions
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
        placement="center"
        className="py-3"
        size="sm"
      >
        <ModalContent>
          <ModalHeader>
            <p className="font-bold text-xl">Transactions</p>
          </ModalHeader>
          <ModalBody>
            {transactions.length == 0 && (
              <p className="text-center text-default-600 py-8">
                No transactions
              </p>
            )}
            {transactions.map((trans) => {
              const { id, symbol, time, quantity, price, operation } = trans
              return (
                <div key={id} className="mx-2">
                  <p className="text-tiny">
                    <strong>{symbol}</strong> &#x2022; {dateFormat(time)}
                  </p>
                  <p className="text-tiny text-default-600 mb-1">{id}</p>
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
          </ModalBody>
          <ModalFooter className="pb-2">
            <Button
              className="bg-black text-white w-full"
              radius="sm"
              onPress={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default StockOwnerShipComponent
