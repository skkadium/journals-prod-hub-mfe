import { act, cleanup, renderHook } from '@testing-library/react'
import usePersonStore, { setPersons } from '../personStore'
import { mockedPersonDetails } from '../../../jest/jest.setup.unit'
describe('store/person/personStore', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: { current: any }
  beforeEach(() => {
    result = renderHook(() => usePersonStore()).result
  })
  afterEach(cleanup)

  it('should fetch initial person details state', () => {
    // Assert
    expect(result.current).toMatchSnapshot()
  })

  it('should update persons property', () => {
    expect(result.current.persons.length).toBe(0)

    // Act
    act(() => setPersons(mockedPersonDetails))

    // Assert
    expect(result.current.persons).toEqual(mockedPersonDetails)
  })
})
