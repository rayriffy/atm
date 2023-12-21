import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Overdrawn } from './overdrawn'

const { useBalanceAtomSpy } = vi.hoisted(() => ({
  useBalanceAtomSpy: vi.fn().mockReturnValue(0),
}))

vi.mock('$context/balanceAtom', () => ({
  useBalanceAtom: useBalanceAtomSpy,
}))

describe('decodeError', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render nothing if balance healty', () => {
    useBalanceAtomSpy.mockReturnValue(0)

    const { container } = render(<Overdrawn />)

    expect(container.firstChild).toBeNull()
    expect(container).toMatchSnapshot()
  })

  it('should render overdrawn badge if balance goes into minus', () => {
    useBalanceAtomSpy.mockReturnValue(-1)

    const { container, getByText } = render(<Overdrawn />)

    expect(getByText('Account overdrawn')).toBeDefined()

    expect(container).toMatchSnapshot()
  })
})
