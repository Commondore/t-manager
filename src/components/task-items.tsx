import { Checkbox } from "@/components/ui/checkbox"
import type { ITask } from "@/types/task"

export function TaskItems({
  tasks,
  onTaskClick,
}: {
  tasks: ITask[]
  onTaskClick?: (task: ITask) => void
}) {
  return (
    <div className="space-y-1">
      {tasks.map((task) => (
        <div
          key={task.id}
          onClick={() => onTaskClick?.(task)}
          className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 transition-all hover:bg-muted/50"
        >
          <Checkbox
            checked={task.completed}
            className="h-5 w-5 rounded-md border-2 border-muted-foreground/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
          />
          <span
            className={`flex-1 text-sm font-medium ${
              task.completed
                ? "text-muted-foreground line-through"
                : "text-foreground"
            }`}
          >
            {task.title}
          </span>
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
      ))}
    </div>
  )
}
