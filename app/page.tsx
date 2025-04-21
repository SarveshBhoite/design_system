"use client"

import { useState } from "react"
import { Heading, Text } from "@/components/typography"
import { Input, Select } from "@/components/form"
import { Modal, ToastProvider, useToastNotification } from "@/components/feedback"
import { Button } from "@/components/ui/button"
import { Mail, User, Lock } from "lucide-react"

export default function Home() {
  const { showToast } = useToastNotification()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [selectValue, setSelectValue] = useState("")

  const handleShowToast = (variant: "default" | "success" | "error" | "warning" | "info") => {
    showToast({
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
      description: `This is a ${variant} toast notification example.`,
      variant,
    })
  }

  return (
    <ToastProvider>
      <div className="container mx-auto py-10 space-y-10">
        <section className="space-y-6">
          <Heading level="h1">Design System Components</Heading>
          <Text variant="lead">
            A modular, accessible, and theme-aware component system using React, TypeScript, and TailwindCSS.
          </Text>
        </section>

        <section className="space-y-6">
          <Heading level="h2">Typography</Heading>
          <div className="space-y-4">
            <Heading level="h1">Heading 1</Heading>
            <Heading level="h2">Heading 2</Heading>
            <Heading level="h3">Heading 3</Heading>
            <Heading level="h4">Heading 4</Heading>
            <Heading level="h5">Heading 5</Heading>
            <Heading level="h6">Heading 6</Heading>

            <Text variant="paragraph">
              This is a paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl
              eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
            </Text>

            <Text variant="lead">This is a lead text, used for introductions or highlighted content.</Text>

            <Text variant="large">This is large text.</Text>

            <Text variant="small">This is small text.</Text>

            <Text variant="muted">This is muted text, used for secondary information.</Text>

            <Text variant="caption">This is caption text, used for image captions or small notes.</Text>

            <Text variant="helper">This is helper text, used for form field hints or additional context.</Text>

            <Text variant="label" as="label">
              This is label text, used for form fields.
            </Text>
          </div>
        </section>

        <section className="space-y-6">
          <Heading level="h2">Form Components</Heading>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <Heading level="h3">Text Input</Heading>

              <Input
                label="Default Input"
                placeholder="Enter your name"
                helperText="This is a helper text for the input field."
              />

              <Input
                label="Input with Left Icon"
                placeholder="Enter your email"
                leftIcon={<Mail className="h-4 w-4" />}
                helperText="This input has a left icon."
              />

              <Input
                label="Input with Right Icon"
                placeholder="Enter your username"
                rightIcon={<User className="h-4 w-4" />}
                helperText="This input has a right icon."
              />

              <Input
                label="Clearable Input"
                placeholder="Type something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onClear={() => setInputValue("")}
                helperText="This input can be cleared with a button."
              />

              <Input
                label="Error Input"
                placeholder="Enter password"
                type="password"
                leftIcon={<Lock className="h-4 w-4" />}
                status="error"
                errorMessage="Password must be at least 8 characters long."
              />

              <Input
                label="Success Input"
                placeholder="Enter username"
                leftIcon={<User className="h-4 w-4" />}
                status="success"
                successMessage="Username is available."
              />

              <Input
                label="Disabled Input"
                placeholder="This input is disabled"
                disabled
                helperText="This input is disabled and cannot be edited."
              />
            </div>

            <div className="space-y-6">
              <Heading level="h3">Select Dropdown</Heading>

              <Select
                label="Default Select"
                placeholder="Select an option"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  { value: "option3", label: "Option 3" },
                ]}
                helperText="This is a helper text for the select field."
              />

              <Select
                label="Select with Icon"
                placeholder="Select a user"
                icon={<User className="h-4 w-4" />}
                options={[
                  { value: "user1", label: "User 1" },
                  { value: "user2", label: "User 2" },
                  { value: "user3", label: "User 3" },
                ]}
                helperText="This select has an icon."
              />

              <Select
                label="Select with Value"
                placeholder="Select a value"
                value={selectValue}
                onChange={setSelectValue}
                options={[
                  { value: "value1", label: "Value 1" },
                  { value: "value2", label: "Value 2" },
                  { value: "value3", label: "Value 3" },
                ]}
                helperText="This select has a controlled value."
              />

              <Select
                label="Grouped Select"
                placeholder="Select a fruit or vegetable"
                options={[
                  {
                    label: "Fruits",
                    options: [
                      { value: "apple", label: "Apple" },
                      { value: "banana", label: "Banana" },
                      { value: "orange", label: "Orange" },
                    ],
                  },
                  {
                    label: "Vegetables",
                    options: [
                      { value: "carrot", label: "Carrot" },
                      { value: "broccoli", label: "Broccoli" },
                      { value: "spinach", label: "Spinach" },
                    ],
                  },
                ]}
                helperText="This select has grouped options."
              />

              <Select
                label="Error Select"
                placeholder="Select an option"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  { value: "option3", label: "Option 3" },
                ]}
                status="error"
                errorMessage="Please select an option."
              />

              <Select
                label="Success Select"
                placeholder="Select an option"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  { value: "option3", label: "Option 3" },
                ]}
                status="success"
                successMessage="Great choice!"
              />

              <Select
                label="Disabled Select"
                placeholder="This select is disabled"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  { value: "option3", label: "Option 3" },
                ]}
                disabled
                helperText="This select is disabled and cannot be changed."
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <Heading level="h2">Feedback Components</Heading>

          <div className="space-y-6">
            <Heading level="h3">Toast Notifications</Heading>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => handleShowToast("default")}>Default Toast</Button>
              <Button onClick={() => handleShowToast("success")} variant="success">
                Success Toast
              </Button>
              <Button onClick={() => handleShowToast("error")} variant="destructive">
                Error Toast
              </Button>
              <Button onClick={() => handleShowToast("warning")} variant="warning">
                Warning Toast
              </Button>
              <Button onClick={() => handleShowToast("info")} variant="secondary">
                Info Toast
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Heading level="h3">Modal Dialog</Heading>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            </div>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Modal Title"
              description="This is a description of the modal dialog."
              confirmText="Confirm"
              cancelText="Cancel"
              onConfirm={() => {
                showToast({
                  title: "Modal Confirmed",
                  description: "You confirmed the modal dialog.",
                  variant: "success",
                })
                setIsModalOpen(false)
              }}
            >
              <div className="py-4">
                <Text>This is the content of the modal dialog.</Text>
                <Text>You can put any content here, including forms, images, or other components.</Text>
              </div>
            </Modal>
          </div>
        </section>
      </div>
    </ToastProvider>
  )
}
