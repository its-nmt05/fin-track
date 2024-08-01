import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { FaAnglesDown } from "react-icons/fa6"
import Lottie from "react-lottie"
import animationData from "../static/lotties/done.json"
import databaseService from "../supabase/database"

function WithdrawMoneyComponent({ balance, wallet_id }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const {
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(false)
  const [error, setError] = useState()

  const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  const moneyButtons = [
    { id: 1, value: 100 },
    { id: 2, value: 500 },
    { id: 3, value: 1000 },
  ]

  // flush out old values and reset the form with a delay
  // on modal state change
  useEffect(() => {
    setLoading(false)
    setError(null)
    setTimeout(() => {
      reset()
    }, 500)
  }, [isOpen])

  const withdraw = async ({ amount }) => {
    setLoading(true)
    databaseService
      .walletTransact({ wallet_id, amount, type: "withdraw" })
      .then(({ error }) => {
        setError(error?.message)
        if (!error) {
          setLoading(false)
          setMessage(true)
          // hide the message, reset the form and dismiss the modal
          // after 3 sec
          setTimeout(() => {
            setMessage(false)
            reset()
            onClose()
          }, 3000)
        } else {
          setLoading(false)
        }
      })
  }

  return (
    <>
      <Card className="p-2">
        <CardBody className="space-y-5">
          <div>
            <p className="text-xl font-medium">Withdraw money</p>
            <p className="text-small text-default-500">
              This is for demonstration purposes only 🪧
              <br /> You can only withdraw upto your available balance.
            </p>
          </div>
          <Button className="bg-black text-white" onPress={onOpen}>
            <FaAnglesDown />
            <p>Withdraw</p>
          </Button>
        </CardBody>
      </Card>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="center"
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        className="py-3"
      >
        <ModalContent>
          {!message ? (
            <>
              <ModalHeader>
                <div>
                  <p>Withdraw money 💸</p>
                  <p className="text-small font-normal text-default-500">
                    This is not real and only meant for demonstration purposes
                    only
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(withdraw)}>
                  <Controller
                    defaultValue={""}
                    control={control}
                    name="amount"
                    rules={{
                      required: { value: true, message: "Amount is required" },
                      min: {
                        value: 1,
                        message: "Amount must be greater than $1",
                      },
                      max: {
                        value: balance,
                        message: "Amount must be less than balance",
                      },
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Input
                        isDisabled={loading}
                        autoFocus
                        type="number"
                        radius="sm"
                        placeholder="Enter amount"
                        label="Amount"
                        labelPlacement="outside"
                        startContent={<p>$</p>}
                        classNames={{
                          label: "font-semibold ml-2",
                          inputWrapper: "mb-4",
                        }}
                        onChange={onChange}
                        value={value}
                        ref={ref}
                      />
                    )}
                  />
                  <div className="space-x-4 mb-4">
                    {moneyButtons.map(({ id, value }) => (
                      <Button
                        isDisabled={loading || value > balance}
                        key={id}
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={() => setValue("amount", value)}
                      >
                        <p className="font-medium">$ {value}</p>
                      </Button>
                    ))}
                  </div>
                  <div className="w-full inline-flex justify-end">
                    <Button
                      isDisabled={loading}
                      type="submit"
                      className="bg-black text-white"
                    >
                      {!loading ? (
                        "Withdraw"
                      ) : (
                        <Spinner color="white" size="sm" />
                      )}
                    </Button>
                  </div>
                </form>
                {errors.amount && (
                  <p className="text-small text-red-500 text-center">
                    {errors.amount.message}
                  </p>
                )}
                {error && (
                  <p className="text-small text-red-500 text-center">{error}</p>
                )}
              </ModalBody>
            </>
          ) : (
            <div className="py-5 space-y-2">
              <Lottie options={defaultOptions} width="30%" height="30%" />
              <p className="text-center font-medium text-lg">
                Congratulations! 🎉🎉
                <br />
                Your have successfully withdrawn the money
              </p>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default WithdrawMoneyComponent
