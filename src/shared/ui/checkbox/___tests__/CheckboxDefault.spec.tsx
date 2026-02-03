import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CheckboxDefault from '../CheckboxDefault'

describe('CheckboxDefault', () => {
  it('renders the checkbox', () => {
    render(<CheckboxDefault  content='text' isActive={false} onClick={() => ({})} />)
    const label = screen.getByText('text')
    expect(label).toBeDefined()
    expect(label.textContent).toBe('text')
  })
})