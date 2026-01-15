import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
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
vi.stubGlobal('fetch', vi.fn((url: string | URL | Request) => {
  const urlStr = url.toString();
  
  if (urlStr.includes('api.github.com')) {
    return Promise.resolve({
      json: () => Promise.resolve({ stargazers_count: 999 }),
      ok: true,
      status: 200,
    });
  }

  // Default to returning skills for any other request (likely /skills.json)
  return Promise.resolve({
    json: () => Promise.resolve(mockSkills),
    ok: true,
    status: 200,
  });
}));

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

test('clicking a skill card opens the detail modal with correct info', async () => {
  render(<App />)

  await waitFor(() => {
    expect(screen.getByText('Weather Assistant')).toBeInTheDocument()
  })

  // Click the card
  fireEvent.click(screen.getByText('Weather Assistant'))

  // Expect modal
  await waitFor(() => {
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeVisible()
    
    // Check content within modal
    expect(within(dialog).getByText('Weather Assistant')).toBeInTheDocument()
    expect(within(dialog).getByText('Provides weather updates.')).toBeInTheDocument()
    expect(within(dialog).getByText('By Sky')).toBeInTheDocument()
    expect(within(dialog).getByText(/999 stars/)).toBeInTheDocument()
  })
})

test('skill cards are accessible buttons', async () => {
  render(<App />)
  
  await waitFor(() => {
    expect(screen.getByText('Weather Assistant')).toBeInTheDocument()
  })

  // Should find buttons for the skills
  const buttons = screen.getAllByRole('button')
  // We expect at least the skill cards to be buttons.
  // Note: If there are other buttons (like "View on GitHub" inside modal), they aren't visible yet.
  // But wait, are there other buttons on the main page?
  // The search input is not a button.
  // The "Command+K" is a div.
  // So we expect 2 buttons for the 2 mock skills.
  expect(buttons.length).toBeGreaterThanOrEqual(2)
  expect(buttons[0]).toHaveTextContent(/Weather Assistant/i)
})