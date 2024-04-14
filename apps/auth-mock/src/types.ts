export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  jwt?: string
  errorType?: string
}

export const secret = 'shhhhhhhh'
export const jwtRegEx = /^[bB]earer\s+([-\w-]+.[-\w]+.[-\w]+)$/
export const userWithoutRole = 'wrong-role'
