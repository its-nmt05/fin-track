import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react"
import React, { useState } from "react"
import { USDFormat } from "../utils/helper"
import databaseService from "../supabase/database"
import useAuth from "../hooks/useAuth"
import animationData from "../static/lotties/loading.json"
import image from "../static/images/failed.svg"
import Lottie from "react-lottie"

function BuySellShareComponent({ current_price = 100 }) {
  const operations = [
    { key: "buy", title: "Buy" },
    { key: "sell", title: "Sell" },
  ]

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [currentOperation, setCurrentOperation] = useState(operations[0].key)
  const [shares, setShares] = useState(1)
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  const doc = () => {
    setLoading(true)
    onOpen()
    databaseService
      .stockTransact({
        uid: user.id,
        _symbol: "QTRX",
        operation: currentOperation,
        quantity: shares,
      })
      .then(({ data, error }) => {
        setError(error)
        setMessage(data)
        console.log(data)
        setLoading(false)
      })
  }

  return (
    <>
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
          <Button
            className="w-full"
            radius="full"
            color="primary"
            onPress={doc}
          >
            {currentOperation.toUpperCase()} NOW
          </Button>
        </CardFooter>
      </Card>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="center"
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        className="py-3"
        size="sm"
      >
        <ModalContent>
          <ModalHeader>
            {loading ? (
              <div className="space-y-1">
                <p className="text-2xl text-center">
                  Processing your transaction
                </p>
                <p className="text-small text-center font-normal text-default-500">
                  Please wait while we complete your transaction. This might
                  take a few moments.
                </p>
              </div>
            ) : error ? (
              <div className="w-full space-y-1">
                <p className="text-2xl text-center">Transaction failed ❌</p>
                <p className="text-small text-center font-normal text-default-500">
                  Something went wrong with your transaction.
                  <br /> Don't worry, your funds are safe. Please try again.
                </p>
              </div>
            ) : (
              <div className="w-full space-y-1">
                <p className="text-2xl text-center">
                  Transaction Successful ✅
                </p>
                <p className="text-small text-center font-normal text-default-500">
                  Your stock purchase/sale was successful. You can review the
                  details in your portfolio.
                </p>
              </div>
            )}
          </ModalHeader>
          <ModalBody>
            {loading ? (
              <Lottie options={defaultOptions} width="60%" />
            ) : error ? (
              <div className="w-full flex justify-center">
                <img src={image} alt="failed" className="max-w-[60%]" />
              </div>
            ) : (
              message && (
                <div className="px-2">
                  {Object.keys(message.transaction).map((key) => (
                    <div className="flex items-baseline">
                      <p className="font-bold">
                        {key[0].toUpperCase().concat(key.slice(1))}: &nbsp;
                      </p>
                      <p className="text-default-600 text-small">
                        {message.transaction[key]}
                      </p>
                    </div>
                  ))}
                </div>
              )
            )}
          </ModalBody>
          <ModalFooter className="pb-2">
            <div className="space-y-4 w-full">
              {error && (
                <p className="text-sm w-full text-red-500 text-center">
                  {`Error: ${error.message}`}
                </p>
              )}
              {!loading && (
                <Button
                  radius="md"
                  className="w-full bg-black text-white"
                  onPress={onClose}
                >
                  Close
                </Button>
              )}
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BuySellShareComponent
