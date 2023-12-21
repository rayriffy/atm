import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Balance } from './balance'

const useBalanceAtomSpy = vi.hoisted(() => vi.fn())
vi.mock('$context/balanceAtom', () => ({
  useBalanceAtom: useBalanceAtomSpy,
}))

describe('<Balance />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render balance', () => {
    useBalanceAtomSpy.mockReturnValue(123)
    const { getByText } = render(<Balance />)

    expect(getByText('Balance')).toBeDefined()
    expect(getByText('£123')).toBeDefined()
  })

  it('should render render comma (,) in balance', () => {
    useBalanceAtomSpy.mockReturnValue(123456)
    const { getByText } = render(<Balance />)

    expect(getByText('Balance')).toBeDefined()
    expect(getByText('£123,456')).toBeDefined()
  })
})
