import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import React, { useCallback } from "react"

function TransactionsTable({ className = "" }) {
  const columns = [
    { key: "symbol", name: "Symbol" },
    { key: "date", name: "Date" },
    { key: "type", name: "Type" },
    { key: "amount", name: "Order amount" },
    { key: "status", name: "Status" },
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
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      date: new Date(),
      type: "buy",
      amount: "100",
      quantity: 3,
      status: "completed",
    },
    {
      symbol: "NVDA",
      name: "NVDIA LTD.",
      date: new Date(),
      type: "sell",
      amount: "300",
      quantity: 3,
      status: "active",
    },
    {
      symbol: "GOOG",
      name: "Alphabet LLC.",
      date: new Date(),
      type: "buy",
      amount: "450",
      quantity: 3,
      status: "completed",
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
        return transaction.type == "buy" ? (
          <div>
            <p className="font-semibold text-green-500">BUY</p>
            <p className="font-semibold text-tiny text-default-400">
              {transaction.quantity}
            </p>
          </div>
        ) : (
          <p className="text-red-500 font-semibold">SELL</p>
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
    }
  })

  return (
    <Table
      isStripeds
      selectionMode="multiple"
      aria-label="transactions"
      className={`p-3 w-fit ${className}`}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.name}</TableColumn>}
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
  )
}

export default TransactionsTable
