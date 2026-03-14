import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register } from "@/config/api"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToLogin?: () => void
  onSwitchToSignUp?: () => void
}

export function SignUpDialog({
  open,
  onOpenChange,
  onSwitchToLogin,
}: AuthDialogProps) {
  const onRegister = async () => {
    console.log("Регистрация...")
    try {
      const response = await register({
        email: "vasya@gmail.com",
        password: "12345678",
        name: "Вася Пупкин",
      })
      console.log("Регистрация успешна:", response)
      onOpenChange(false)
    } catch (error) {
      console.error("Ошибка при регистрации:", error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-2xl border-border/50 p-0 sm:max-w-sm">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-center text-2xl font-bold">
            Регистрация
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 px-6 pt-4 pb-6">
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

          <Button
            onClick={onRegister}
            className="h-11 w-full rounded-xl bg-primary text-sm font-semibold hover:bg-primary/90"
          >
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
