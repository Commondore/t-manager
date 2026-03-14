import { Search, Bell, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/theme-provider"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface HeaderProps {
  onLoginClick?: () => void
  onSignUpClick?: () => void
}

export function Header(_props: HeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex items-center justify-between border-b border-border/50 bg-card px-6 py-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-2 text-muted-foreground hover:text-foreground" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">С возвращением!</h1>
          <p className="text-sm text-muted-foreground">
            Вот что происходит с вашими задачами сегодня.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск задач..."
            className="h-9 w-56 rounded-full bg-muted/50 pl-9 text-sm"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            3
          </span>
        </Button>

        <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-primary/20">
          <AvatarImage src="https://i.pravatar.cc/150?img=47" alt="Пользователь" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            ИИ
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
