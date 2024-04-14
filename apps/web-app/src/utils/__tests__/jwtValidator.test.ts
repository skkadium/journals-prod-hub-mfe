import { cleanup } from '@testing-library/react'
import {
  JOURNAL_MANAGER_JWT,
  JOURNAL_MANAGER_JWT_ENC,
  NON_JOURNAL_MANAGER_JWT,
  NON_JOURNAL_MANAGER_JWT_ENC
} from '../jwt'
import { clearTimer, triggerTimer, validateRolesAndUpdateLocalStorage } from '../jwtValidator'
import { config } from '@repo/app-config'

describe('utils/jwtValidator', () => {
  afterEach(cleanup)
  it('should validate valid jwt token and update local storage', () => {
    // Arrange
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')

    // Act
    const { authorised, decodeJwt } = validateRolesAndUpdateLocalStorage(JOURNAL_MANAGER_JWT_ENC)

    // Assert
    expect(authorised).toBe(true)
    expect(decodeJwt).toEqual(JOURNAL_MANAGER_JWT)
    expect(window.localStorage.setItem).toHaveBeenCalledWith('ppeJwt', JOURNAL_MANAGER_JWT_ENC)
  })

  it('should validate invalid jwt token and remove local storage', () => {
    // Arrange
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'removeItem')

    // Act
    const { authorised, decodeJwt } = validateRolesAndUpdateLocalStorage(NON_JOURNAL_MANAGER_JWT_ENC)

    // Assert
    expect(authorised).toBe(false)
    expect(decodeJwt).toEqual(NON_JOURNAL_MANAGER_JWT)
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('ppeJwt')
  })

  it('should clear the timer', () => {
    // Arrange
    jest.spyOn(global, 'clearTimeout')

    // Act
    clearTimer(2000)

    // Assert
    expect(global.clearTimeout).toHaveBeenCalledWith(2000)
  })

  it('should trigger the timer', () => {
    // Arrange
    jest.spyOn(global, 'clearTimeout')
    jest.useFakeTimers({ legacyFakeTimers: true })

    // Act
    triggerTimer(3000)

    // Assert
    expect(global.clearTimeout).toHaveBeenCalledWith(3000)
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), config.auth.interval)
  })
})
