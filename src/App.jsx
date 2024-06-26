import { NextUIProvider, Spinner } from "@nextui-org/react"
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
  NotFound,
} from "./pages"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./supabase/auth"
import { clearUser, setUser } from "./store/authSlice"

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.getUser().then((data) => {
      if (data?.user) {
        dispatch(setUser(data))
      } else {
        navigate("/login")
        dispatch(clearUser())
      }
      setLoading(false)
    })
  }, [])

  return !loading ? (
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
