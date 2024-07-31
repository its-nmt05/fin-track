import React from "react"
import { Outlet } from "react-router-dom"
import { Header, Container } from "./"

function Layout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default Layout
