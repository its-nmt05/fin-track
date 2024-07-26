import {
  Button,
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
import { IoAddOutline } from "react-icons/io5"
import { useSelector } from "react-redux"
import databaseService from "../supabase/database"
import animationData from "../static/lotties/done.json"
import Lottie from "react-lottie"

function AddMoneyComponent() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const {
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const [error, setError] = useState()
  const user = useSelector((state) => state.auth.user)

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

  const addMoney = async ({ amount }) => {
    setLoading(true)
    databaseService
      .walletTransact({ uid: user.id, amount })
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
      <Button className="bg-black text-white" onPress={onOpen}>
        <IoAddOutline size={18} />
        <p>Add money</p>
      </Button>
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
                  <p>Add money 💸</p>
                  <p className="text-small font-normal text-default-500">
                    This is not real and only meant for demonstration purposes
                    only
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(addMoney)}>
                  <Controller
                    defaultValue={null}
                    control={control}
                    name="amount"
                    rules={{
                      required: { value: true, message: "Amount is required" },
                      min: {
                        value: 1,
                        message: "Amount must be greater than $1",
                      },
                      max: {
                        value: 1000,
                        message: "Amount must be less than $1000",
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
                        isDisabled={loading}
                        key={id}
                        size="sm"
                        color="primary"
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
                      {!loading ? "Add" : <Spinner color="white" size="sm" />}
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
                Your money has been successfully added
              </p>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddMoneyComponent
