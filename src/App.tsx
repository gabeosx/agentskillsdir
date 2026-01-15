import { useState, useEffect } from 'react';
import { X, Github, Star } from 'lucide-react';
import { SkillsListSchema } from './schemas/skill';
import type { Skill } from './schemas/skill';
import { filterSkills } from './utils/search';
import { fetchGitHubStars } from './utils/github';

function App() {
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [stars, setStars] = useState<number | null>(null);

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

  useEffect(() => {
    if (!selectedSkill?.githubRepoUrl) {
      setStars(null);
      return;
    }

    const loadStars = async () => {
      const count = await fetchGitHubStars(selectedSkill.githubRepoUrl);
      setStars(count);
    };

    loadStars();
  }, [selectedSkill]);

  const filteredSkills = filterSkills(allSkills, searchQuery);

  const handleCloseModal = () => {
    setSelectedSkill(null);
    setStars(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-mono selection:bg-white/20 crt-flicker">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 outline-none">
        SKIP_TO_CONTENT
      </a>
      <div className="scanlines"></div>
      
      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10" id="main-content">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <pre className="text-[10px] md:text-xs leading-none text-white/40 mb-4 hidden sm:block">
{`   _____   _____  ______ _   _ _______    _____ _  _______ _      _       _____ 
  / ____| / ____||  ____| \\ | |__   __|  / ____| |/ /_   _| |    | |     / ____|
 | |  __ | (___  | |__  |  \\| |  | |    | (___ | ' /  | | | |    | |    | (___  
 | | |_ | \\___ \\ |  __| | . \` |  | |     \\___ \\|  <   | | | |    | |     \\___ \\ 
 | |__| | ____) || |____| |\\  |  | |     ____) | . \\ _| |_| |____| |____ ____) |
  \\_____||_____/ |______|_| \\_|  |_|    |_____/|_|\\_\\_____|______|______|_____/ `}
          </pre>
          <div className="inline-flex items-center px-3 py-1 rounded-none border border-white/10 bg-white/5 text-xs font-medium text-white/70 uppercase tracking-widest">
            &gt; Agent Skills Standard _
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic">
            Skills Directory
          </h1>
          <p className="text-sm md:text-base text-[#a1a1a1] max-w-2xl font-mono">
            [SYSTEM]: DISCOVER, SHARE, AND INTEGRATE LLM EXTENSIONS.
            <br />
            [STATUS]: OPERATIONAL // VERSION: 1.0.0
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-20 group">
          <div className="relative flex items-center bg-black border border-white/20 rounded-none px-4 py-4 shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all focus-within:border-white/50 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span className="text-white/50 mr-3 font-mono">$</span>
            <input 
              type="text" 
              placeholder="SEARCH_SKILLS --QUERY" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-base text-white placeholder-white/20 focus:outline-none uppercase tracking-wider"
            />
            <div className="hidden sm:flex items-center space-x-1 text-[10px] text-white/30 font-mono border border-white/10 px-1.5 py-0.5">
              <span>CTRL</span>
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        {error ? (
             <div className="flex flex-col items-center justify-center py-20 text-red-500 border border-red-500/20 bg-red-500/5">
                <p className="text-xl font-bold mb-2 uppercase">[ERROR]</p>
                <p className="font-mono text-sm opacity-80">{error}</p>
             </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-1 bg-white/10 relative overflow-hidden">
               <div className="absolute inset-0 bg-white/40 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
            </div>
            <p className="text-xs text-white/40 animate-pulse font-mono uppercase tracking-widest text-center">
              ACCESSING_REGISTRY...<br/>
              DECRYPTING_METADATA...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
            {filteredSkills.map((skill, index) => (
              <button 
                key={index} 
                type="button"
                onClick={() => setSelectedSkill(skill)}
                className="w-full text-left group relative bg-transparent border-r border-b border-white/10 p-6 hover:bg-white/5 transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-8 h-8 border border-white/10 flex items-center justify-center text-lg">
                      {skill.name.includes('Weather') ? 'W' : 'S'}
                    </div>
                    <div className="text-[10px] text-white/30 font-mono">ID: {index.toString().padStart(3, '0')}</div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 uppercase tracking-tight group-hover:translate-x-1 transition-transform">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-2 mb-6 h-8 leading-relaxed uppercase tracking-tighter">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags?.map(tag => (
                      <span key={tag} className="text-[8px] uppercase tracking-[0.2em] font-black text-white/20 border border-white/5 px-1.5 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
            {filteredSkills.length === 0 && (
              <div className="col-span-full text-center py-20 text-[#525252]">
                No skills found matching your search.
              </div>
            )}
          </div>
        )}
        
        {/* Modal */}
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseModal}></div>
            <div className="relative w-full max-w-2xl bg-black border border-white/20 rounded-none shadow-[0_0_50px_rgba(255,255,255,0.1)] p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <button 
                onClick={handleCloseModal}
                aria-label="Close modal"
                className="absolute top-4 right-4 p-2 text-white/30 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              >
                [ESC] <X className="w-4 h-4 inline-block ml-1" />
              </button>

              <div className="flex flex-col space-y-8">
                <div className="flex items-start justify-between border-b border-white/10 pb-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 border border-white/20 flex items-center justify-center text-4xl bg-white/5">
                      {selectedSkill.name.includes('Weather') ? 'W' : 'S'}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter italic">{selectedSkill.name}</h2>
                      <div className="flex items-center space-x-3 text-xs text-white/40 font-mono">
                        {selectedSkill.author && (
                          <span className="flex items-center tracking-widest">
                            AUTHOR: {selectedSkill.author.toUpperCase()}
                          </span>
                        )}
                        <span>//</span>
                        <span className="tracking-widest">VERSION: 1.0.0</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="text-white/70 leading-relaxed text-base uppercase tracking-tight">
                    <div className="text-[10px] text-white/20 mb-2 tracking-[0.3em] font-black">DOCUMENTATION.DESCRIPTION</div>
                    {selectedSkill.description}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.tags?.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-white/40 bg-white/5 border border-white/10 px-3 py-1.5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                  <a 
                    href={selectedSkill.githubRepoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#ccc] transition-colors"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    OPEN_REPOSITORY
                  </a>
                  
                  {typeof stars === 'number' && (
                    <div className="flex flex-col items-end">
                      <div className="text-[9px] text-white/20 mb-1 tracking-[0.2em] font-black">REPO_STARS</div>
                      <div className="flex items-center text-white/60 font-mono text-sm border border-white/10 px-4 py-2 bg-white/5">
                        <Star className="w-4 h-4 text-white/40 mr-2" />
                        {stars.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App