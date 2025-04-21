import React, { useState } from "react"
import { Select } from "./select"
import { AlertCircle } from "lucide-react"

export default {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"], // Optional for auto-docs support
}

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
]

const groupedOptions = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot" },
      { value: "lettuce", label: "Lettuce" },
    ],
  },
]

export const Default = () => {
  const [value, setValue] = useState("")
  return (
    <Select
      label="Choose a fruit"
      placeholder="Select a fruit"
      options={options}
      value={value}
      onChange={setValue}
      helperText="You can select any fruit from the list"
    />
  )
}

export const WithError = () => (
  <Select
    label="Fruit"
    placeholder="Select a fruit"
    options={options}
    status="error"
    errorMessage="This field is required"
  />
)

export const WithSuccess = () => (
  <Select
    label="Fruit"
    placeholder="Select a fruit"
    options={options}
    status="success"
    successMessage="Looks good!"
  />
)

export const WithIcon = () => {
  const [value, setValue] = useState("")
  return (
    <Select
      label="Fruit"
      placeholder="Select a fruit"
      options={options}
      icon={<AlertCircle />}
      value={value}
      onChange={setValue}
    />
  )
}

export const GroupedOptions = () => {
  const [value, setValue] = useState("")
  return (
    <Select
      label="Grouped Select"
      placeholder="Choose an option"
      options={groupedOptions}
      value={value}
      onChange={setValue}
    />
  )
}
