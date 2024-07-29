import React from "react"
import { Outlet } from "react-router-dom"
import { Header, Footer, Container } from "./"

function Layout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default Layout
