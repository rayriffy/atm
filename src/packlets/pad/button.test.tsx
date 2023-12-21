import { render, act } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'

import { PadButton } from './button'
import { ButtonValue } from './constants'

const { usePadLockAtomSpy } = vi.hoisted(() => ({
  usePadLockAtomSpy: vi.fn(),
}))
vi.mock('$context/padLockAtom', () => ({
  usePadLockAtom: usePadLockAtomSpy,
}))

describe('<PadButton />', () => {
  it('should match snapshot', () => {
    const { container } = render(<PadButton value={ButtonValue.Zero} />)
    expect(container).toMatchSnapshot()
  })

  it('should be able to click a button', () => {
    const onClickSpy = vi.fn()
    const { getByRole } = render(
      <PadButton value={ButtonValue.Zero} onClick={onClickSpy} />
    )

    expect(onClickSpy).not.toBeCalled()

    act(() => {
      getByRole('button').click()
    })

    expect(onClickSpy).toBeCalledTimes(1)
  })

  it('should disable the button when lock is true', () => {
    usePadLockAtomSpy.mockReturnValue(true)

    const { getByRole } = render(<PadButton value={ButtonValue.Zero} />)

    expect(getByRole('button').attributes).toHaveProperty('disabled')
  })
})
