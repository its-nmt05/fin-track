import React from "react"
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
} from "@nextui-org/react"

import { useLocation, useNavigate } from "react-router-dom"
import { CiSearch } from "react-icons/ci"
import { Logo } from "../icons"
import { useDispatch, useSelector } from "react-redux"
import authService from "../../supabase/auth"
import { clearUser } from "../../store/authSlice"

export default function Header() {
  const navItems = [
    { name: "Get started", route: "/get-started", active: true },
    { name: "Home", route: "/", active: true },
    { name: "Portfolio", route: "/portfolio", active: true },
    { name: "Invest", route: "/invest", active: true },
    { name: "Wallet", route: "/wallet", active: true },
  ]

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const logout = async () => {
    const { error } = await authService.signout()

    if (error) {
      console.log(error)
    } else {
      dispatch(clearUser())
      navigate("/login")
    }
  }

  return (
    <Navbar isBordered maxWidth="full">
      <NavbarContent>
        <NavbarBrand size={20}>
          <Logo />
          <p className="font-bold text-inherit">FinTrack</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent>
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
      <NavbarContent justify="end">
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
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="help">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}
