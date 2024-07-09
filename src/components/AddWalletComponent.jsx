import {
  Button,
  Dropdown,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Spinner,
  useDisclosure,
} from "@nextui-org/react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { MdAdd } from "react-icons/md"
import databaseService from "../supabase/database"
import { useSelector } from "react-redux"
import ColorSelector from "./ColorSelector"

function AddWalletComponent() {
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { register, handleSubmit } = useForm("")
  const user = useSelector((state) => state.user)

  const createWallet = async (walletData) => {
    console.log(walletData)
    setLoading(true)
    databaseService
      .createWallet({ ...walletData, user_id: user.id })
      .finally(() => {
        setLoading(false)
        onClose()
      })
  }

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
            (onClose) => (
              <>
                <ModalHeader>Add a new wallet</ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit(createWallet)}>
                    <div className="mb-10">
                      <p className="font-semibold ml-2 mb-1">Choose color</p>
                      <ColorSelector />
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
