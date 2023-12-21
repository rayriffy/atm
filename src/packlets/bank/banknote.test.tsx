import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Banknote } from './banknote'
import { Note } from './constants'

describe('<Banknote />', () => {
  it.each(Object.values(Note))('should match snapshot (note = %s)', note => {
    const { container } = render(<Banknote type={note} />)
    expect(container).toMatchSnapshot()
  })
})
