import { Person } from '../../components/person/types'
import { PersonState, initialPersonState } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

const usePersonStore = createWithEqualityFn<PersonState>(() => ({
  ...initialPersonState
}))

export const setPersons = (personDetails: Person[]) => usePersonStore.setState({ persons: personDetails })

export default usePersonStore
