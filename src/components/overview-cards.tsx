import { ListTodo, CheckCircle2, Clock } from "lucide-react"

const stats = [
  {
    label: "Все задачи",
    value: 12,
    icon: ListTodo,
    gradient: "from-violet-500 to-violet-600",
    iconBg: "bg-white/20",
  },
  {
    label: "Завершённые",
    value: 5,
    icon: CheckCircle2,
    gradient: "from-emerald-400 to-emerald-500",
    iconBg: "bg-white/20",
  },
  {
    label: "В ожидании",
    value: 7,
    icon: Clock,
    gradient: "from-orange-400 to-orange-500",
    iconBg: "bg-white/20",
  },
]

export function OverviewCards() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`relative flex items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-5 text-white shadow-lg transition-transform hover:scale-[1.02]`}
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}>
            <stat.icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm font-medium text-white/80">{stat.label}</p>
          </div>
          {/* Decorative circle */}
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" />
          <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-white/5" />
        </div>
      ))}
    </div>
  )
}
