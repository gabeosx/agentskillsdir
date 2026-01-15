import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { SkillsListSchema } from './schemas/skill';
import type { Skill } from './schemas/skill';
import { filterSkills } from './utils/search';

function App() {
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSkills() {
      try {
        const response = await fetch('/skills.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const validatedSkills = SkillsListSchema.parse(data);
        setAllSkills(validatedSkills);
      } catch (error) {
        console.error('Failed to load skills:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }
    loadSkills();
  }, []);

  const filteredSkills = filterSkills(allSkills, searchQuery);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans selection:bg-white/20">
      <div className="max-w-5xl mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/70">
            Agent Skills Standard
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
            Agent Skills Directory
          </h1>
          <p className="text-lg text-[#a1a1a1] max-w-2xl">
            The open standard for LLM extensions. Discover, share, and integrate skills for your AI agents.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-20 group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          <div className="relative flex items-center bg-[#151515] border border-white/10 rounded-xl px-4 py-4 shadow-2xl transition-all focus-within:border-white/20">
            <Search className="w-5 h-5 text-[#a1a1a1] mr-3" />
            <input 
              type="text" 
              placeholder="Search for skills..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-lg text-white placeholder-[#525252] focus:outline-none"
            />
            <div className="hidden sm:flex items-center space-x-1 text-xs text-[#525252] font-mono border border-white/5 rounded px-1.5 py-0.5">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        {error ? (
             <div className="flex flex-col items-center justify-center py-20 text-red-500">
                <p className="text-xl font-bold mb-2">Error loading skills</p>
                <p className="font-mono text-sm opacity-80">{error}</p>
             </div>
        ) : isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-white/10 border-t-white/40 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill, index) => (
              <div 
                key={index} 
                className="group relative bg-[#111] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all hover:bg-[#161616]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
                    {skill.name.includes('Weather') ? '🌤️' : '⚡️'}
                  </div>
                  <div className="text-xs text-[#525252] font-mono">v1.0.0</div>
                </div>
                <h3 className="text-lg font-medium text-[#ededed] mb-2 group-hover:text-white transition-colors">
                  {skill.name}
                </h3>
                <p className="text-sm text-[#a1a1a1] line-clamp-2 mb-4">
                  {skill.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.tags?.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-[#525252] border border-white/5 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {filteredSkills.length === 0 && (
              <div className="col-span-full text-center py-20 text-[#525252]">
                No skills found matching your search.
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  )
}

export default App
