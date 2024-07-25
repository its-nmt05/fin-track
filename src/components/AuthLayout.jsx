import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Spinner } from "@nextui-org/react"

function AuthLayout({ children, authReq = false }) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (!authStatus && authReq) {
      navigate("/login")
    } else if (!authReq && authStatus != authReq) {
      navigate("/")
    }

    setLoader(false)
  }, [authStatus, authReq, navigate])

  return loader ? (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  ) : (
    <>{children}</>
  )
}

export default AuthLayout
