import React from "react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { USDFormat } from "../utils/helper"
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5"
import { GoGraph } from "react-icons/go"
import { RiSlowDownLine, RiStockLine } from "react-icons/ri"
import { IoMdInformationCircleOutline } from "react-icons/io"

function StockDetailsComponent({
  stockData: { open, close, low, high, volume },
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  // content to display
  const content = [
    {
      title: "Open",
      icon: <IoLockOpenOutline size={22} />,
      body: "The price at which a stock starts trading when the market opens",
    },
    {
      title: "Close",
      icon: <IoLockClosedOutline size={22} />,

      body: "The last price a stock trades at when the market closes",
    },
    {
      title: "High",
      icon: <RiSlowDownLine size={22} />,

      body: "The highest price a stock reaches during the trading day",
    },
    {
      title: "Low",
      icon: <RiSlowDownLine size={22} />,
      body: "The lowest price a stock reaches during the trading day",
    },
    {
      title: "Change",
      icon: <GoGraph size={22} />,
      body: "The percentage difference between today's closing price and the previous day's closing price",
    },
    {
      title: "Volume",
      icon: <RiStockLine size={22} />,
      body: "The total number of shares traded during the day",
    },
  ]

  return (
    <>
      <Card className="w-full p-2">
        <CardHeader className="space-x-1">
          <p className="text-xl font-medium">Details</p>
          <IoMdInformationCircleOutline cursor="pointer" onClick={onOpen} />
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
      <Modal
        size="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
        placement="center"
        className="py-3"
      >
        <ModalContent>
          <ModalHeader>
            <div className="flex flex-col w-full items-center">
              <p className="font-medium text-xl">Stock performance</p>
              <p className="text-sm font-normal text-default-600">
                Learn what do these stock market terms even mean
              </p>
            </div>
          </ModalHeader>
          <ModalBody>
            {content.map((para) => (
              <div key={para.title}>
                <div className="inline-flex items-center space-x-1">
                  {para.icon}
                  <p className="font-medium">{para.title}</p>
                </div>
                <p className="text-sm">{para.body}</p>
              </div>
            ))}
          </ModalBody>
          <ModalFooter className="py-2 px-5">
            <Button
              radius="sm"
              className="w-full bg-black text-white"
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

export default StockDetailsComponent
