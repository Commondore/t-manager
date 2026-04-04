import {
  LayoutDashboard,
  ListTodo,
  FolderKanban,
  CalendarDays,
  Settings,
  Plus,
  ShieldCheck,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/auth-context"
import type { Role } from "@/types/auth"
import { NavLink, useLocation } from "react-router-dom"

type SidebarNavItem = {
  icon: typeof LayoutDashboard
  label: string
  path: string
  roles?: Role[]
}

const navItems: SidebarNavItem[] = [
  { icon: LayoutDashboard, label: "Дашборд", path: "/" },
  {
    icon: ListTodo,
    label: "Мои задачи",
    path: "/tasks",
    roles: ["USER", "ADMIN"],
  },
  { icon: FolderKanban, label: "Проекты", path: "/projects" },
  { icon: CalendarDays, label: "Календарь", path: "/calendar" },
  { icon: Settings, label: "Настройки", path: "/settings" },
  { icon: ShieldCheck, label: "Админка", path: "/admin", roles: ["ADMIN"] },
]

export function AppSidebar() {
  const { pathname } = useLocation()
  const { user } = useUser()
  const visibleNavItems = navItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  )

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
            <ListTodo className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white group-data-[collapsible=icon]:hidden">
            T-Manager
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 group-data-[collapsible=icon]:px-1">
        <SidebarGroup>
          <SidebarMenu>
            {visibleNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  isActive={pathname === item.path}
                  tooltip={item.label}
                  asChild
                  className="h-10 gap-3 rounded-lg px-3 text-sm font-medium text-white/80 transition-all group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:px-0 hover:bg-white/15 hover:text-white data-[active=true]:bg-white/20 data-[active=true]:text-white"
                >
                  <NavLink to={item.path}>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.label}
                    </span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-1">
        <Button
          disabled={!user}
          className="w-full gap-2 rounded-xl bg-white/20 text-white shadow-none backdrop-blur-sm group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:aspect-square group-data-[collapsible=icon]:size-9 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:p-0 hover:bg-white/30 disabled:opacity-50"
        >
          <Plus className="h-5 w-5" />
          <span className="group-data-[collapsible=icon]:hidden">
            Добавить задачу
          </span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
