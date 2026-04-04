import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { useState } from "react"

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AddTaskDialog = ({ open, onOpenChange }: AddTaskDialogProps) => {
  const [title, setTitle] = useState("")

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setTitle("")
    }

    onOpenChange(nextOpen)
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    setTitle("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden rounded-2xl border-border/50 p-0 sm:max-w-md">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="flex items-center gap-3 text-xl font-bold">
            <PlusCircle className="h-5 w-5 text-primary" />
            Добавить задачу
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 pt-4 pb-6">
          <div className="space-y-2">
            <Label htmlFor="task-title" className="text-sm font-medium">
              Название задачи
            </Label>
            <Input
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Введите название задачи"
              className="h-10 rounded-xl"
              autoComplete="off"
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="flex-1 rounded-xl border-border/70"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={title.trim().length < 3}
              className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
            >
              Сохранить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
