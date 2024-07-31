import React, { useState } from "react"
import { Card, CardBody, CardHeader, Chip, Tab, Tabs } from "@nextui-org/react"
import { FaArrowUp } from "react-icons/fa6"
import stock from "../stocks/stock"
import {
  Area,
  AreaChart,
  CartesianGrid,
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

  const CustomTooltip = ({ payload }) => {
    if (payload?.length) {
      const data = payload[0].payload
      return (
        <div className="bg-black bg-opacity-70 shadow-xl rounded-full px-3 py-1">
          <p className="text-sm text-default-200">
            {USDFormat(data.close)} &#x2022; {data.date}
          </p>
        </div>
      )
    }
  }

  return (
    <div className={`space-y-5 ${className}`}>
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
                ></Chip>
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
            <AreaChart data={prices}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a253" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="green" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip content={CustomTooltip} />
              <Area
                dataKey="close"
                type="monotone"
                dot={false}
                fill="url(#gradient)"
                stroke="#16a253"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  )
}

export default StockGraph
