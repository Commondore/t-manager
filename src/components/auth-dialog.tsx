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

          <Button className="h-11 w-full rounded-xl bg-primary text-sm font-semibold hover:bg-primary/90">
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
