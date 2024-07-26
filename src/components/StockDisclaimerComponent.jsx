import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import React from "react"
import { IoMdInformationCircleOutline } from "react-icons/io"
import warning from "../static/images/warning.svg"

function StockDisclaimerComponent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <IoMdInformationCircleOutline cursor="pointer" onClick={onOpen} />
      <Modal
        size="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="center"
        className="py-3"
      >
        <ModalContent>
          <ModalHeader className="justify-center">
            <p className="text-2xl">Disclaimer</p>
          </ModalHeader>
          <ModalBody>
            <div className="w-full flex flex-col items-center">
              <img src={warning} width="75%px" alt="warning" />
              <p className="text-center text-sm">
                Please note that all stock information displayed on this page is
                for demonstration purposes only.
                <br /> The data does not reflect real-time market values and
                should not be used for actual investment decisions.
              </p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default StockDisclaimerComponent
