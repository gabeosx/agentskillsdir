import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import App from './App'
import { expect, test, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

const mockSkills = [
  {
    name: 'Weather Assistant',
    packageName: 'weather-assistant',
    description: 'Provides weather updates.',
    githubRepoUrl: 'https://github.com/example/weather',
    tags: ['utility'],
    author: 'Sky'
  },
  {
    name: 'Conductor Agent',
    packageName: 'conductor-agent',
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
  render(<MemoryRouter><App /></MemoryRouter>)
  
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
  render(<MemoryRouter><App /></MemoryRouter>)

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

test('navigating to /skill/:packageName opens the skill modal', async () => {
  render(
    <MemoryRouter initialEntries={['/skill/weather-assistant']}>
      <App />
    </MemoryRouter>
  )

  await waitFor(() => {
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeVisible()
    expect(within(dialog).getByText('Weather Assistant')).toBeInTheDocument()
  })
})

test('skill cards are accessible buttons', async () => {
  render(<MemoryRouter><App /></MemoryRouter>)
  
  await waitFor(() => {
    expect(screen.getByText('Weather Assistant')).toBeInTheDocument()
  })

  // Should find buttons for the skills
  const buttons = screen.getAllByRole('button')
  // We expect at least the skill cards to be buttons.
  expect(buttons.length).toBeGreaterThanOrEqual(2)
  expect(buttons[0]).toHaveTextContent(/Weather Assistant/i)
})

test('can close the detail modal', async () => {
  render(<MemoryRouter><App /></MemoryRouter>)

  await waitFor(() => {
    expect(screen.getByText('Weather Assistant')).toBeInTheDocument()
  })

  fireEvent.click(screen.getByText('Weather Assistant'))

  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeVisible()
  })

  // Click the close button using its aria-label
  const closeButton = screen.getByRole('button', { name: /close modal/i })
  fireEvent.click(closeButton)

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

test('handles GitHub API errors gracefully', async () => {
  // Mock fetch to return error for github
  vi.stubGlobal('fetch', vi.fn((url: string | URL | Request) => {
    const urlStr = url.toString();
    if (urlStr.includes('api.github.com')) {
      return Promise.resolve({
        ok: false,
        status: 404,
      });
    }
    return Promise.resolve({
      json: () => Promise.resolve(mockSkills),
      ok: true,
      status: 200,
    });
  }));

  render(<MemoryRouter><App /></MemoryRouter>)

  await waitFor(() => {
    expect(screen.getByText('Weather Assistant')).toBeInTheDocument()
  })

  fireEvent.click(screen.getByText('Weather Assistant'))

  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeVisible()
    // Should NOT show stars if API fails
    expect(screen.queryByText(/stars/)).not.toBeInTheDocument()
  })
})

test('caches GitHub stars in localStorage', async () => {
  const fetchMock = vi.fn((url: string | URL | Request) => {
    const urlStr = url.toString();
    if (urlStr.includes('api.github.com')) {
      return Promise.resolve({
        json: () => Promise.resolve({ stargazers_count: 123 }),
        ok: true,
        status: 200,
      });
    }
    return Promise.resolve({
      json: () => Promise.resolve(mockSkills),
      ok: true,
      status: 200,
    });
  });
  vi.stubGlobal('fetch', fetchMock);

  render(<MemoryRouter><App /></MemoryRouter>)

  await waitFor(() => {
    expect(screen.getByText('Weather Assistant')).toBeInTheDocument()
  })

  // Open modal
  fireEvent.click(screen.getByText('Weather Assistant'))

  await waitFor(() => {
    expect(screen.getByText(/123 stars/)).toBeInTheDocument()
  })

  expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('api.github.com'))
  const firstCallCount = fetchMock.mock.calls.filter(call => call[0].toString().includes('api.github.com')).length

  // Close and reopen
  fireEvent.click(screen.getByRole('button', { name: /close modal/i }))
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  
  fireEvent.click(screen.getByText('Weather Assistant'))
  await waitFor(() => {
    expect(screen.getByText(/123 stars/)).toBeInTheDocument()
  })

  // Should NOT have fetched again
  const secondCallCount = fetchMock.mock.calls.filter(call => call[0].toString().includes('api.github.com')).length
  expect(secondCallCount).toBe(firstCallCount)
})

test('updates document title and meta description when skill is selected', async () => {
  // Helper to get meta description
  const getMetaDescription = () => {
    const meta = document.querySelector('meta[name="description"]');
    return meta ? meta.getAttribute('content') : null;
  };

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Initial state (assuming default is set in index.html, but Helmet might override or we check change)
  // Let's just check that it changes when we select a skill.

  await waitFor(() => {
    expect(screen.getByText('Weather Assistant')).toBeInTheDocument()
  })

  fireEvent.click(screen.getByText('Weather Assistant'))

  await waitFor(() => {
    expect(document.title).toBe('Weather Assistant | Agent Skills Directory');
    expect(getMetaDescription()).toBe('Provides weather updates.');
  })
  
  // Close modal
  fireEvent.click(screen.getByRole('button', { name: /close modal/i }))
  
  await waitFor(() => {
    expect(document.title).toBe('Agent Skills Directory');
    // We expect it to revert to default, whatever that is. 
    // For now let's assume it reverts to something generic or the previous state.
  })
})