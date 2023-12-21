import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { usePinInput } from './usePinInput'

const fetchSpy = vi.fn()
global.fetch = fetchSpy

const { usePinAtomSpy, setPinAtomSpy } = vi.hoisted(() => ({
  usePinAtomSpy: vi.fn(),
  setPinAtomSpy: vi.fn(),
}))
vi.mock('$context/pinAtom', () => ({
  usePinAtom: usePinAtomSpy,
  pinAtom: {
    set: setPinAtomSpy,
  },
}))

const { setAuthenticatedAtomSpy } = vi.hoisted(() => ({
  setAuthenticatedAtomSpy: vi.fn(),
}))
vi.mock('$context/authenticatedAtom', () => ({
  authenticatedAtom: {
    set: setAuthenticatedAtomSpy,
  },
}))

const { setBalanceAtomSpy } = vi.hoisted(() => ({
  setBalanceAtomSpy: vi.fn(),
}))
vi.mock('$context/balanceAtom', () => ({
  balanceAtom: {
    set: setBalanceAtomSpy,
  },
}))

describe('usePinInput()', () => {
  beforeEach(() => {
    usePinAtomSpy.mockReturnValue('')
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  it('should update the pinAtom state when calling setPin', () => {
    const { result } = renderHook(() => usePinInput())
    const { setPin } = result.current

    act(() => {
      setPin('1234')
    })

    expect(setPinAtomSpy).toBeCalledTimes(1)
    expect(setPinAtomSpy).toBeCalledWith('1234')
  })

  it('should update the authenticatedAtom state when calling setAuthenticated', async () => {
    const { result, rerender } = renderHook(() => usePinInput())

    expect(result.current.loading).toBe(false)
    expect(fetchSpy).not.toBeCalled()

    usePinAtomSpy.mockReturnValue('1234')
    fetchSpy.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({ currentBalance: 1000 }),
    })

    rerender()

    expect(result.current.loading).toBe(true)
    expect(fetchSpy).toBeCalledTimes(1)
    expect(fetchSpy).toBeCalledWith(
      'https://frontend-challenge.screencloud-michael.now.sh/api/pin',
      {
        method: 'POST',
        body: JSON.stringify({ pin: '1234' }),
        headers: expect.anything(),
      }
    )

    expect(setAuthenticatedAtomSpy).not.toBeCalled()
    expect(setBalanceAtomSpy).not.toBeCalled()
  })
})
