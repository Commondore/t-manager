import { Outlet } from "react-router-dom"

export function AdminLayout() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[radial-gradient(circle_at_top_right,_hsl(var(--primary)_/_0.08),_transparent_32%)]">
      <Outlet />
    </div>
  )
}
