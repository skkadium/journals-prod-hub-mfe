import { act, cleanup, renderHook } from '@testing-library/react'
import useSecureStore, { setJwtExpirationTimeout, setSecureState, toggleWorking } from '../secureStore'
import { SecureStates } from '../../../constants'

describe('store/secure/secureStore', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: { current: any }
  beforeEach(() => {
    result = renderHook(() => useSecureStore()).result
  })
  afterEach(cleanup)
  it('should fetch initial secure state', () => {
    // Assert
    const { secureState, jwtTimeout, working } = result.current

    expect(secureState).toBe(null)
    expect(jwtTimeout).toBe(undefined)
    expect(working).toBe(true)
  })

  it('should record secureState to desired state', () => {
    expect(result.current.secureState).toBe(null)

    // Act
    act(() => setSecureState(SecureStates.AUTHENTICATED))

    // Assert
    expect(result.current.secureState).toBe(SecureStates.AUTHENTICATED)
  })

  it('should set working data', () => {
    expect(result.current.working).toBe(true)

    // Act
    act(() => toggleWorking(false))

    // Assert
    expect(result.current.working).toBe(false)
  })

  it('should set jwtTimeout to specific interval', () => {
    expect(result.current.jwtTimeout).toBe(undefined)

    // Act
    act(() => setJwtExpirationTimeout(1000))

    // Assert
    expect(result.current.jwtTimeout).toBe(1000)
  })
})
