"use client"

import React from "react"
import { Meta } from "@storybook/react"
import { Button } from "@/components/ui/button"
import {
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastComponent,
} from "@/components/ui/toast"
import { useToastNotification } from "@/components/ui/toast"

export default {
  title: "Components/Toast",
  component: ToastComponent,
  parameters: {
    layout: "centered",
  },
} as Meta

const DemoToast = ({ variant }: { variant: "success" | "error" | "warning" | "info" | "default" }) => {
  const { showToast } = useToastNotification()

  return (
    <Button
      onClick={() =>
        showToast({
          title: `${variant.toUpperCase()} Toast`,
          description: `This is a ${variant} message.`,
          variant,
        })
      }
    >
      Show {variant} toast
    </Button>
  )
}

export const AllVariants = () => {
  return (
    <ToastProvider>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <DemoToast variant="success" />
        <DemoToast variant="error" />
        <DemoToast variant="warning" />
        <DemoToast variant="info" />
        <DemoToast variant="default" />
      </div>
      <ToastViewport />
    </ToastProvider>
  )
}
