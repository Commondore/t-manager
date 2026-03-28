import {createBrowserRouter} from 'react-router-dom'
import Layout from "@/app/layout"
import { Dashboard } from "@/components/dashboard"

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
        path: 'test',
        element: <h1>Test page</h1>
      }
    ],
  },
])
