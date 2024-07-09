import {
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import React, { useCallback } from "react"
import { FaAngleDown, FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6"

function TransactionsTable({ className = "" }) {
  const columns = [
    { key: "symbol", name: "Symbol" },
    { key: "date", name: "Date" },
    { key: "type", name: "Type" },
    { key: "amount", name: "Order amount" },
    { key: "status", name: "Status" },
    { key: "statement", name: "P&L" },
  ]
  const transactions = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      date: new Date(),
      type: "buy",
      amount: "100",
      quantity: 3,
      status: "completed",
      statement: 0,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      date: new Date(),
      type: "buy",
      amount: "100",
      quantity: 3,
      status: "completed",
      statement: 9.6,
    },
    {
      symbol: "NVDA",
      name: "NVDIA LTD.",
      date: new Date(),
      type: "sell",
      amount: "300",
      quantity: 3,
      status: "active",
      statement: -5,
    },
    {
      symbol: "GOOG",
      name: "Alphabet LLC.",
      date: new Date(),
      type: "buy",
      amount: "450",
      quantity: 3,
      status: "completed",
      statement: 2.4,
    },
  ]

  // function used for rendering each cell in the table provided a transaction and column key
  const renderCell = useCallback((transaction, columnKey) => {
    switch (columnKey) {
      case "symbol":
        return (
          <div>
            <p>{transaction.symbol}</p>
            <p className="font-semibold text-tiny text-default-400">
              {transaction.name}
            </p>
          </div>
        )
      case "date":
        return transaction.date.toLocaleDateString()
      case "type":
        let font_color =
          transaction.type == "buy" ? "text-green-500" : "text-red-500"
        return (
          <div>
            <p className={`font-semibold ${font_color}`}>
              {transaction.type.toUpperCase()}
            </p>
            <p className="font-semibold text-tiny text-default-400">
              {transaction.quantity}
            </p>
          </div>
        )
      case "amount":
        return "$" + transaction.amount
      case "status":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={transaction.status == "completed" ? "success" : "secondary"}
          >
            {transaction.status}
          </Chip>
        )
      case "statement":
        return (
          <div className="inline-flex space-x-2 items-center">
            {transaction.statement > 0 ? (
              <FaArrowTrendUp color="green" />
            ) : (
              <FaArrowTrendDown color="red" />
            )}
            <p>{transaction.statement}</p>
          </div>
        )
    }
  })

  return (
    <div className={`m-3 ${className}`}>
      <div className="w-full inline-flex items-baseline justify-between mb-4">
        <p className="text-2xl font-bold">Transaction history</p>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" size="sm">
              <p>Sort by: date</p>
              <FaAngleDown />
            </Button>
          </DropdownTrigger>
        </Dropdown>
      </div>
      <Table selectionMode="multiple" aria-label="transactions">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={transactions}>
          {(transaction) => (
            <TableRow key={transaction.symbol}>
              {(columnKey) => (
                <TableCell>{renderCell(transaction, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default TransactionsTable
