import { NextUIProvider } from "@nextui-org/react"
import { useNavigate, Route, Routes } from "react-router-dom"

import { Layout, AuthLayout } from "./components"
import {
  GetStarted,
  Home,
  Portfolio,
  Invest,
  Wallet,
  Login,
  Signup,
} from "./pages"
import { Provider } from "react-redux"

import store from "./store/store"

function App() {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="get-started"
              element={
                <AuthLayout authReq>
                  <GetStarted />
                </AuthLayout>
              }
            />
            <Route path="" element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="invest" element={<Invest />} />
            <Route path="wallet" element={<Wallet />} />
          </Route>

          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />

          <Route
            path="/signup"
            element={
              <AuthLayout>
                <Signup />
              </AuthLayout>
            }
          />
        </Routes>
      </Provider>
    </NextUIProvider>
  )
}

export default App
