import {
  LayoutDashboard,
  ListTodo,
  FolderKanban,
  CalendarDays,
  Settings,
  Plus,
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

const navItems = [
  { icon: LayoutDashboard, label: "Дашборд", active: true },
  { icon: ListTodo, label: "Мои задачи", active: false },
  { icon: FolderKanban, label: "Проекты", active: false },
  { icon: CalendarDays, label: "Календарь", active: false },
  { icon: Settings, label: "Настройки", active: false },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
            <ListTodo className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white group-data-[collapsible=icon]:hidden">
            T-Manager
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  isActive={item.active}
                  tooltip={item.label}
                  className="h-10 gap-3 rounded-lg px-3 text-sm font-medium text-white/80 transition-all hover:bg-white/15 hover:text-white data-[active=true]:bg-white/20 data-[active=true]:text-white"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          className="w-full gap-2 rounded-xl bg-white/20 text-white shadow-none backdrop-blur-sm hover:bg-white/30 group-data-[collapsible=icon]:p-2"
        >
          <Plus className="h-5 w-5" />
          <span className="group-data-[collapsible=icon]:hidden">Добавить задачу</span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
