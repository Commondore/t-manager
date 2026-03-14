import { useState } from "react"
import { Header } from "@/components/header"
import { OverviewCards } from "@/components/overview-cards"
import { TaskList } from "@/components/task-list"
import { UpcomingDeadlines } from "@/components/upcoming-deadlines"
import { ProjectProgress } from "@/components/project-progress"
import { TaskDetailsDialog } from "@/components/task-details-dialog"
import { LoginDialog, SignUpDialog } from "@/components/auth-dialogs"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"

export function Dashboard() {
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Header
        onLoginClick={() => setLoginOpen(true)}
        onSignUpClick={() => setSignUpOpen(true)}
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Overview */}
        <section className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Обзор
          </h2>
          <OverviewCards />
        </section>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Task List */}
          <div className="lg:col-span-2">
            <TaskList onTaskClick={() => setTaskDetailsOpen(true)} />
          </div>

          {/* Right: Widgets */}
          <div className="space-y-6">
            <UpcomingDeadlines />
            <ProjectProgress />
          </div>
        </div>
      </div>

      {/* Auth buttons (floating) */}
      <div className="fixed bottom-6 right-6 flex gap-2 z-50">
        <Button
          onClick={() => setLoginOpen(true)}
          variant="outline"
          className="rounded-full shadow-lg bg-card border-border/50 gap-2 hover:border-primary/50"
        >
          <LogIn className="h-4 w-4" />
          Войти
        </Button>
        <Button
          onClick={() => setSignUpOpen(true)}
          className="rounded-full shadow-lg gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Регистрация
        </Button>
      </div>

      {/* Dialogs */}
      <TaskDetailsDialog
        open={taskDetailsOpen}
        onOpenChange={setTaskDetailsOpen}
      />
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToSignUp={() => setSignUpOpen(true)}
      />
      <SignUpDialog
        open={signUpOpen}
        onOpenChange={setSignUpOpen}
        onSwitchToLogin={() => setLoginOpen(true)}
      />
    </div>
  )
}
