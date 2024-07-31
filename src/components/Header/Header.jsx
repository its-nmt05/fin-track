import React, { useState } from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react"

import { useLocation, useNavigate } from "react-router-dom"
import { CiSearch } from "react-icons/ci"
import Logo from "../../static/icons/Logo"
import useAuth from "../../hooks/useAuth"

export default function Header() {
  const navItems = [
    { name: "Home", route: "/" },
    { name: "Portfolio", route: "/portfolio" },
    { name: "Invest", route: "/invest" },
    { name: "Wallet", route: "/wallet" },
  ]

  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen} maxWidth="full">
      <NavbarContent className="flex items-center gap-2">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand size={20}>
          <Logo />
          <p className="font-bold text-inherit">FinTrack</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item) => (
          <NavbarItem
            color="foreground"
            isActive={item.route == location.pathname}
            key={item.name}
          >
            <Link color="foreground" href={item.route}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[16rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<CiSearch />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              size="sm"
              src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            onAction={(key) => {
              switch (key) {
                case "started":
                  navigate("/get-started")
                  break
                case "logout":
                  logout()
                  break
              }
            }}
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold max-w-[10rem] truncate">
                {user?.email}
              </p>
            </DropdownItem>
            <DropdownItem key="started">Get started</DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="help">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {navItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <NavbarItem
              color="foreground"
              isActive={item.route == location.pathname}
            >
              <Link color="foreground" href={item.route}>
                {item.name}
              </Link>
            </NavbarItem>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
