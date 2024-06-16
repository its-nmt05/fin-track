import React from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from "@nextui-org/react"
import { useLocation } from "react-router-dom"

export default function Header() {
  const navItems = [
    { name: "Get started", route: "/get-started", active: true },
    { name: "Home", route: "/home", active: true },
    { name: "Portfolio", route: "/portfolio", active: true },
    { name: "Invest", route: "/invest", active: true },
    { name: "Wallet", route: "/wallet", active: true },
  ]

  const location = useLocation()

  return (
    <Navbar isBordered>
      <NavbarContent className="flex w-full" justify="center">
        {navItems.map((item) => (
          <NavbarItem
            isActive={item.route == location.pathname}
            key={item.name}
          >
            <Link color="foreground" href={item.route}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  )
}
