import React from "react"
import { InfoCard } from "../components"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { useSelector } from "react-redux"

function Invest() {
  const stocks = useSelector((state) => state.stock.stocks)

  return (
    <div className="mx-8 my-4 space-y-4">
      <div className="flex flex-row items-center space-x-1">
        <p className="text-3xl font-bold">All stocks</p>
        <IoMdInformationCircleOutline onClick={() => console.log("Click")} />
      </div>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
        {stocks?.map((stock) => (
          <InfoCard companyInfo={stock} />
        ))}
      </div>
    </div>
  )
}

export default Invest
