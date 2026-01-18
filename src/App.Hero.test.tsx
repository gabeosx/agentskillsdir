import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { expect, test, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

const mockSkills = [
  {
    name: 'Weather Assistant',
    packageName: 'weather-assistant',
    description: 'Provides weather updates.',
    githubRepoUrl: 'https://github.com/example/weather',
    tags: ['utility'],
    author: 'Sky'
  }
]

vi.stubGlobal('fetch', vi.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve(mockSkills),
    ok: true,
    status: 200,
  })
));

test('renders skx promotion link in hero section', async () => {
  render(<MemoryRouter><App /></MemoryRouter>)
  
  // Wait for skills to load
  await waitFor(() => {
    expect(screen.getByText('Weather Assistant')).toBeInTheDocument()
  })

  // Check for the new copy
  const cta = screen.getByText(/Easily manage your agent skills with/i)
  expect(cta).toBeInTheDocument()

  // Check for the link
  const link = cta.closest('a')
  expect(link).toHaveAttribute('href', 'https://github.com/gabeosx/skx')
  
  // Check for the typing animation container/text
  // We expect "skx install" to be part of the animation
  expect(screen.getByText(/skx install/i)).toBeInTheDocument()
})
