import { useState, useEffect, useMemo } from 'react';
import { Search, X, Github, Star, Terminal } from 'lucide-react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { SkillsListSchema } from './schemas/skill';
import type { Skill } from './schemas/skill';
import { filterSkills } from './utils/search';
import { fetchGitHubStars } from './utils/github';

function TypingEffect({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index >= words.length) {
      setIndex(0);
      return;
    }

    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, Math.random() * 350));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="font-mono text-white/90">
      {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </span>
  );
}

function SkillDirectory() {
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stars, setStars] = useState<number | null>(null);
  
  const navigate = useNavigate();
  const { packageName } = useParams();

  const examplePackages = useMemo(() => {
    // Get up to 5 random package names from skills, or defaults if empty
    if (allSkills.length === 0) return ['weather-assistant', 'conductor-agent', 'research-rabbit'];
    return allSkills.slice(0, 5).map(s => s.packageName);
  }, [allSkills]);

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

  const selectedSkill = useMemo(() => {
    if (!packageName || allSkills.length === 0) return null;
    return allSkills.find(s => s.packageName === packageName) || null;
  }, [packageName, allSkills]);

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
    navigate('/');
    setStars(null);
  };

  const handleOpenSkill = (skill: Skill) => {
    navigate(`/skill/${skill.packageName}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans selection:bg-white/20">
      <title>{selectedSkill ? `${selectedSkill.name} | Agent Skills Directory` : 'Agent Skills Directory'}</title>
      <meta name="description" content={selectedSkill ? `${selectedSkill.description} | Extend AI agents like Gemini, Claude, and Codex with this skill.` : "The open standard for LLM extensions. Discover, share, and integrate skills for Gemini, Claude, Codex, and more AI agents."} />
      
      {/* Open Graph */}
      <meta property="og:title" content={selectedSkill ? `${selectedSkill.name} | Agent Skills Directory` : "Agent Skills Directory"} />
      <meta property="og:description" content={selectedSkill ? `${selectedSkill.description} | Extend AI agents like Gemini, Claude, and Codex with this skill.` : "The open standard for LLM extensions. Discover, share, and integrate skills for Gemini, Claude, Codex, and more AI agents."} />
      <meta property="og:url" content={selectedSkill ? `https://skillindex.dev/skill/${selectedSkill.packageName}` : "https://skillindex.dev/"} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={selectedSkill ? `${selectedSkill.name} | Agent Skills Directory` : "Agent Skills Directory"} />
      <meta name="twitter:description" content={selectedSkill ? `${selectedSkill.description} | Extend AI agents like Gemini, Claude, and Codex with this skill.` : "The open standard for LLM extensions. Discover, share, and integrate skills for Gemini, Claude, Codex, and more AI agents."} />
      
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-20">
        <div className="flex justify-between items-center mb-8">
          <a href="https://www.producthunt.com/products/agent-skills-directory-2?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-agent-skills-directory-2" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1064211&amp;theme=light&amp;t=1768669132552" 
              alt="Agent Skills Directory - Share and discover skills for your favorite AI agents | Product Hunt" 
              style={{ width: '200px', height: '43px' }} 
              width="200" 
              height="43" 
            />
          </a>
          <a 
            href="https://github.com/gabeosx/agentskillsdir" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-[#a1a1a1] hover:text-white transition-colors group"
          >
            <Github className="w-5 h-5" />
            <span className="font-medium">View on GitHub</span>
          </a>
        </div>
        
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
          <a 
            href="https://github.com/gabeosx/skx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/10 hover:border-white/20 transition-all group backdrop-blur-sm"
          >
            <Terminal className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:space-x-2">
              <span>Easily manage your agent skills with <span className="text-white font-mono font-bold">skx</span></span>
              <span className="hidden sm:inline text-white/30">•</span>
              <div className="flex items-center space-x-2 px-2 py-1 bg-black/30 rounded border border-white/5 text-xs">
                 <span className="text-green-400 font-mono">$</span>
                 <span className="font-mono text-white/90">skx install </span>
                 <TypingEffect words={examplePackages} />
              </div>
            </div>
          </a>
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
              <button 
                key={index} 
                type="button"
                onClick={() => handleOpenSkill(skill)}
                className="w-full text-left group relative bg-[#111] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all hover:bg-[#161616] cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
                    {skill.name.includes('Weather') ? '🌤️' : '⚡️'}
                  </div>
                  <div className="text-xs text-[#525252] font-mono">{skill.packageName}</div>
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
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseModal}></div>
            <div className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <button 
                onClick={handleCloseModal}
                aria-label="Close modal"
                className="absolute top-4 right-4 p-2 text-[#a1a1a1] hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl">
                      {selectedSkill.name.includes('Weather') ? '🌤️' : '⚡️'}
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-1">{selectedSkill.name}</h2>
                      <div className="flex items-center space-x-3 text-sm text-[#a1a1a1]">
                        {selectedSkill.author && (
                          <span className="flex items-center">
                            By {selectedSkill.author}
                          </span>
                        )}
                        <span>•</span>
                        <span className="font-mono">{selectedSkill.packageName}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[#d1d1d1] leading-relaxed text-lg">
                    {selectedSkill.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.tags?.map(tag => (
                      <span key={tag} className="text-xs uppercase tracking-wider font-bold text-[#737373] bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <a 
                    href={selectedSkill.githubRepoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-[#ededed] transition-colors"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                  
                  {typeof stars === 'number' && (
                    <div className="flex items-center text-[#a1a1a1] font-mono text-sm bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      <Star className="w-4 h-4 text-yellow-500 mr-2 fill-yellow-500" />
                      {stars.toLocaleString()} stars
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<SkillDirectory />} />
      <Route path="/skill/:packageName" element={<SkillDirectory />} />
    </Routes>
  );
}

export default App