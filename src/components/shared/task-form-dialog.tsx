import type { FormEvent, ReactNode } from "react"
import { useId, useState } from "react"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface TaskFormValues {
  title: string
}

const EMPTY_TASK_FORM_VALUES: TaskFormValues = {
  title: "",
}

export interface TaskFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: TaskFormValues) => void | Promise<void>
  title: ReactNode
  initialValues?: TaskFormValues
  icon?: ReactNode
  inputLabel?: string
  placeholder?: string
  cancelText?: string
  submitText?: string
  isPending?: boolean
}

export function TaskFormDialog({
  open,
  onOpenChange,
  onSubmit,
  title,
  initialValues = EMPTY_TASK_FORM_VALUES,
  icon,
  inputLabel = "Название задачи",
  placeholder = "Введите название задачи",
  cancelText = "Отмена",
  submitText = "Сохранить",
  isPending = false,
}: TaskFormDialogProps) {
  const inputId = useId()
  const [values, setValues] = useState<TaskFormValues>(() => initialValues)

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isPending) {
      return
    }

    if (!nextOpen) {
      setValues(initialValues)
    }

    onOpenChange(nextOpen)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextValues: TaskFormValues = {
      ...values,
      title: values.title.trim(),
    }

    if (nextValues.title.length < 3 || isPending) {
      return
    }

    void onSubmit(nextValues)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={!isPending}
        className="overflow-hidden rounded-2xl border-border/50 p-0 sm:max-w-md"
      >
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="flex items-center gap-3 text-xl font-bold">
            {icon}
            {title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 pt-4 pb-6">
          <div className="space-y-2">
            <Label htmlFor={inputId} className="text-sm font-medium">
              {inputLabel}
            </Label>
            <Input
              id={inputId}
              value={values.title}
              onChange={(event) =>
                setValues((currentValues) => ({
                  ...currentValues,
                  title: event.target.value,
                }))
              }
              placeholder={placeholder}
              className="h-10 rounded-xl"
              autoComplete="off"
              autoFocus
              disabled={isPending}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => handleOpenChange(false)}
              className="flex-1 rounded-xl border-border/70"
            >
              {cancelText}
            </Button>
            <Button
              type="submit"
              disabled={values.title.trim().length < 3 || isPending}
              className="flex-1 gap-2 rounded-xl bg-primary hover:bg-primary/90"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {submitText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
