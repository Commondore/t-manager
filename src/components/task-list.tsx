import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  title: string
  tags: { label: string; color: string }[]
  category: string
  completed: boolean
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Закончить отчёт по проекту X",
    tags: [{ label: "Сегодня", color: "bg-red-500 text-white" }],
    category: "Высокий",
    completed: false,
  },
  {
    id: "2",
    title: "Совещание команды в 15:00",
    tags: [{ label: "Низкий", color: "bg-emerald-500 text-white" }],
    category: "Работа",
    completed: false,
  },
  {
    id: "3",
    title: "Дизайн новой лендинг-страницы",
    tags: [{ label: "Завтра", color: "bg-orange-500 text-white" }],
    category: "Высокий",
    completed: false,
  },
  {
    id: "4",
    title: "Обновить документацию проекта",
    tags: [{ label: "Сегодня", color: "bg-violet-500 text-white" }],
    category: "Работа",
    completed: false,
  },
  {
    id: "5",
    title: "Ревью пул-реквестов",
    tags: [{ label: "Низкий", color: "bg-emerald-500 text-white" }],
    category: "Работа",
    completed: true,
  },
]

export function TaskList({ onTaskClick }: { onTaskClick?: (task: Task) => void }) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm border border-border/50">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Мои задачи</h2>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 h-9 rounded-full bg-muted/70 p-1">
          <TabsTrigger
            value="all"
            className="rounded-full px-4 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Все
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="rounded-full px-4 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Активные
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-full px-4 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Завершённые
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <TaskItems tasks={tasks} onTaskClick={onTaskClick} />
        </TabsContent>
        <TabsContent value="active" className="mt-0">
          <TaskItems
            tasks={tasks.filter((t) => !t.completed)}
            onTaskClick={onTaskClick}
          />
        </TabsContent>
        <TabsContent value="completed" className="mt-0">
          <TaskItems
            tasks={tasks.filter((t) => t.completed)}
            onTaskClick={onTaskClick}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TaskItems({
  tasks,
  onTaskClick,
}: {
  tasks: Task[]
  onTaskClick?: (task: Task) => void
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
          <div className="flex items-center gap-2">
            {task.tags.map((tag) => (
              <Badge
                key={tag.label}
                className={`${tag.color} border-0 px-2.5 py-0.5 text-[11px] font-semibold shadow-none`}
              >
                {tag.label}
              </Badge>
            ))}
            <span className="text-xs text-muted-foreground">{task.category}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
