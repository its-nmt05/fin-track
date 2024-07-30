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
import { capitalize, dateFormat, numFormat, USDFormat } from "../utils/helper"
import { MdDone } from "react-icons/md"
import { RxCross2 } from "react-icons/rx"

function TransactionsTable({ className = "", transactions = [] }) {
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
    { key: "id", name: "Transaction id" },
    { key: "symbol", name: "Symbol" },
    { key: "quantity", name: "Quantity" },
    { key: "price", name: "Price" },
    { key: "operation", name: "Operation" },
    { key: "status", name: "Status" },
    { key: "time", name: "Time" },
  ]

  // function used for rendering each cell in the table provided a transaction and column key
  const renderCell = useCallback((transaction, columnKey) => {
    const { id, symbol, quantity, price, operation, status, time } = transaction
    switch (columnKey) {
      case "number":
        return <p>{numFormat(transactions.indexOf(transaction) + 1)}</p>
      case "id":
        return <p>{id}</p>
      case "symbol":
        return (
          <Chip size="sm" variant="flat">
            {symbol}
          </Chip>
        )
      case "quantity":
        return <p>{numFormat(quantity)}</p>
      case "price":
        return <p>{USDFormat(price)}</p>
      case "operation":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={operation == "buy" ? "success" : "danger"}
          >
            {capitalize(operation)}
          </Chip>
        )
      case "status":
        return (
          <Chip
            size="sm"
            // radius="sm"
            variant="flat"
            startContent={status == "success" ? <MdDone /> : <RxCross2 />}
            color={status == "success" ? "success" : "danger"}
          >
            {capitalize(status)}
          </Chip>
        )
      case "time":
        return <p>{dateFormat(time)}</p>
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

export default TransactionsTable
