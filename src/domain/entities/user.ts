import type { Role } from '@/domain/entities/role'

export type User = {
  id: string
  email: string
  displayName: string
  avatarUrl: string | null
  role: Role
  createdAt: string
}
