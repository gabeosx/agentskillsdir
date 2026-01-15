import { render, screen } from '@testing-library/react'
import App from './App'
import { expect, test } from 'vitest'

test('renders the application title', () => {
  render(<App />)
  const titleElement = screen.getByText(/Agent Skills Directory/i)
  expect(titleElement).toBeInTheDocument()
})
