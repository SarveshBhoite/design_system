import React, { useState } from "react"
import { Modal } from "./modal"
import { Button } from "@/components/ui/button"

export default {
  title: "Components/Modal",
  component: Modal,
}

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Default Modal"
        description="This is a basic modal"
        confirmText="OK"
        cancelText="Cancel"
        onConfirm={() => alert("Confirmed")}
      >
        <p>This is the content inside the modal.</p>
      </Modal>
    </>
  )
}

export const WithCustomFooter = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Custom Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Custom Footer"
        footer={
          <div className="flex justify-between w-full">
            <Button onClick={() => setIsOpen(false)} variant="outline">Dismiss</Button>
            <Button onClick={() => alert("Proceeding...")}>Proceed</Button>
          </div>
        }
      >
        <p>This modal uses a custom footer instead of the default confirm/cancel buttons.</p>
      </Modal>
    </>
  )
}

export const DangerVariant = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>Delete Item</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Confirmation"
        description="Are you sure you want to delete this item?"
        confirmText="Delete"
        cancelText="Cancel"
        isDanger
        onConfirm={() => alert("Deleted!")}
      >
        <p>This action is irreversible.</p>
      </Modal>
    </>
  )
}

export const LoadingState = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Loading Example"
        confirmText="Save"
        cancelText="Back"
        isLoading={loading}
        onConfirm={() => {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setIsOpen(false)
          }, 2000)
        }}
      >
        <p>Click "Save" to simulate a loading state.</p>
      </Modal>
    </>
  )
}
