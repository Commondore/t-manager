import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet/>
      </SidebarInset>
    </SidebarProvider>
  )
}
