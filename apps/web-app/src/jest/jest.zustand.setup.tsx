import { StateCreator } from 'zustand'
import { act } from '@testing-library/react'
const actualCreate = jest.requireActual('zustand')

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set<() => void>()

// when creating a store, we get its initial state, create a reset function and add it in the set
const create =
  () =>
  <S,>(createState: StateCreator<S>) => {
    const store = actualCreate(createState)
    const initialState = store.getState()
    storeResetFns.add(() => {
      store.setState(initialState, true)
    })
    return store
  }

// Reset all stores after each test run
beforeEach(async () => {
  act(() =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storeResetFns.forEach((resetFn: any) => {
      resetFn()
    })
  )
})

export default create
