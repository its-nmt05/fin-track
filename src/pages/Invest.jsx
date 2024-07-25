import React, { useEffect, useState } from "react"
import databaseService from "../supabase/database"
import { Spinner } from "@nextui-org/react"
import { InfoCard } from "../components"
import { IoMdInformationCircleOutline } from "react-icons/io"

function Invest() {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    databaseService.getStocks().then(({ data, error }) => {
      setStocks(data)
      if (!error) {
        setLoading(false)
      }
    })
  }, [])

  return !loading ? (
    <div className="mx-8 my-4 space-y-4">
      <div className="flex flex-row items-center space-x-1">
        <p className="text-3xl font-bold">All stocks</p>
        <IoMdInformationCircleOutline onClick={() => console.log("Click")} />
      </div>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
        {stocks.map((stock) => (
          <InfoCard companyInfo={stock} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Invest
