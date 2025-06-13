import type { UserRole } from '@/enums/user.enum'

export type UserProfile = {
  token: string
  id: number
  username: string
  role: UserRole
  phoneNumber: string
}

export type UserResponse = {
  id: number
  username: string
  role: UserRole
  phoneNumber: string
}
