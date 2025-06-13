import type { UserRole } from '@/enums/user.enum'

export type UserProfile = {
  token: string
  username: string
  role: UserRole
  phoneNumber: string
}
