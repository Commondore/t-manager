import {createBrowserRouter} from 'react-router-dom'
import Layout from "@/app/layout"
import { Dashboard } from "@/components/dashboard"
import { PrivateRouter } from "@/shared/router/private-router"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'test2',
        element: <h1>Тестовая страница</h1>,
      },
      {
        path: "test",
        element: <PrivateRouter />,
        children: [
          {
            index: true,
            element: <h1>Приватная тестовая страница</h1>,
          },
        ],
      },
    ],
  },
])
