import { vi, describe, it, expect, beforeEach } from 'vitest'

import { handlePad } from './handlePad'

import { ButtonValue } from '$pad/constants'

const pinAtomSpy = vi.hoisted(() => ({
  get: vi.fn(),
  set: vi.fn(),
}))
vi.mock('$context/pinAtom', () => ({
  pinAtom: pinAtomSpy,
}))

describe('handlePad()', () => {
  beforeEach(() => {
    pinAtomSpy.get.mockReturnValue('')
    vi.clearAllMocks()
  })

  it('should attempt to add new character to pinAtom when called', () => {
    handlePad(ButtonValue.Zero)

    expect(pinAtomSpy.set).toBeCalledTimes(1)
    expect(pinAtomSpy.set).toHaveBeenCalledWith('0')
  })

  it('should attmpt to delete a character when DEL is called', () => {
    pinAtomSpy.get.mockReturnValue('ABCD12')
    handlePad(ButtonValue.Del)

    expect(pinAtomSpy.set).toBeCalledTimes(1)
    expect(pinAtomSpy.set).toHaveBeenCalledWith('ABCD1')

    pinAtomSpy.get.mockReturnValue('')
    handlePad(ButtonValue.Del)

    expect(pinAtomSpy.set).toHaveBeenCalledWith('')
  })
})
