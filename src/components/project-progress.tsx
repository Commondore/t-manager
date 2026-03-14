import { ChevronRight } from "lucide-react"

export function ProjectProgress() {
  const percentage = 75
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm border border-border/50">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">
          Прогресс проекта
        </h3>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>

      <p className="mb-3 text-sm font-medium text-muted-foreground">
        Редизайн сайта
      </p>

      <div className="flex items-center justify-center">
        <div className="relative h-36 w-36">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/60"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="animate-donut"
              style={{
                transition: "stroke-dashoffset 1.5s ease-out",
              }}
            />
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="oklch(0.55 0.22 270)" />
                <stop offset="100%" stopColor="oklch(0.45 0.22 270)" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-foreground">
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span>Завершено</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span>Осталось</span>
        </div>
      </div>
    </div>
  )
}
