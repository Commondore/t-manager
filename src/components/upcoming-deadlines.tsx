import { ChevronRight, FileText } from "lucide-react"

const deadlines = [
  {
    id: "1",
    title: "Презентация клиенту",
    date: "25 апр",
    category: "Дизайн",
    categoryColor: "text-violet-500",
  },
  {
    id: "2",
    title: "Отправить отчёт о расходах",
    date: "27 апр",
    category: "Личное",
    categoryColor: "text-orange-500",
  },
  {
    id: "3",
    title: "Код-ревью Спринт 12",
    date: "28 апр",
    category: "Работа",
    categoryColor: "text-emerald-500",
  },
]

export function UpcomingDeadlines() {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm border border-border/50">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">
          Ближайшие дедлайны
        </h3>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {deadlines.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-all hover:bg-muted/50 cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {item.title}
              </p>
              <p className={`text-xs ${item.categoryColor}`}>
                {item.category}
              </p>
            </div>
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
