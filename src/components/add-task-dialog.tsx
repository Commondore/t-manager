import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, PlusCircle } from "lucide-react"
import { useState } from "react"
import { createTask } from "@/config/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface AddTaskDialogProps {
  userId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AddTaskDialog = ({
  open,
  onOpenChange,
  userId,
}: AddTaskDialogProps) => {
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const queryClient = useQueryClient()
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      setTitle("")
      onOpenChange(false)
    }
  })

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setTitle("")
    }

    onOpenChange(nextOpen)
  }

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    try {
      setIsLoading(true)
      // Имитируем задержку для демонстрации загрузки
      await new Promise((resolve) => setTimeout(resolve, 2000))
      createTaskMutation.mutate({ title, userId })
    } catch (e) {
      console.log("Error creating task", e)
    } finally {
      setIsLoading(false)
    }
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
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => handleOpenChange(false)}
              className="flex-1 rounded-xl border-border/70"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={title.trim().length < 3 || isLoading}
              className="flex-1 gap-2 rounded-xl bg-primary hover:bg-primary/90"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Сохранить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
