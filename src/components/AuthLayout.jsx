import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function AuthLayout({ children, authReq = false }) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector((state) => state.status)

  useEffect(() => {
    if (!authStatus && authReq) {
      navigate("/login")
    }

    setLoader(false)
  }, [authStatus, authReq, navigate])

  return loader ? "" : <>{children}</>
}

export default AuthLayout
