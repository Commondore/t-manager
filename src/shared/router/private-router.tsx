import { useUser } from "@/context/auth-context.tsx"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRouter = () => {
  const { user } = useUser()

  if(!user) return <Navigate to="/" />

  return <Outlet />
};
