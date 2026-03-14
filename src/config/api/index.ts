import type { IUser, RegisterReq } from "@/types/auth"
import ky from "ky"

const CSRF_ENDPOINT = "auth/csrf"
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"])
const DEFAULT_CSRF_HEADER = "x-csrf-token"

type CsrfResponse = {
  token?: string
  csrf?: string
  csrfToken?: string
  xsrfToken?: string
  header?: string
  headerName?: string
}

let csrfTokenCache: string | null = null
let csrfHeaderCache = DEFAULT_CSRF_HEADER
let csrfRequest: Promise<string | null> | null = null

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
    .json()
}

export const login = ({
  email,
  password,
}: Omit<RegisterReq, "name">): Promise<IUser> => {
  return api.post("auth/login", { json: { email, password } }).json()
}

export const getMe = (): Promise<IUser> => {
  return api.get("user/me").json()
}

export const logout = () => {
  return api.post("auth/logout")
}

export default api
