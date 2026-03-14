import { getMe } from "@/config/api"
import type { IUser } from "@/types/auth"
import { createContext, useContext, useEffect, useState } from "react"

interface UserContextParams {
  user: IUser | null
  onAuth: (user: IUser | null) => void
}

const AuthContext = createContext<UserContextParams>({
  user: null,
  onAuth: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    getMe()
      .then((user) => setUser(user))
      .catch((e) => {
        console.log("Ошибка получения пользователя", e)
      })
  }, [])

  const onAuth = (user: IUser | null) => {
    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, onAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useUser = () => useContext(AuthContext)
