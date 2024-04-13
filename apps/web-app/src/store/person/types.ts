import { Person } from '../../components/person/types'

export interface PersonState {
  persons: Person[]
}

/**
 * The initial state of the person.
 */
export const initialPersonState: PersonState = {
  persons: []
}
