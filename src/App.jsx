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
              path="/"
              element={
                <AuthLayout authReq>
                  <Home />
                </AuthLayout>
              }
            />
            <Route
              path="get-started"
              element={
                <AuthLayout authReq>
                  <GetStarted />
                </AuthLayout>
              }
            />
            <Route
              path="portfolio"
              element={
                <AuthLayout authReq>
                  <Portfolio />
                </AuthLayout>
              }
            />
            <Route
              path="invest"
              element={
                <AuthLayout authReq>
                  <Invest />
                </AuthLayout>
              }
            />
            <Route
              path="wallet"
              element={
                <AuthLayout authReq>
                  <Wallet />
                </AuthLayout>
              }
            />
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
