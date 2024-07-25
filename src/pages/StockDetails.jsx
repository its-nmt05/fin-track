import React from "react"
import { useLoaderData, useParams } from "react-router-dom"

function StockDetails() {
  const { symbol } = useParams()

  return <div>{symbol}</div>
}

export default StockDetails
