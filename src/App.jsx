import { NextUIProvider, Spinner } from "@nextui-org/react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { Layout, AuthLayout } from "./components"
import {
  GetStarted,
  Home,
  Portfolio,
  Invest,
  Wallet,
  Login,
  Signup,
  NotFound,
  Settings,
  Stock,
} from "./pages"
import useFetchUserData from "./hooks/useFetchUserData"

function App() {
  const isLoading = useFetchUserData()
  const navigate = useNavigate()

  return !isLoading ? (
    <NextUIProvider navigate={navigate}>
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
          <Route
            path="stock/:symbol"
            element={
              <AuthLayout authReq>
                <Stock />
              </AuthLayout>
            }
          />
          <Route
            path="settings"
            element={
              <AuthLayout authReq>
                <Settings />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </NextUIProvider>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default App
