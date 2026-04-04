import { createBrowserRouter } from "react-router-dom"

import { AdminLayout } from "@/app/admin-layout"
import Layout from "@/app/layout"
import { UserLayout } from "@/app/user-layout"
import { Dashboard } from "@/components/dashboard"
import { authLoader } from "@/context/auth-context"
import { AdminPage } from "@/pages/admin-page"
import { LoginPage } from "@/pages/login-page"
import { PrivateRoute } from "@/shared/router/private-route"
import { RoleGuard } from "@/shared/router/role-guard"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "projects",
        element: <h1 className="p-6 text-2xl font-bold">Проекты</h1>,
      },
      {
        path: "calendar",
        element: <h1 className="p-6 text-2xl font-bold">Календарь</h1>,
      },
      {
        path: "settings",
        element: <h1 className="p-6 text-2xl font-bold">Настройки</h1>,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <UserLayout />,
            children: [
              {
                path: "tasks",
                element: <Dashboard />,
              },
            ],
          },
          {
            element: <RoleGuard roles={["ADMIN"]} />,
            children: [
              {
                element: <AdminLayout />,
                children: [
                  {
                    path: "admin",
                    element: <AdminPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
])
