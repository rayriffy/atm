import { renderHook } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect } from 'vitest'

import { useAuth } from './useAuth'

const { navigateSpy, useAuthenticatedAtomSpy } = vi.hoisted(() => ({
  useAuthenticatedAtomSpy: vi.fn(),
  navigateSpy: vi.fn(),
}))
vi.mock('$context/authenticatedAtom', () => ({
  useAuthenticatedAtom: useAuthenticatedAtomSpy,
}))
vi.mock('$router', () => ({
  useNavigate: vi.fn(() => navigateSpy),
}))

describe('useAuth()', () => {
  beforeEach(() => {
    useAuthenticatedAtomSpy.mockReturnValue(false)
    vi.clearAllMocks()
  })

  describe('auth page', () => {
    it('should no nothing if user not authenticated', () => {
      renderHook(() => useAuth('auth'))

      expect(navigateSpy).not.toBeCalled()
    })

    it('should redirect to app page when authenticated', () => {
      useAuthenticatedAtomSpy.mockReturnValue(true)
      renderHook(() => useAuth('auth'))

      expect(navigateSpy).toBeCalledTimes(1)
      expect(navigateSpy).toBeCalledWith('/atm/app')
    })
  })

  describe('app page', () => {
    it('should no nothing if user is authenticated', () => {
      useAuthenticatedAtomSpy.mockReturnValue(true)
      renderHook(() => useAuth('app'))

      expect(navigateSpy).not.toBeCalled()
    })

    it('should redirect to auth page when not authenticated', () => {
      renderHook(() => useAuth('app'))

      expect(navigateSpy).toBeCalledTimes(1)
      expect(navigateSpy).toBeCalledWith('/atm')
    })
  })
})
