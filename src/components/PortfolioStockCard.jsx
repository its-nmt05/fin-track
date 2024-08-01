import React from "react"
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
import {
  dateFormat,
  fractionFormat,
  numFormat,
  USDFormat,
} from "../utils/helper"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6"
import { StockChart } from "./"
import { FiExternalLink } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

function PortfolioStockCard({
  stock: {
    name,
    image,
    change,
    symbol,
    orders,
    invested,
    prices = [],
    current_price,
    average_price,
    total_quantity,
  },
}) {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const p_return = (current_price - average_price) / average_price // calculate the % return
  prices = prices.map((value) => ({ amount: value }))
  image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi_F5mBDcXHBlUDkSiJD9-ZmnKHIjG9h-nhQ&s"

  return (
    <>
      <Card isHoverable isPressable className="p-1" onPress={onOpen}>
        <CardHeader className="pb-0 space-x-2 sm:space-x-0 justify-between">
          <div className="flex space-x-2">
            <img
              className="rounded-full max-w-[28px] max-h-[28px]"
              src={image}
            />
            <div>
              <p className="text-lg font-bold">{symbol}</p>
            </div>
          </div>
          <StockChart data={prices} change={change} aspect={1.8} />
        </CardHeader>
        <CardBody className="space-y-1">
          <div className="inline-flex justify-between">
            <p className="text-default-600">Total Invested</p>
            <p className="font-medium">{USDFormat(invested)}</p>
          </div>
          <div className="inline-flex justify-between">
            <p className="text-default-600 line-clamp-1">Total Return</p>
            <div className="flex items-center space-x-1">
              <p
                className={`font-medium ${
                  p_return > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {fractionFormat(p_return)}%
              </p>
              {p_return > 0 ? (
                <FaCircleArrowUp size={20} color="limegreen" />
              ) : (
                <FaCircleArrowDown size={20} color="crimson" />
              )}
            </div>
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
            <div className="inline-flex space-x-3 items-center">
              <img className="rounded-full max-w-[50px]" src={image} />
              <div>
                <div className="inline-flex items-center space-x-2">
                  <p className="text-lg font-bold">{symbol}</p>
                  <FiExternalLink
                    size={18}
                    cursor="pointer"
                    onClick={() => navigate(`/stock/${symbol}`)}
                  />
                </div>

                <p className="text-tiny text-default-600">
                  {name} &#x2022; {numFormat(total_quantity)}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            {orders.map((order) => {
              const { id, symbol, time, quantity, price } = order
              return (
                <div key={id} className="mx-2">
                  <p className="text-tiny">
                    <strong>{symbol}</strong> &#x2022; {dateFormat(time)}
                  </p>
                  <p className="text-tiny text-default-600 mb-1">{order.id}</p>
                  <Chip size="sm" radius="sm" color="success" variant="flat">
                    {numFormat(quantity)} &#x2022; {USDFormat(price)}
                  </Chip>
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

export default PortfolioStockCard
