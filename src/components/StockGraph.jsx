import React from "react"
import { LineChart } from "@mui/x-charts/LineChart"
import { Card, CardBody, CardHeader, Chip, Tab, Tabs } from "@nextui-org/react"
import { FaArrowUp } from "react-icons/fa6"

function StockGraph({
  className = "",
  stockInfo: { name, img, platform, ticker, industries, currentPrice, change },
  stockData,
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <Card className="px-4 py-2">
        <CardBody>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <img className="max-w-[80px]" src={img} />
              <div>
                <div className="mb-4">
                  <p className="text-2xl font-semibold">{name}</p>
                  <p className="text-gray-500 font-semibold">
                    {platform} : <strong>{ticker}</strong>
                  </p>
                </div>
                <p className="text-gray-500">
                  Industries: {industries.join(", ")}
                </p>
              </div>
            </div>
            <div className="text-end space-y-2">
              <p className="text-3xl font-bold text-blue-500">{currentPrice}</p>
              <div className="flex items-center justify-end space-x-1">
                <Chip
                  startContent={<FaArrowUp />}
                  variant="flat"
                  color="success"
                  size="lg"
                  className="py-4 px-1 text-sm"
                >
                  {change.percent}
                </Chip>
                <p className="text-green-500 text-md">+{change.price}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="px-4 py-2">
        <CardHeader>
          <div className="flex-col space-y-4 justify-center items-center">
            <p className="text-xl font-bold">Overview</p>
            <Tabs aria-label="Options">
              <Tab title="Summary"></Tab>
              <Tab title="Chart"></Tab>
              <Tab title="Fundamental"></Tab>
              <Tab title="Statistic"></Tab>
              <Tab title="Corporate Action"></Tab>
              <Tab title="Profile"></Tab>
            </Tabs>
          </div>
        </CardHeader>
        <CardBody>
          <LineChart
            grid={{ horizontal: true }}
            series={[
              {
                id: "root",
                data: stockData,
                showMark: false,
                area: true,
              },
            ]}
            sx={{ "& .MuiAreaElement-series-root": { fill: "#b1fada" } }}
            width={600}
            height={300}
            bottomAxis={{ disableTicks: true }}
            leftAxis={{
              disableLine: true,
              disableTicks: true,
            }}
          />
        </CardBody>
      </Card>
    </div>
  )
}

export default StockGraph
