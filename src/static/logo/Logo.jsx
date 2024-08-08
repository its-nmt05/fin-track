import React from "react"
import image from "./logo.svg"

function Logo({ size = 24, className = "" }) {
  return <img src={image} alt="logo" className={`${className} h-${size}`} />
}

export default Logo
