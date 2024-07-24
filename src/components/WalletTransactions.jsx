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

function WalletTransactions({ transactions = [], className = "" }) {
  const columns = [
    { key: "number", name: "SL No." },
    { key: "id", name: "Transaction Id" },
    { key: "amount", name: "Amount" },
    { key: "type", name: "Type" },
    { key: "time", name: "Time" },
  ]

  const renderCell = useCallback((transaction, columnKey) => {
    switch (columnKey) {
      case "number":
        return (transactions.indexOf(transaction) + 1).toString().padStart(2, 0)
      case "id":
        return <p>{transaction.id}</p>
      case "time":
        return <p>{new Date(transaction.time).toLocaleString()}</p>
      case "type":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={transaction.type == "deposit" ? "success" : "danger"}
          >
            {transaction.type[0].toUpperCase() + transaction.type.slice(1)}
          </Chip>
        )
      case "amount":
        return <p>${transaction.amount}</p>
    }
  })

  return (
    <Table
      isStriped
      selectionMode="multiple"
      aria-label="wallet-transactions"
      className={`${className}`}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={transactions} emptyContent="No transactions">
        {(transaction) => (
          <TableRow key={transaction.id}>
            {(columnKey) => (
              <TableCell>{renderCell(transaction, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default WalletTransactions
