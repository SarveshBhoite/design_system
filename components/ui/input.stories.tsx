import type { Meta, StoryObj } from "@storybook/react" 
import { Input } from "./input" import { Mail } from "lucide-react"

const meta: Meta<typeof Input> = { title: "Components/Input", component: Input, tags: ["autodocs"], } 
export default meta type Story = StoryObj<typeof Input>

export const Default: Story = { args: { label: "Email", placeholder: "you@example.com", helperText: "We’ll never share your email.", }, }

export const WithLeftIcon: Story = { args: { label: "Email", placeholder: "you@example.com", leftIcon: <Mail className="h-4 w-4" />, }, }

export const ErrorState: Story = { args: { label: "Email", placeholder: "you@example.com", errorMessage: "This field is required", status: "error", }, }

export const SuccessState: Story = { args: { label: "Username", placeholder: "done", successMessage: "Looks good!", status: "success", }, }

export const Clearable: Story = { args: { label: "Search", placeholder: "Type something...", onClear: () => alert("Cleared!"), }, }