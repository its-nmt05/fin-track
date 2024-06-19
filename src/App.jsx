import { NextUIProvider } from "@nextui-org/react"
import { useNavigate, Route, Routes } from "react-router-dom"

import { Layout } from "./components"
import { GetStarted, Home, Portfolio, Invest, Wallet } from "./pages"

function App() {
  const navigate = useNavigate()
  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="get-started" element={<GetStarted />} />
          <Route path="home" element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="invest" element={<Invest />} />
          <Route path="wallet" element={<Wallet />} />
        </Route>
      </Routes>
    </NextUIProvider>
  )
}

export default App
