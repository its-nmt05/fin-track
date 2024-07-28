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
import { capitalize, dateFormat, numFormat } from "../utils/helper"

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
    const { amount, type, time } = transaction
    switch (columnKey) {
      case "number":
        return <p>{numFormat(transactions.indexOf(transaction) + 1)}</p>
      case "id":
        return <p>{transaction.id}</p>
      case "time":
        return <p>{dateFormat(time)}</p>
      case "type":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={type == "deposit" ? "success" : "danger"}
          >
            {capitalize(type)}
          </Chip>
        )
      case "amount":
        return <p>${Math.abs(amount)}</p>
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
