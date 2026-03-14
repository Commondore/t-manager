import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToLogin?: () => void
  onSwitchToSignUp?: () => void
}

export function LoginDialog({
  open,
  onOpenChange,
  onSwitchToSignUp,
}: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded-2xl border-border/50 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-center">
            Вход
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 pt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-sm font-medium">
              Эл. почта
            </Label>
            <Input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              className="h-10 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password" className="text-sm font-medium">
              Пароль
            </Label>
            <Input
              id="login-password"
              type="password"
              placeholder="Введите пароль"
              className="h-10 rounded-xl"
            />
          </div>

          <Button className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-sm font-semibold">
            Войти
          </Button>

          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">
              Нет аккаунта?{" "}
              <button
                onClick={() => {
                  onOpenChange(false)
                  onSwitchToSignUp?.()
                }}
                className="font-semibold text-primary hover:underline"
              >
                Регистрация
              </button>
            </p>
            <button className="text-xs text-primary hover:underline">
              Забыли пароль?
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function SignUpDialog({
  open,
  onOpenChange,
  onSwitchToLogin,
}: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded-2xl border-border/50 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-center">
            Регистрация
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 pt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name" className="text-sm font-medium">
              Полное имя
            </Label>
            <Input
              id="signup-name"
              placeholder="Иван Иванов"
              className="h-10 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-sm font-medium">
              Эл. почта
            </Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="name@example.com"
              className="h-10 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-sm font-medium">
              Пароль
            </Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="Придумайте пароль"
              className="h-10 rounded-xl"
            />
          </div>

          <Button className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-sm font-semibold">
            Зарегистрироваться
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{" "}
            <button
              onClick={() => {
                onOpenChange(false)
                onSwitchToLogin?.()
              }}
              className="font-semibold text-primary hover:underline"
            >
              Войти
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
