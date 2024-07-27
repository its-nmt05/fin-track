import React, { useEffect, useState } from "react"
import { Card, CardBody, CardHeader, Chip, Tab, Tabs } from "@nextui-org/react"
import { FaArrowUp } from "react-icons/fa6"
import stock from "../stocks/stock"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts"
import { USDFormat } from "../utils/helper"

function StockGraph({
  className = "",
  stockData: { image, name, symbol, industry, prices, current_price },
}) {
  const timeOptions = [
    { id: "1d", label: "1D" },
    { id: "7d", label: "7D" },
    { id: "1mo", label: "1M" },
    { id: "1y", label: "1Y" },
    { id: "max", label: "All" },
  ]

  const [timeOption, setTimeOption] = useState(timeOptions[0].id)
  const [stockData, setStockData] = useState({})

  // stock.quote({ symbol: "AAPL" }).then((data) => console.log(data))

  // useEffect(() => {
  //   const abortController = new AbortController()
  //   const signal = abortController.signal
  //   stock
  //     .getData({ symbol, range: timeOption })
  //     .then((data) => {
  //       !signal.aborted && setStockData(data)
  //     })
  //     .catch((e) => !signal.aborted && console.log(e))
  //   return () => {
  //     abortController.abort()
  //   }
  // }, [timeOption])

  return (
    <div className={`space-y-4 ${className}`}>
      <Card className="px-4 py-2">
        <CardBody>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <img className="max-w-[80px]" src={image} />
              <div>
                <div className="mb-4">
                  <p className="text-2xl font-semibold">{name}</p>
                  <p className="text-gray-500 font-semibold">
                    {"platform"} : <strong>{symbol}</strong>
                  </p>
                </div>
                <p className="text-gray-500">
                  Industries: {industry.join(", ")}
                </p>
              </div>
            </div>
            <div className="text-end space-y-2">
              <p className="text-3xl font-bold text-blue-500">
                {USDFormat(current_price)}
              </p>
              <div className="flex items-center justify-end space-x-1">
                <Chip
                  startContent={<FaArrowUp />}
                  variant="flat"
                  color="success"
                  size="lg"
                  className="py-4 px-1 text-sm"
                >
                  {"10%"}
                </Chip>
                <p className="text-green-500 text-md">{"$10"}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="px-4 py-2">
        <CardHeader className="flex-col space-y-4 items-start">
          <p className="text-xl font-bold">Overview</p>
          <Tabs
            aria-label="Date options"
            items={timeOptions}
            selectedKey={timeOption}
            onSelectionChange={setTimeOption}
            radius="full"
            color="primary"
          >
            {(item) => <Tab title={item.label} key={item.id} />}
          </Tabs>
        </CardHeader>
        <CardBody className="inline-flex items-center justify-center">
          <ResponsiveContainer width="100%" aspect={2.2}>
            <LineChart data={prices}>
              <YAxis type="number" domain={[90, "auto"]} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                dataKey="open"
                type="monotone"
                dot={false}
                // stroke={change < 0 ? "crimson" : "limegreen"}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  )
}

export default StockGraph
