import type { IUser, RegisterReq } from "@/types/auth"
import type { ITask, TaskRequest, TaskUpdate } from "@/types/task"
import ky from "ky"

const CSRF_ENDPOINT = "auth/csrf"
const REFRESH_ENDPOINT = "auth/refresh"
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"])
const DEFAULT_CSRF_HEADER = "x-csrf-token"
const AUTH_REFRESH_EXCLUDE_PATHS = new Set([
  CSRF_ENDPOINT,
  REFRESH_ENDPOINT,
  "auth/login",
  "auth/register",
  "auth/logout",
])

type CsrfResponse = {
  token?: string
  csrf?: string
  csrfToken?: string
  xsrfToken?: string
  header?: string
  headerName?: string
}

type ApiUserResponse = {
  id?: number
  email: string
  name: string
  role?: string | null
}

type AuthResponse = {
  success: boolean
  user: ApiUserResponse
}

let csrfTokenCache: string | null = null
let csrfHeaderCache = DEFAULT_CSRF_HEADER
let csrfRequest: Promise<string | null> | null = null
let refreshRequest: Promise<void> | null = null

const api = ky.create({
  prefixUrl: import.meta.env.VITE_SERVER_API,
  credentials: "include",
  hooks: {
    beforeRequest: [
      async (request) => {
        const method = request.method.toUpperCase()
        const pathname = new URL(request.url).pathname

        if (
          SAFE_METHODS.has(method) ||
          pathname.endsWith(`/${CSRF_ENDPOINT}`)
        ) {
          return
        }

        const csrfToken = await getCsrfToken()

        if (csrfToken) {
          request.headers.set(csrfHeaderCache, csrfToken)
        }
      },
    ],
    afterResponse: [
      async (request, _options, response, state) => {
        const pathname = new URL(request.url).pathname
        const endpoint = pathname.split("/").filter(Boolean).slice(-2).join("/")

        if (
          response.status !== 401 ||
          state.retryCount > 0 ||
          AUTH_REFRESH_EXCLUDE_PATHS.has(endpoint)
        ) {
          return response
        }

        try {
          await refreshAccessToken()
          return ky.retry({ code: "TOKEN_REFRESHED" })
        } catch {
          return response
        }
      },
    ],
  },
})

const resolveCsrfToken = (data: CsrfResponse) => {
  const token =
    data.csrfToken ?? data.token ?? data.csrf ?? data.xsrfToken ?? null
  const headerName = data.headerName ?? data.header ?? DEFAULT_CSRF_HEADER

  return {
    token,
    headerName,
  }
}

const normalizeUser = (user: ApiUserResponse): IUser => ({
  id: user.id!,
  email: user.email,
  name: user.name,
  role: user.role?.toUpperCase() === "ADMIN" ? "ADMIN" : "USER",
})

export const getCsrfToken = async () => {
  if (csrfTokenCache) {
    return csrfTokenCache
  }

  if (!csrfRequest) {
    csrfRequest = api
      .get(CSRF_ENDPOINT)
      .json<CsrfResponse>()
      .then((data) => {
        const { token, headerName } = resolveCsrfToken(data)

        csrfTokenCache = token
        csrfHeaderCache = headerName

        return token
      })
      .finally(() => {
        csrfRequest = null
      })
  }

  return csrfRequest
}

const refreshAccessToken = async () => {
  if (!refreshRequest) {
    refreshRequest = api
      .post(REFRESH_ENDPOINT)
      .then(() => undefined)
      .finally(() => {
        refreshRequest = null
      })
  }

  return refreshRequest
}

export const register = ({
  email,
  password,
  name,
}: RegisterReq): Promise<IUser> => {
  return api
    .post("auth/register", {
      json: {
        email,
        password,
        name,
      },
    })
    .json<AuthResponse>()
    .then(({ user }) => normalizeUser(user))
}

export const login = ({
  email,
  password,
}: Omit<RegisterReq, "name">): Promise<IUser> => {
  return api
    .post("auth/login", { json: { email, password } })
    .json<AuthResponse>()
    .then(({ user }) => normalizeUser(user))
}

export const getMe = async (): Promise<IUser> => {
  const user = await api.get("user/me").json<ApiUserResponse>()

  return normalizeUser(user)
}

export const logout = () => {
  return api.post("auth/logout")
}

export const createTask = ({ title, userId }: TaskRequest): Promise<ITask> => {
  return api
    .post("tasks", {
      json: {
        title,
        completed: false,
        userId,
      },
    })
    .json()
}

export const getTasks = (): Promise<ITask[]> => {
  return api.get("tasks").json()
}

export const updateTask = ({ taskId, data }: TaskUpdate): Promise<ITask> => {
  return api
    .patch(`tasks/${taskId}`, {
      json: data,
    })
    .json()
}

export const deleteTask = (taskId: number) => {
  return api.delete(`tasks/${taskId}`).json()
}

export const getTaskById = (taskId: number): Promise<ITask> => {
  return api.get(`tasks/${taskId}`).json()
}

export default api
