import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { TaskItems } from "@/components/task-items"

interface Task {
  id: string
  title: string
  tags: { label: string; color: string }[]
  category: string
  completed: boolean
}

// const tasks: Task[] = [
//   {
//     id: "1",
//     title: "Закончить отчёт по проекту X",
//     tags: [{ label: "Сегодня", color: "bg-red-500 text-white" }],
//     category: "Высокий",
//     completed: false,
//   },
//   {
//     id: "2",
//     title: "Совещание команды в 15:00",
//     tags: [{ label: "Низкий", color: "bg-emerald-500 text-white" }],
//     category: "Работа",
//     completed: false,
//   },
//   {
//     id: "3",
//     title: "Дизайн новой лендинг-страницы",
//     tags: [{ label: "Завтра", color: "bg-orange-500 text-white" }],
//     category: "Высокий",
//     completed: false,
//   },
//   {
//     id: "4",
//     title: "Обновить документацию проекта",
//     tags: [{ label: "Сегодня", color: "bg-violet-500 text-white" }],
//     category: "Работа",
//     completed: false,
//   },
//   {
//     id: "5",
//     title: "Ревью пул-реквестов",
//     tags: [{ label: "Низкий", color: "bg-emerald-500 text-white" }],
//     category: "Работа",
//     completed: true,
//   },
// ]

export function TaskList({
  onTaskClick,
}: {
  onTaskClick?: (task: Task) => void
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
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
          <TaskItems tasks={[]} />
        </TabsContent>
        <TabsContent value="active" className="mt-0">
          <TaskItems tasks={[].filter((t) => !t.completed)} />
        </TabsContent>
        <TabsContent value="completed" className="mt-0">
          <TaskItems tasks={[].filter((t) => t.completed)} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
