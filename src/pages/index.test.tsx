import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import Page from '.'

const { navigateSpy } = vi.hoisted(() => ({
  navigateSpy: vi.fn(),
}))

vi.mock('$router', () => ({
  useNavigate: vi.fn(() => navigateSpy),
}))

describe('<Page />', () => {
  it('should navigate to /atm', () => {
    render(<Page />)

    expect(navigateSpy).toHaveBeenCalledWith('/atm')
  })
})
