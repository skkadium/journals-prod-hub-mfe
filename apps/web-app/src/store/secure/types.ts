/**
 * Jwt timeout type
 */

export type JwtTimeout = NodeJS.Timeout | number | undefined

/**
 * Represents the state of a secure system.
 */
export interface SecureState {
  working: boolean // Indicates whether the system is currently working.
  secureState: string // The secure state of the system.
  jwtTimeout: JwtTimeout // The timeout for the JSON Web Token (JWT).
}

/**
 * The initial state of the secure system.
 */
export const initialState: SecureState = {
  working: true,
  secureState: null!,
  jwtTimeout: undefined
}
