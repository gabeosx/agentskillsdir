import { render, screen } from '@testing-library/react'
import App from './App'
import { expect, test } from 'vitest'

test('renders the application title and search', () => {
  render(<App />)
  const titleElement = screen.getByText(/Agent Skills Directory/i)
  expect(titleElement).toBeInTheDocument()
  
  const searchInput = screen.getByPlaceholderText(/Search for skills.../i)
  expect(searchInput).toBeInTheDocument()
})