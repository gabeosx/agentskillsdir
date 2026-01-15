import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import { expect, test, vi } from 'vitest'

const mockSkills = [
  {
    name: 'Weather Assistant',
    description: 'Provides weather updates.',
    githubRepoUrl: 'https://github.com/example/weather',
    tags: ['utility'],
    author: 'Sky'
  },
  {
    name: 'Conductor Agent',
    description: 'Project management tool.',
    githubRepoUrl: 'https://github.com/example/conductor',
    tags: ['productivity'],
    author: 'Team'
  }
]

// Mock fetch
vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockSkills),
    ok: true,
    status: 200,
  })
));

test('renders title and filters skills', async () => {
  render(<App />)
  
  // Wait for skills to load
  await waitFor(() => {
    expect(screen.getByText('Weather Assistant')).toBeInTheDocument()
  })
  expect(screen.getByText('Conductor Agent')).toBeInTheDocument()

  const searchInput = screen.getByPlaceholderText(/Search for skills.../i)
  
  // Search for "Weather"
  fireEvent.change(searchInput, { target: { value: 'Weather' } })
  
  expect(screen.getByText('Weather Assistant')).toBeInTheDocument()
  expect(screen.getByText('utility')).toBeInTheDocument()
  expect(screen.queryByText('Conductor Agent')).not.toBeInTheDocument()
  
  // Search for something that doesn't exist
  fireEvent.change(searchInput, { target: { value: 'Nonexistent' } })
  expect(screen.getByText(/No skills found/i)).toBeInTheDocument()
})
