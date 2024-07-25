import {
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import React, { useCallback, useMemo, useState } from "react"

function WalletTransactions({ transactions = [], className = "" }) {
  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const pages = Math.ceil(transactions.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return transactions.slice(start, end)
  }, [page, transactions])

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
        return <p>${Math.abs(transaction.amount)}</p>
    }
  })

  return (
    <Table
      isStriped
      selectionMode="multiple"
      aria-label="wallet-transactions"
      className={`${className}`}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={items} emptyContent="No transactions">
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
