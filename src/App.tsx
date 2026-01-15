function App() {
  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono p-8">
      <header className="mb-8 border-b border-terminal-border pb-4">
        <h1 className="text-4xl font-bold text-terminal-green">
          &gt; Agent Skills Directory<span className="animate-pulse">_</span>
        </h1>
        <p className="mt-2 text-terminal-amber opacity-80">
          The open standard for LLM extensions.
        </p>
      </header>
      
      <main>
        <section className="border border-terminal-border p-6 bg-black/20">
          <p className="text-sm mb-4">
            [SYSTEM]: Initializing searchable directory...
          </p>
          <div className="flex gap-2">
            <span className="text-terminal-green">$</span>
            <input 
              type="text" 
              placeholder="search skills..." 
              className="bg-transparent border-none outline-none flex-1 text-terminal-text placeholder:text-terminal-text/30"
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App