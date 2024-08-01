import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react"
import React from "react"
import useAuth from "../hooks/useAuth"
import { MdDarkMode, MdLightMode } from "react-icons/md"
import { HiDeviceMobile } from "react-icons/hi"

function Settings() {
  const { user } = useAuth()
  const name = user?.user_metadata?.name
  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:max-w-[85%] lg:max-w-[75%] space-y-6">
        <div>
          <p className="text-2xl font-bold">Account details</p>
          <p className="text-small text-default-600">
            Manage your FinTrack profile
          </p>
        </div>
        <Card className="px-2 pb-2 align-middle">
          <CardHeader>
            <div className="flex flex-col w-full space-y-1">
              <p className="text-lg font-medium">Personal Information</p>
              <Divider />
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-row items-center gap-4 mb-4">
              <Avatar
                size="md"
                isBordered
                src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
              />
              <Button size="sm" radius="sm" className="bg-black text-white">
                Change
              </Button>
            </div>
            <div className="flex flex-row space-x-6">
              <Input
                isReadOnly
                type="name"
                label="Name"
                radius="sm"
                value={name}
                labelPlacement="outside"
              />
              <Input
                isReadOnly
                type="email"
                label="Email"
                radius="sm"
                value={user?.email}
                labelPlacement="outside"
              />
            </div>
          </CardBody>
        </Card>
        <Card className="px-2 pb-2">
          <CardHeader>
            <div className="flex flex-col w-full space-y-1">
              <p className="text-lg font-medium">Change password</p>
              <Divider />
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-row space-x-6">
              <Input
                radius="sm"
                type="password"
                label="Old password"
                labelPlacement="outside"
                placeholder="Enter your password"
              />
              <Input
                radius="sm"
                type="password"
                label="New password"
                labelPlacement="outside"
                placeholder="Enter your password"
              />
              <Input
                radius="sm"
                type="password"
                label="New password (again)"
                labelPlacement="outside"
                placeholder="Enter your password"
              />
            </div>
          </CardBody>
        </Card>
        <Card className="px-2 pb-2">
          <CardHeader>
            <div className="flex flex-col w-full space-y-1">
              <p className="text-lg font-medium">Preferences</p>
              <Divider />
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-row items-end space-x-6">
              <div className="space-y-1">
                <p className="text-sm">Theme</p>
                <Dropdown>
                  <DropdownTrigger>
                    <Button color="default" variant="flat">
                      Light mode
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="theme-menu">
                    <DropdownItem startContent={<MdLightMode size={18} />}>
                      Light mode
                    </DropdownItem>
                    <DropdownItem startContent={<MdDarkMode size={18} />}>
                      Dark mode
                    </DropdownItem>
                    <DropdownItem startContent={<HiDeviceMobile size={18} />}>
                      Device settings
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <Button color="danger" variant="flat">
                Reset account
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Settings
