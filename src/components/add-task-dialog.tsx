import { PlusCircle } from "lucide-react"
import { createTask } from "@/config/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  TaskFormDialog,
  type TaskFormValues,
} from "@/components/shared/task-form-dialog"

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
  const queryClient = useQueryClient()
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      onOpenChange(false)
    },
  })

  const handleSubmit = (values: TaskFormValues) => {
    createTaskMutation.mutate({ title: values.title, userId })
  }

  return (
    <TaskFormDialog
      key={open ? "add-task-open" : "add-task-closed"}
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      title="Добавить задачу"
      icon={<PlusCircle className="h-5 w-5 text-primary" />}
      isPending={createTaskMutation.isPending}
    />
  )
}
