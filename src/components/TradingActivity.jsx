import { BarChart } from "@mui/x-charts"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react"
import React from "react"
import { FaAngleDown } from "react-icons/fa6"

function TradingActivity({ className = "" }) {
  return (
    <Card className={`m-3 w-fit p-2 ${className}`}>
      <CardHeader>
        <div className="w-full inline-flex items-center justify-between">
          <div>
            <p className="font-medium text-xl">Trading activity</p>
            <p className="text-default-600 text-sm">
              The amout of money you have made during a specified time period
            </p>
          </div>
          <div className="space-x-2">
            <Dropdown>
              <DropdownTrigger>
                <Button className="bg-gray-100" variant="bordered" size="sm">
                  2022
                  <FaAngleDown />
                </Button>
              </DropdownTrigger>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button className="bg-gray-100" variant="bordered" size="sm">
                  Monthly
                  <FaAngleDown />
                </Button>
              </DropdownTrigger>
            </Dropdown>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        {/* <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={500}
          height={300}
        /> */}
      </CardBody>
    </Card>
  )
}

export default TradingActivity
