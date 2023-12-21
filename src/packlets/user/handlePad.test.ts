import { vi, describe, it, expect, beforeEach } from 'vitest'

import { handlePad } from './handlePad'

import { ButtonValue } from '$pad/constants'

const withdrawAtomSpy = vi.hoisted(() => ({
  get: vi.fn(),
  set: vi.fn(),
}))
vi.mock('$context/withdrawAtom', () => ({
  withdrawAtom: withdrawAtomSpy,
}))

describe('handlePad()', () => {
  beforeEach(() => {
    withdrawAtomSpy.get.mockReturnValue('')
    vi.clearAllMocks()
  })

  it('should attempt to add new character to withdrawAtom when called', () => {
    handlePad(ButtonValue.Zero)

    expect(withdrawAtomSpy.set).toBeCalledTimes(1)
    expect(withdrawAtomSpy.set).toHaveBeenCalledWith('0')
  })

  it('should attmpt to delete a character when DEL is called', () => {
    withdrawAtomSpy.get.mockReturnValue('ABCD12')
    handlePad(ButtonValue.Del)

    expect(withdrawAtomSpy.set).toBeCalledTimes(1)
    expect(withdrawAtomSpy.set).toHaveBeenCalledWith('ABCD1')

    withdrawAtomSpy.get.mockReturnValue('')
    handlePad(ButtonValue.Del)

    expect(withdrawAtomSpy.set).toHaveBeenCalledWith('')
  })
})
