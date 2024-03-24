import { Address } from '~/types/Post'

export type User = {
  createdDate: Date
  email: string
  firstname: string
  lastname: string
  lastActive: Date
  lastUpdate: Date
  password: string
  phoneNumber: string
  role: string
  userId: string
  username: string
}

export type UserAuth = {
  // accessToken: string
  // refreshToken: string
  role: string
  userId: string
  username: string
}

export type UserRegister = {
  address: Address
  dateOfBirth: string
  email: string
  gender: string
  firstname: string
  lastname: string
  phoneNumber: string
  rawPassword: string
  role: string
  username: string
}

export type Language = {
  languageId: string
  languageName: string
}

export type Skill = {
  skillId: string
  skillName: string
  skillDesc: string
}

export type Experience = {
  compName: string
  endedYear: number | null
  experienceId: string
  experienceName: string
  experienceDesc: string
  position: string
  startedYear: number
}

export type Education = {
  degree: string
  educationDesc: string | null
  educationId: string
  field: string | null
  grade: string | null
  graduatedYear: number | null
  schoolName: string
  startedYear: number
}
