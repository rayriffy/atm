import { vi, describe, it, expect, beforeEach } from 'vitest'

import { handlePad } from './handlePad'

import { ButtonValue } from '$pad/constants'

const { getSpy, setSpy } = vi.hoisted(() => ({
  getSpy: vi.fn(),
  setSpy: vi.fn(),
}))
vi.mock('$context/pinAtom', () => ({
  pinAtom: {
    get: getSpy,
    set: setSpy,
  },
}))

describe('handlePad()', () => {
  beforeEach(() => {
    getSpy.mockReturnValue('')
    vi.clearAllMocks()
  })

  it('should attempt to add new character to pinAtom when called', () => {
    handlePad(ButtonValue.Zero)

    expect(setSpy).toBeCalledTimes(1)
    expect(setSpy).toHaveBeenCalledWith('0')
  })

  it('should attmpt to delete a character when DEL is called', () => {
    getSpy.mockReturnValue('ABCD12')
    handlePad(ButtonValue.Del)

    expect(setSpy).toBeCalledTimes(1)
    expect(setSpy).toHaveBeenCalledWith('ABCD1')

    getSpy.mockReturnValue('')
    handlePad(ButtonValue.Del)

    expect(setSpy).toHaveBeenCalledWith('')
  })
})
