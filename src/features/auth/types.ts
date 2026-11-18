import type { ReactNode } from "react"

export type Role =
  | "GRANDE_CONSELHO"
  | "CONSELHO_DE_BETHEL"
  | "MEMBRO_ATIVO"
  | "MEMBRO_DE_MAIORIDADE"

export type Admission = {
  name: string
  birthday: string
  city: string
  address: string
  volunteer: boolean
  masonicRelationship: boolean
  member: boolean
  sponsorship: boolean
}

export type AuthPermission = {
  role: Role
  bethelId: number | null
  bethelName: string | null
}

export type Profile = Admission & {
  id: number
  email: string
  active: boolean
  permission: AuthPermission | null
}

export type AuthStatus =
  | "initializing"
  | "guest"
  | "loading"
  | "admission"
  | "authenticated"
  | "no-permission"
  | "forbidden"
  | "unavailable"

export type AuthContextValue = {
  status: AuthStatus
  profile: Profile | null
  updateProfile: (profile: Profile) => void
  reload: () => Promise<void>
  logout: () => Promise<void>
}

export type AuthProviderProps = {
  children: ReactNode
}

export type AdmissionStatus =
  "editing" | "submitting" | "checking" | "uncertain" | "saved" | "forbidden"
