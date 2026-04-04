export type Role = "USER" | "ADMIN"

export interface RegisterReq {
  email: string
  password: string
  name: string
}

export interface IUser {
  id?: number
  email: string
  name: string
  role: Role
}
