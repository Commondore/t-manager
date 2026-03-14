import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/config/api"
import { useState } from "react"
import type { IUser } from "@/types/auth"

interface AuthDialogProps {
  open: boolean
  onSuccess: (user: IUser) => void
  onOpenChange: (open: boolean) => void
  onSwitchToLogin?: () => void
  onSwitchToSignUp?: () => void
}

export function LoginDialog({
  open,
  onSuccess,
  onOpenChange,
  onSwitchToSignUp,
}: AuthDialogProps) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const [isSubmiting, setIsSubmiting] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((userData) => ({
      ...userData,
      [event.target.name]: event.target.value,
    }))
  }

  const onLogin = async () => {
    setIsSubmiting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Имитируем задержку для демонстрации состояния загрузки
    try {
      const user = await login(userData)
      onSuccess(user)
      console.log("Авторизация успешна:", user)
      onOpenChange(false)
    } catch (error) {
      console.error("Ошибка при регистрации:", error)
    } finally {
      setIsSubmiting(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-2xl border-border/50 p-0 sm:max-w-sm">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-center text-2xl font-bold">
            Вход
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 px-6 pt-4 pb-6">
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-sm font-medium">
              Эл. почта
            </Label>
            <Input
              id="login-email"
              type="email"
              name="email"
              placeholder="name@example.com"
              className="h-10 rounded-xl"
              onChange={handleInputChange}
              disabled={isSubmiting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password" className="text-sm font-medium">
              Пароль
            </Label>
            <Input
              id="login-password"
              type="password"
              name="password"
              placeholder="Введите пароль"
              className="h-10 rounded-xl"
              onChange={handleInputChange}
              disabled={isSubmiting}
            />
          </div>

          <Button
            disabled={isSubmiting}
            onClick={onLogin}
            className="h-11 w-full rounded-xl bg-primary text-sm font-semibold hover:bg-primary/90"
          >
            Войти
          </Button>

          <div className="space-y-1 text-center">
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
