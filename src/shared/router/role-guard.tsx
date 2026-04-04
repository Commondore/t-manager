import { useUser } from "@/context/auth-context"
import type { Role } from "@/types/auth"
import { Navigate, Outlet, useLocation } from "react-router-dom"

function RoleGuardFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 text-sm text-muted-foreground">
      Проверяем права доступа...
    </div>
  )
}

export function RoleGuard({ roles }: { roles: Role[] }) {
  const { user, isUserLoading } = useUser()
  const location = useLocation()

  if (isUserLoading) {
    return <RoleGuardFallback />
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
