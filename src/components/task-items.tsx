import { Checkbox } from "@/components/ui/checkbox"
import { updateTask } from "@/config/api"
import type { ITask } from "@/types/task"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

export function TaskItems({
  tasks,
  onTaskClick,
}: {
  tasks: ITask[]
  onTaskClick?: (task: ITask) => void
}) {
  const queryClient = useQueryClient()
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (updatedTask) => {
      queryClient.setQueryData<ITask[]>(["tasks"], (currentTasks) =>
        currentTasks?.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  const updatingTaskId = updateTaskMutation.variables?.taskId

  const handleCompletedChange = (task: ITask, completed: boolean) => {
    updateTaskMutation.mutate({
      taskId: task.id,
      data: {
        completed,
      },
    })
  }

  return (
    <div className="space-y-1">
      {tasks.map((task) => {
        const isUpdating =
          updateTaskMutation.isPending && updatingTaskId === task.id

        return (
          <div
            key={task.id}
            className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all hover:bg-muted/50"
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center">
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <Checkbox
                  checked={task.completed}
                  disabled={updateTaskMutation.isPending}
                  onCheckedChange={(checked) =>
                    handleCompletedChange(task, checked === true)
                  }
                  className="h-5 w-5 rounded-md border-2 border-muted-foreground/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => onTaskClick?.(task)}
              className={`flex-1 cursor-pointer text-left text-sm font-medium transition-colors ${
                task.completed
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
            >
              {task.title}
            </button>
            {/* TODO: Добавить теги */}
            {/* <div className="flex items-center gap-2">
            {task.tags.map((tag) => (
              <Badge
                key={tag.label}
                className={`${tag.color} border-0 px-2.5 py-0.5 text-[11px] font-semibold shadow-none`}
              >
                {tag.label}
              </Badge>
            ))}
            <span className="text-xs text-muted-foreground">
              {task.category}
            </span>
          </div> */}
          </div>
        )
      })}
    </div>
  )
}
