import { useUser } from "@/context/auth-context"
import { Navigate, Outlet, useLocation } from "react-router-dom"

function GuardFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 text-sm text-muted-foreground">
      Проверяем авторизацию...
    </div>
  )
}

export function PrivateRoute() {
  const { user, isUserLoading } = useUser()
  const location = useLocation()

  if (isUserLoading) {
    return <GuardFallback />
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
