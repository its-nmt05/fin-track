import { Radio, RadioGroup } from "@nextui-org/react"
import React from "react"

function ColorSelector() {
  const colors = [
    { color: "bg-red-100", name: "Red" },
    { color: "bg-green-100", name: "Green" },
    { color: "bg-purple-100", name: "Purple" },
    { color: "bg-gray-100", name: "Gray" },
    { color: "bg-blue-100", name: "Blue" },
  ]

  return (
    <RadioGroup defaultValue={colors[0].color} orientation="horizontal">
      {colors.map((color) => (
        <Radio value={color.color}>{color.name}</Radio>
      ))}
    </RadioGroup>
  )
}

export default ColorSelector
