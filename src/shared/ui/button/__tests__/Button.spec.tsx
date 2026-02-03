import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Button from '../Button'

describe('Button', () => {
  it('renders the button', () => {
    render(<Button label="test button" />)

    const button = screen.getByRole('button')
    expect(button).toBeDefined()

    const label = screen.getByText('test button')
    expect(label).toBeDefined()
    expect(label.textContent).toBe('test button')
  })
})
