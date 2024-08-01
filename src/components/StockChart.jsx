import React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

function StockChart({
  data,
  change,
  aspect = 2,
  width = "50%",
  dataKey = "amount",
}) {
  return (
    <ResponsiveContainer width={width} aspect={aspect}>
      <AreaChart data={data} margin={{ top: 2 }}>
        <defs>
          <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="green" stopOpacity={0.2} />
            <stop offset="95%" stopColor="limegreen" stopOpacity={0.04} />
          </linearGradient>
          <linearGradient id="red" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="red" stopOpacity={0.2} />
            <stop offset="95%" stopColor="crimson" stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <Area
          dataKey={dataKey}
          type="monotone"
          stroke={change > 0 ? "#16A253" : "crimson"}
          fill={change > 0 ? "url(#green)" : "url(#red)"}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default StockChart
