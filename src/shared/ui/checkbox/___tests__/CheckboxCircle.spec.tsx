import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CheckboxCircle from '../CheckboxCircle'

describe('CheckboxCircle', () => {
  it('renders the checkbox', () => {
    render(<CheckboxCircle content='text' isActive={false} />)
    const label = screen.getByText('text')
    expect(label).toBeDefined()
    expect(label.textContent).toBe('text')
  })
})