import { AuthProvider } from "@/context/auth-context"
import { RouterProvider } from "react-router-dom"
import { router } from "@/app/router"
import { QueryProvider } from "@/app/providers/query-client"

export function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryProvider>
  )
}

export default App
