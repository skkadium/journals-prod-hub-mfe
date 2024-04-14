import { act, cleanup, renderHook } from '@testing-library/react'
import useUserStore, { setActiveUsername, setFeatureToggles, setUserLogout, setUserRoles } from '../userStore'

describe('store/secure/userStore', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: { current: any }
  beforeEach(() => {
    result = renderHook(() => useUserStore()).result
  })
  afterEach(cleanup)
  it('should fetch initial user state', () => {
    // Assert
    const { username, isLoggedOut, roles, featureToggles } = result.current

    expect(username).toBe('')
    expect(isLoggedOut).toBe(false)
    expect(roles.length).toBe(0)
    expect(featureToggles.length).toBe(0)
  })

  it('should update username property', () => {
    // Arrange
    const userName = 'HolmesS'

    expect(result.current.username).toBe('')

    // Act
    act(() => setActiveUsername(userName))

    // Assert
    expect(result.current.username).toBe(userName)
  })

  it('should update isLoggedOut property', () => {
    expect(result.current.isLoggedOut).toBe(false)

    // Act
    act(() => setUserLogout(true))

    // Assert
    expect(result.current.isLoggedOut).toBe(true)
  })

  it('should update user roles property', () => {
    expect(result.current.roles.length).toBe(0)

    // Act
    act(() => setUserRoles(['role1']))

    // Assert
    expect(result.current.roles.length).toBe(1)
    expect(result.current.roles.at(0)).toBe('role1')
  })

  it('should update featureToggles property', () => {
    expect(result.current.featureToggles.length).toBe(0)

    // Act
    act(() => setFeatureToggles(['ft1']))

    // Assert
    expect(result.current.featureToggles.length).toBe(1)
    expect(result.current.featureToggles.at(0)).toBe('ft1')
  })
})
