/**
 * Represents the state of a user.
 */
export interface UserState {
  username: string
  roles: string[]
  featureToggles: string[]
  isLoggedOut: boolean
}

/**
 * The initial state for the user.
 */
export const initialUserState: UserState = {
  username: '',
  roles: [],
  featureToggles: [],
  isLoggedOut: false
}
