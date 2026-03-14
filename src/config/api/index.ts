import type { RegisterReq } from "@/types/auth"
import ky from "ky"

const api = ky.create({ prefixUrl: import.meta.env.VITE_SERVER_API })

api.extend({ credentials: "include" }) // для серверный куки

export const register = ({ email, password, name }: RegisterReq) => {
  return api.post("auth/register", {
    json: {
      email,
      password,
      name,
    },
  })
}

export default api
