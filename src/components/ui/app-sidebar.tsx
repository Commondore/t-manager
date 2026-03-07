import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>Header</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <h1>sadasd dsa das das </h1>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <h1>Sidebar footer</h1>
      </SidebarFooter>
    </Sidebar>
  )
}
