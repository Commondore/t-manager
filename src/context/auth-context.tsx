/* eslint-disable react-refresh/only-export-components */

import { getMe } from "@/config/api"
import type { IUser } from "@/types/auth"
import { createContext, useContext, useMemo, useSyncExternalStore } from "react"

type AuthState = {
  user: IUser | null
  isUserLoading: boolean
}

interface UserContextParams extends AuthState {
  onAuth: (user: IUser | null) => void
}

const authListeners = new Set<() => void>()

let authState: AuthState = {
  user: null,
  isUserLoading: true,
}

const emitAuthState = () => {
  authListeners.forEach((listener) => listener())
}

const setAuthState = (nextState: Partial<AuthState>) => {
  authState = {
    ...authState,
    ...nextState,
  }

  emitAuthState()
}

const subscribeAuthStore = (listener: () => void) => {
  authListeners.add(listener)

  return () => {
    authListeners.delete(listener)
  }
}

const getAuthSnapshot = () => authState

const updateAuthUser = (user: IUser | null) => {
  setAuthState({
    user,
    isUserLoading: false,
  })
}

export async function authLoader() {
  setAuthState({ isUserLoading: true })

  try {
    const user = await getMe()

    updateAuthUser(user)

    return user
  } catch (error) {
    console.log("Ошибка получения пользователя", error)
    updateAuthUser(null)

    return null
  }
}

const AuthContext = createContext<UserContextParams>({
  user: null,
  isUserLoading: true,
  onAuth: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isUserLoading } = useSyncExternalStore(
    subscribeAuthStore,
    getAuthSnapshot,
    getAuthSnapshot
  )
  const contextValue = useMemo(
    () => ({
      user,
      isUserLoading,
      onAuth: updateAuthUser,
    }),
    [user, isUserLoading]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useUser = () => useContext(AuthContext)
