import { InfoCard, StockDetails, StockGraph } from "../components"
import React from "react"
import stock from "../stocks/stock"
import { data } from "../stocks/dummy-data"

function Home() {
  const companies = [
    {
      name: "Apple Inc",
      ticker: "AAPL",
      currentPrice: "$193.60",
      change: { value: "0.55%", increase: false },
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi_F5mBDcXHBlUDkSiJD9-ZmnKHIjG9h-nhQ&s",
    },
    {
      name: "Alphabet Inc Class C",
      ticker: "GOOG",
      currentPrice: "$141.49",
      change: { value: "0.76%", increase: true },
      image:
        "https://steelbluemedia.com/wp-content/uploads/2019/06/new-google-favicon-512.png",
    },
    {
      name: "Microsoft Corporation",
      ticker: "MSFT",
      currentPrice: "$374.58",
      change: { value: "0.28%", increase: false },
      image:
        "https://static.vecteezy.com/system/resources/previews/027/127/473/non_2x/microsoft-logo-microsoft-icon-transparent-free-png.png",
    },
    {
      name: "NVIDIA Corp",
      ticker: "NVDA",
      currentPrice: "$130.90",
      change: { value: "0.01%", increase: true },
      image: "https://logowik.com/content/uploads/images/599_nvidia.jpg",
    },
  ]

  const stockInfo = {
    name: "Meta Platform, Inc.",
    img: "https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png",
    platform: "NASDAQ",
    ticker: "FB",
    industries: ["Social Media", "Internet"],
    currentPrice: "$305.66",
    change: { percent: "1.84%", price: "5.51" },
  }

  return (
    <>
      <div className="flex space-x-2 mx-2 my-2">
        {companies.map((company) => (
          <InfoCard
            key={company.ticker}
            companyInfo={company}
            className="min-w-[19rem]"
          />
        ))}
      </div>
      <StockGraph
        className="mx-[20%] my-5"
        stockInfo={stockInfo}
        stockData={data.quote[0].high}
        symbol="NVDA"
      />
      <StockDetails className="w-fit ml-[20%]" />
    </>
  )
}

export default Home
