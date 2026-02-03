import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Button from '../DefaultButton'

describe('Button', () => {
  it('renders the button', () => {
    render(<Button text="text" />)

    const button = screen.getByRole('button')
    expect(button).toBeDefined()

    const label = screen.getByText('text')
    expect(label).toBeDefined()
    expect(label.textContent).toBe('text')
  })
})
