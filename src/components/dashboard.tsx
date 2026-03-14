import { useState } from "react"
import { Header } from "@/components/header"
import { OverviewCards } from "@/components/overview-cards"
import { TaskList } from "@/components/task-list"
import { UpcomingDeadlines } from "@/components/upcoming-deadlines"
import { ProjectProgress } from "@/components/project-progress"
import { TaskDetailsDialog } from "@/components/task-details-dialog"
import { LoginDialog } from "@/components/auth-dialog"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"
import { SignUpDialog } from "@/components/signup-dialog"
import { useUser } from "@/context/auth-context"
import { logout } from "@/config/api"

export function Dashboard() {
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)
  const { user, onAuth } = useUser()

  const onLogout = async () => {
    try {
      await logout()
      onAuth(null)
    } catch (e) {
      console.log("Вы успешно вышли")
    }
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Header
        onLoginClick={() => setLoginOpen(true)}
        onSignUpClick={() => setSignUpOpen(true)}
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Overview */}
        <section className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Обзор</h2>
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

      <div className="fixed right-6 bottom-6 z-50 flex gap-2">
        {!user ? (
          <>
            <Button
              onClick={() => setLoginOpen(true)}
              variant="outline"
              className="gap-2 rounded-full border-border/50 bg-card shadow-lg hover:border-primary/50"
            >
              <LogIn className="h-4 w-4" />
              Войти
            </Button>
            <Button
              onClick={() => setSignUpOpen(true)}
              className="gap-2 rounded-full shadow-lg"
            >
              <UserPlus className="h-4 w-4" />
              Регистрация
            </Button>
          </>
        ) : (
          <Button onClick={onLogout} className="gap-2 rounded-full shadow-lg">
            Выйти
          </Button>
        )}
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
        onSuccess={onAuth}
      />
      <SignUpDialog
        open={signUpOpen}
        onOpenChange={setSignUpOpen}
        onSwitchToLogin={() => setLoginOpen(true)}
        onSuccess={onAuth}
      />
    </div>
  )
}
