import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ShieldCheck, Users, Workflow } from "lucide-react"

const adminStats = [
  {
    icon: Users,
    title: "Активные пользователи",
    value: "128",
    description: "Команда и приглашённые участники",
  },
  {
    icon: Workflow,
    title: "Рабочие процессы",
    value: "24",
    description: "Проекты с открытыми задачами",
  },
  {
    icon: ShieldCheck,
    title: "Уровень доступа",
    value: "ADMIN",
    description: "Страница доступна только администраторам",
  },
]

export function AdminPage() {
  return (
    <div className="flex flex-1 flex-col p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Admin panel
        </p>
        <h1 className="text-3xl font-bold text-foreground">
          Управление T-Manager
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Этот раздел защищён RoleGuard и отображается только для роли ADMIN.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {adminStats.map((stat) => (
          <Card key={stat.title} className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <stat.icon className="h-4 w-4 text-primary" />
                {stat.title}
              </CardTitle>
              <CardDescription>{stat.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
