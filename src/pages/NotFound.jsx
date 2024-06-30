import React from "react"
import Lottie from "react-lottie"
import animationData from "../static/lotties/404.json"

function NotFound() {
  const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Lottie options={defaultOptions} width="40%" height="40%" />
    </div>
  )
}

export default NotFound
