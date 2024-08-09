import React, { useEffect, useState } from "react"
import { Card, CardBody, CardHeader, Chip, Tab, Tabs } from "@nextui-org/react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa6"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { dateFormat, getDaysAgo, USDFormat } from "../utils/helper"
import databaseService from "../supabase/database"

function StockGraph({
  className = "",
  stockData: { image, name, symbol, industries, current_price, change },
}) {
  const timeOptions = [
    { label: "7D", time: 7 },
    { label: "1M", time: 30 },
    { label: "6M", time: 180 },
    { label: "1Y", time: 365 },
    { label: "All", time: null },
  ]
  const [timeOption, setTimeOption] = useState(timeOptions[0].time)
  const [prices, setPrices] = useState([])

  useEffect(() => {
    databaseService
      .getStockPrices({
        symbol,
        start: getDaysAgo(timeOption),
      })
      .then(({ data }) => {
        setPrices(data)
      })
  }, [timeOption])

  const CustomTooltip = ({ payload }) => {
    if (payload?.length) {
      const data = payload[0].payload
      return (
        <div className="backdrop-blur-sm bg-black/50 dark:bg-white/50 shadow-xl rounded-full px-3 py-1">
          <p className="text-sm text-default-200">
            {USDFormat(data.close)} &#x2022; {dateFormat(data.time, false)}
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
              <img className="lg:w-[80px] w-[60px]" src={image} />
              <div>
                <div className="mb-4">
                  <p className="text-2xl font-bold line-clamp-1">{name}</p>
                  <p className="text-gray-500 font-semibold">
                    Platform : <strong>{symbol}</strong>
                  </p>
                </div>
                <p className="text-gray-500">
                  Industries: {industries.join(", ")}
                </p>
              </div>
            </div>
            <div className="text-end space-y-2">
              <p className="text-3xl font-bold text-blue-500">
                {USDFormat(current_price)}
              </p>
              <Chip
                variant="flat"
                color={change > 0 ? "success" : "danger"}
                className="py-4 px-1 text-sm"
                startContent={change > 0 ? <FaArrowUp /> : <FaArrowDown />}
              >
                {change}%
              </Chip>
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
            selectedKey={timeOption.time}
            onSelectionChange={setTimeOption}
            radius="full"
            color="primary"
          >
            {(item) => <Tab title={item.label} key={item.time} />}
          </Tabs>
        </CardHeader>
        <CardBody className="inline-flex items-center justify-center">
          <ResponsiveContainer width="100%" aspect={2.2}>
            <AreaChart data={prices}>
              <defs>
                <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A253" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="green" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="red" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="red" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="crimson" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip content={CustomTooltip} />
              <Area
                dataKey="close"
                type="monotone"
                dot={false}
                fill={change > 0 ? "url(#green)" : "url(#red)"}
                stroke={change > 0 ? "#16A253" : "crimson"}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  )
}

export default StockGraph
