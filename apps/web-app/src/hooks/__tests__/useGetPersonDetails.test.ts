import { useQuery } from '@tanstack/react-query'
import usePersonStore from '../../store/person/personStore'
import { renderHook } from '@testing-library/react'
import useGetPersonDetails from '../useGetPersonDetails'
import { createWrapper, mockedPersonDetails } from '../../jest/jest.setup.unit'

jest.mock('@tanstack/react-query')
const useQueryMock = useQuery as jest.Mock

describe('hooks/useGetPersonDetails', () => {
  const initialPersonState = usePersonStore.getState()
  beforeEach(() => {
    usePersonStore.setState(initialPersonState, true)
  })

  it('should load empty person details', () => {
    // Arrange
    useQueryMock.mockReturnValue({ isSuccess: true, data: { persons: [] } })

    // Assert
    expect(initialPersonState.persons).toEqual([])

    // Act
    renderHook(() => useGetPersonDetails(), { wrapper: createWrapper() })

    // Assert
    const updatedPersonStore = usePersonStore.getState()
    expect(updatedPersonStore.persons).toEqual([])
  })

  it('should fully load person details', () => {
    // Arrange
    useQueryMock.mockReturnValue({ isSuccess: true, data: { persons: mockedPersonDetails } })

    // Assert
    expect(initialPersonState.persons).toEqual([])

    // Act
    renderHook(() => useGetPersonDetails(), { wrapper: createWrapper() })

    // Assert
    const updatedPersonStore = usePersonStore.getState()
    expect(updatedPersonStore.persons).toEqual(mockedPersonDetails)
  })
})
