import React from "react"
import Logo from "../../static/logo/Logo"

function Footer() {
  return (
    <div className="m-auto w-full flex flex-col items-center space-y-1">
      <p>Thankyou for visiting</p>
      <div className="flex items-center gap-2">
        <Logo size={10} />
        <p className="text-xl font-bold">Fintrack</p>
      </div>
    </div>
  )
}

export default Footer
