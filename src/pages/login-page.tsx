import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/config/api"
import { useUser } from "@/context/auth-context"
import { LockKeyhole, LogIn } from "lucide-react"
import { useEffect, useState, type FormEvent } from "react"
import {
  useLocation,
  useNavigate,
  type Location,
} from "react-router-dom"

type LoginLocationState = {
  from?: Location
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, onAuth } = useUser()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const from =
    (location.state as LoginLocationState | null)?.from?.pathname || "/tasks"

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true })
    }
  }, [from, navigate, user])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setUserData((currentUserData) => ({
      ...currentUserData,
      [name]: value,
    }))
  }

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const authenticatedUser = await login(userData)

      onAuth(authenticatedUser)
      navigate(from, { replace: true })
    } catch {
      setError("Не удалось войти. Проверьте email и пароль.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,_hsl(var(--primary)_/_0.12),_transparent_42%)] p-6">
      <Card className="w-full max-w-md border-border/60 px-2 py-6 shadow-xl shadow-black/5">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Вход в аккаунт</CardTitle>
          <CardDescription>
            Авторизуйтесь, чтобы открыть приватные разделы и вернуться к
            выбранной странице.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Эл. почта</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={userData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Введите пароль"
                value={userData.password}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
            </div>

            {error ? (
              <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-xl font-semibold"
            >
              <LogIn className="h-4 w-4" />
              {isSubmitting ? "Входим..." : "Войти"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
