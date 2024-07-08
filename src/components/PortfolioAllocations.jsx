import React from "react"
import { PieChart } from "@mui/x-charts/PieChart"
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react"
import { FaArrowTrendUp, FaEllipsis } from "react-icons/fa6"

function PortfolioAllocations({ className = "" }) {
  return (
    <Card className={`m-3 w-fit p-2 ${className}`}>
      <CardHeader>
        <div className="w-full inline-flex items-center justify-between">
          <p className="font-medium text-xl">Portfolio allocations</p>
          <FaEllipsis />
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-tiny font-bold text-default-500">BAL</p>
        <div className="inline-flex space-x-2 items-center mb-4">
          <p className="text-2xl font-bold">$26,369.82</p>
          <Chip radius="sm" variant="flat" color="success">
            <div className="inline-flex items-center space-x-2">
              <FaArrowTrendUp />
              <p>1.2%</p>
            </div>
          </Chip>
        </div>
        <PieChart
          series={[
            {
              innerRadius: 50,
              data: [
                { id: 0, value: 100, label: "Apple Inc." },
                { id: 1, value: 150, label: "Microsoft " },
                { id: 2, value: 200, label: "Alphabet" },
                { id: 3, value: 300, label: "Meta" },
              ],
            },
          ]}
          width={350}
          height={200}
        />
      </CardBody>
    </Card>
  )
}

export default PortfolioAllocations
