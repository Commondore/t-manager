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
import { useState } from "react"
import type { IUser } from "@/types/auth"

interface AuthDialogProps {
  open: boolean
  onSuccess: (user: IUser) => void
  onOpenChange: (open: boolean) => void
  onSwitchToLogin?: () => void
  onSwitchToSignUp?: () => void
}

export function SignUpDialog({
  open,
  onSuccess,
  onOpenChange,
  onSwitchToLogin,
}: AuthDialogProps) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [isSubmiting, setIsSubmiting] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((userData) => ({
      ...userData,
      [event.target.name]: event.target.value,
    }))
  }

  const onRegister = async () => {
    setIsSubmiting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Имитируем задержку для демонстрации состояния загрузки
    try {
      const user = await register(userData)
      onSuccess(user)
      console.log("Регистрация успешна:", user)
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
              name="name"
              placeholder="Иван Иванов"
              className="h-10 rounded-xl"
              onChange={handleInputChange}
              disabled={isSubmiting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-sm font-medium">
              Эл. почта
            </Label>
            <Input
              id="signup-email"
              type="email"
              name="email"
              placeholder="name@example.com"
              className="h-10 rounded-xl"
              onChange={handleInputChange}
              disabled={isSubmiting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-sm font-medium">
              Пароль
            </Label>
            <Input
              id="signup-password"
              type="password"
              name="password"
              placeholder="Придумайте пароль"
              className="h-10 rounded-xl"
              onChange={handleInputChange}
              disabled={isSubmiting}
            />
          </div>

          <Button
            onClick={onRegister}
            disabled={isSubmiting}
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
