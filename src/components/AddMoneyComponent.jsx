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
import { useForm } from "react-hook-form"
import { IoAddOutline } from "react-icons/io5"
import { useSelector } from "react-redux"
import databaseService from "../supabase/database"
import animationData from "../static/lotties/done.json"
import Lottie from "react-lottie"

function AddMoneyComponent() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { register, reset, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const [error, setError] = useState(null)
  const user = useSelector((state) => state.user)

  const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  const moneyButtons = [
    { id: 1, value: "100" },
    { id: 2, value: "500" },
    { id: 3, value: "1000" },
  ]

  const addMoney = async ({ amount }) => {
    setLoading(true)
    databaseService
      .walletTransact({ id: user.id, amount })
      .then(({ error }) => setError(error?.message))
      .finally(() => {
        setLoading(false)
        setMessage(true)

        // hide the message, reset the form and dismiss the modal
        // after 3 sec
        setTimeout(() => {
          setMessage(false)
          reset()
          onClose()
        }, 3000)
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
                  <Input
                    isDisabled={loading}
                    autoFocus
                    type="number"
                    min={0}
                    radius="sm"
                    placeholder="Enter amount"
                    label="Amount"
                    labelPlacement="outside"
                    startContent={<p>$</p>}
                    classNames={{
                      label: "font-semibold ml-2",
                      inputWrapper: "mb-4",
                    }}
                    {...register("amount", { required: true })}
                  />
                  <div className="space-x-4 mb-4">
                    {moneyButtons.map(({ id, value }) => (
                      <Button
                        isDisabled={loading}
                        key={id}
                        size="sm"
                        color="primary"
                        variant="flat"
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
