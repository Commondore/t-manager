import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, PlusCircle } from "lucide-react"
import type { ITask } from "@/types/task"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTask, updateTask } from "@/config/api"
import { useState } from "react"
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog"
import {
  TaskFormDialog,
  type TaskFormValues,
} from "@/components/shared/task-form-dialog"

interface TaskDetailsDialogProps {
  task: ITask | null
  onClose: (open: boolean) => void
  onTaskUpdated?: (task: ITask) => void
}

export function TaskDetailsDialog({
  task,
  onClose,
  onTaskUpdated,
}: TaskDetailsDialogProps) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      setConfirmDeleteOpen(false)
      onClose(false)
    },
  })
  const updateMutation = useMutation({
    mutationFn: updateTask,

    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      setEditOpen(false)
      onTaskUpdated?.(updatedTask)
    },
  })

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setConfirmDeleteOpen(false)
      setEditOpen(false)
    }

    onClose(open)
  }

  const onDeleteTask = () => {
    if (!task) {
      return
    }

    deleteMutation.mutate(task.id)
  }

  const onUpdateTask = (values: TaskFormValues) => {
    if (!task) {
      return
    }

    updateMutation.mutate({
      taskId: task.id,
      data: {
        title: values.title,
      },
    })
  }

  return (
    <>
      <Dialog open={Boolean(task)} onOpenChange={handleOpenChange}>
        <DialogContent className="overflow-hidden rounded-2xl border-border/50 p-0 sm:max-w-md">
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle className="flex items-center gap-3 text-xl font-bold">
              <PlusCircle className="h-5 w-5 text-primary" />
              {task?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 px-6 pt-4 pb-6">
            {/* Теги */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="rounded-full border-border px-3 py-1 text-xs"
              >
                Лейбл
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full border-border px-3 py-1 text-xs"
              >
                Работа
              </Badge>
              <span className="ml-auto text-sm font-medium text-orange-500">
                Срок: завтра
              </span>
            </div>

            {/* Проект и Приоритет */}
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Проект: </span>
                <span className="font-medium">Средний</span>
              </div>
              <div>
                <span className="text-muted-foreground">Приоритет: </span>
                <Badge className="border-0 bg-amber-500/15 text-xs font-semibold text-amber-600">
                  Средний
                </Badge>
              </div>
            </div>

            {/* Описание */}
            <div className="rounded-xl bg-muted/40 p-4">
              <p className="text-sm leading-relaxed text-foreground/80">
                Начать работу над новым макетом лендинг-страницы и
                первоначальным дизайном. Подготовить прототип и согласовать с
                командой.
              </p>
            </div>

            {/* Кнопки */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-xl border-border/70 hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setConfirmDeleteOpen(true)}
              >
                Удалить
              </Button>
              <Button
                type="button"
                className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
                onClick={() => setEditOpen(true)}
              >
                Редактировать
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        open={confirmDeleteOpen && Boolean(task)}
        onOpenChange={setConfirmDeleteOpen}
        title="Удалить задачу?"
        description={
          task
            ? `Это действие нельзя отменить. Задача "${task.title}" будет удалена.`
            : "Это действие нельзя отменить."
        }
        isPending={deleteMutation.isPending}
        onConfirm={onDeleteTask}
      />
      <TaskFormDialog
        key={`${task?.id ?? "edit-task"}-${editOpen ? "open" : "closed"}`}
        open={editOpen && Boolean(task)}
        onOpenChange={setEditOpen}
        onSubmit={onUpdateTask}
        title="Редактировать задачу"
        initialValues={{ title: task?.title ?? "" }}
        icon={<Pencil className="h-5 w-5 text-primary" />}
        isPending={updateMutation.isPending}
      />
    </>
  )
}
