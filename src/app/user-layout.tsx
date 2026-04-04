import { Outlet } from "react-router-dom"

export function UserLayout() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Outlet />
    </div>
  )
}
