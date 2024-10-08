import React, { useState } from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react"

import { useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Logo from "../../static/logo/Logo"

export default function Header() {
  const navItems = [
    { name: "Home", route: "/" },
    { name: "Portfolio", route: "/portfolio" },
    { name: "Invest", route: "/invest" },
    { name: "Wallet", route: "/wallet" },
  ]

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
        <NavbarBrand>
          <Logo size={12} className="px-2 sm:px-0" />
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
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            onAction={(key) => {
              switch (key) {
                case "logout":
                  logout()
              }
            }}
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold max-w-[10rem] truncate">
                {user?.email}
              </p>
            </DropdownItem>
            <DropdownItem key="started" href="get-started">
              Get started
            </DropdownItem>
            <DropdownItem key="settings" href="settings">
              My Settings
            </DropdownItem>
            <DropdownItem key="help">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" className="text-danger">
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
