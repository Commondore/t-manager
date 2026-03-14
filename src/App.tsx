import Layout from "@/app/layout"
import { Dashboard } from "@/components/dashboard"
import { AuthProvider } from "@/context/auth-context"

export function App() {
  return (
    <AuthProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </AuthProvider>
  )
}

export default App
