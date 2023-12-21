import { render } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'

import { Inventory } from './inventory'

const useUserInventoryAtomSpy = vi.hoisted(() =>
  vi.fn(() => ({
    '5': 0,
    '10': 0,
    '20': 0,
  }))
)
vi.mock('$context/userInventoryAtom', () => ({
  useUserInventoryAtom: useUserInventoryAtomSpy,
}))

describe('<Input />', () => {
  it('should render inventory', () => {
    const { container } = render(<Inventory />)

    expect(container).toMatchSnapshot()
  })
})
