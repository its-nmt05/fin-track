import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Radio,
  RadioGroup,
  Spinner,
  useDisclosure,
} from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { MdAdd } from "react-icons/md"
import databaseService from "../supabase/database"
import { useSelector } from "react-redux"

function AddWalletComponent() {
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { register, control, handleSubmit, reset } = useForm("")
  const user = useSelector((state) => state.user)

  const colors = [
    { color: "bg-red-100", name: "Red" },
    { color: "bg-green-100", name: "Green" },
    { color: "bg-purple-100", name: "Purple" },
    { color: "bg-gray-100", name: "Gray" },
    { color: "bg-blue-100", name: "Blue" },
  ]

  const createWallet = async (walletData) => {
    databaseService
      .createWallet({ ...walletData, user_id: user.id })
      .finally(() => {
        setLoading(false)
        onClose()
      })
  }

  useEffect(() => {
    setTimeout(() => {
      reset() // reset the form with a 500ms delay
    }, 500)
  }, [isOpen])

  return (
    <>
      <Button radius="sm" color="primary" className="bg-black" onPress={onOpen}>
        <MdAdd />
        <p>Add wallet</p>
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
          {!loading ? (
            () => (
              <>
                <ModalHeader>Add a new wallet</ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit(createWallet)}>
                    <div className="mb-10">
                      <p className="font-semibold ml-2 mb-1">Choose color</p>
                      <Controller
                        defaultValue={colors[0].color}
                        name="color"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            defaultValue={colors[0].color}
                            orientation="horizontal"
                            {...field}
                          >
                            {colors.map((color) => (
                              <Radio value={color.color}>{color.name}</Radio>
                            ))}
                          </RadioGroup>
                        )}
                      />
                    </div>
                    <Input
                      autoFocus
                      type="name"
                      label="Wallet name"
                      placeholder="Enter wallet name"
                      labelPlacement="outside"
                      radius="sm"
                      autoComplete="off"
                      classNames={{
                        label: "font-semibold ml-2",
                        inputWrapper: "mb-4",
                      }}
                      {...register("name", { required: true })}
                    />
                    <Input
                      type="number"
                      min={0}
                      label="Balance"
                      placeholder="Add balance"
                      labelPlacement="outside"
                      radius="sm"
                      autoComplete="off"
                      startContent={<p>$</p>}
                      classNames={{
                        label: "font-semibold ml-2",
                        inputWrapper: "mb-4",
                      }}
                      {...register("balance", { required: true })}
                    />
                    <div className="w-full inline-flex justify-end">
                      <Button className="bg-black text-white" type="submit">
                        Create
                      </Button>
                    </div>
                  </form>
                </ModalBody>
              </>
            )
          ) : (
            <div className="flex min-h-[12em] justify-center items-center">
              <Spinner size="lg" />
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddWalletComponent
