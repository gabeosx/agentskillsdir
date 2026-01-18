import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { expect, test, vi, beforeEach } from 'vitest'
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
  
  // Wait for skills to load (ensuring component is rendered)
  await waitFor(() => {
    expect(screen.getByText('Weather Assistant')).toBeInTheDocument()
  })

  const skxLink = screen.getByRole('link', { name: /Manage skills with skx/i })
  expect(skxLink).toBeInTheDocument()
  expect(skxLink).toHaveAttribute('href', 'https://github.com/gabeosx/skx')
})
