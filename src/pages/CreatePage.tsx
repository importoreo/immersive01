import React, { useState, useCallback } from 'react';
import { Image, Headphones, Bot, ChevronLeft, ChevronRight, X, PenTool, Sparkles, Link, Upload, Dice6, FileImage, Heart, Eye, Mountain, Shield, Swords, Laugh, Coffee, Bomb, Award, Wand2, Rocket, Zap, Building, Crown, Gamepad2, Skull, FileText, GraduationCap, PieChart, Palette, Target, Map, Camera, Star, Sword, Settings } from 'lucide-react';
import { ConceptData, PillarsData, ParametersData } from '../types';
import { BuyGemsModal } from "../components/common/BuyGemsModal";
import { BlueprintEditor } from "./BlueprintEditor";

// Types
interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  popular?: boolean;
}

// Status Bar Component
function StatusBar() {
  return (
    <div className="flex justify-between items-center pt-3 px-4 text-white text-sm font-semibold">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <div className="flex gap-0.5">
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1.5 bg-white rounded-full"></div>
          <div className="w-1 h-2 bg-white rounded-full"></div>
          <div className="w-1 h-2.5 bg-white rounded-full"></div>
        </div>
        {/* WiFi icon */}
        <div className="w-3 h-2 relative ml-1">
          <div className="absolute inset-0 border border-white rounded-sm opacity-40"></div>
        </div>
        {/* Battery */}
        <div className="border border-white/40 rounded-sm w-6 h-3 relative ml-1">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-white/40 rounded-r-sm -mr-0.5"></div>
          <div className="absolute left-0.5 top-0.5 bottom-0.5 right-1 bg-white rounded-[1px]"></div>
        </div>
      </div>
    </div>
  );
}

// Component: Progress Bar
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full px-4 mb-6">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex-1 flex items-center">
            <div
              className={`h-1 flex-1 rounded-full ${
                index < currentStep ? 'bg-blue-500' : 'bg-white/20'
              }`}
            />
            {index < totalSteps - 1 && (
              <div className="w-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Component: Initial Mode Selection Page
interface InitialModePageProps {
  onSelectMode: (mode: 'interactive' | 'story' | 'gallery') => void;
}

function InitialModePage({ onSelectMode }: InitialModePageProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-[#232b5d] via-[#3a3e7c] to-[#2e3a8c]">
      <div className="pt-12 pb-8 w-full flex justify-center z-10">
        <h1 className="text-[22px] font-bold text-white tracking-tight text-center" style={{letterSpacing: '-0.5px'}}>Create Experience</h1>
      </div>
      <div className="flex flex-col gap-6 w-full px-6">
        {/* Visual Story */}
        <button
          onClick={() => onSelectMode('story')}
          className="relative flex items-end h-[110px] w-full rounded-[22px] overflow-hidden focus:outline-none transition-transform hover:scale-[1.02]"
          style={{
            backgroundImage: "url('/assets/visual-story.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative flex items-center gap-3 p-5 pb-6 z-10">
            <Image size={28} className="text-white drop-shadow" />
            <span className="text-lg font-bold text-white drop-shadow-lg">Visual Story</span>
          </div>
        </button>
        {/* Interactive World */}
        <button
          onClick={() => onSelectMode('interactive')}
          className="relative flex items-end h-[110px] w-full rounded-[22px] overflow-hidden focus:outline-none transition-transform hover:scale-[1.02]"
          style={{
            backgroundImage: "url('/assets/interactive-world.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative flex items-center gap-3 p-5 pb-6 z-10">
            <Headphones size={28} className="text-white drop-shadow" />
            <span className="text-lg font-bold text-white drop-shadow-lg">Interactive World</span>
          </div>
        </button>
        {/* AI Character */}
        <button
          onClick={() => onSelectMode('gallery')}
          className="relative flex items-end h-[110px] w-full rounded-[22px] overflow-hidden focus:outline-none transition-transform hover:scale-[1.02]"
          style={{
            backgroundImage: "url('/assets/ai-character.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative flex items-center gap-3 p-5 pb-6 z-10">
            <Bot size={28} className="text-white drop-shadow" />
            <span className="text-lg font-bold text-white drop-shadow-lg">AI Character</span>
          </div>
        </button>
      </div>
    </div>
  );
}

// Component: Core Concept Page
interface CoreConceptPageProps {
  onBack: () => void;
  onNext: (conceptData: ConceptData) => void;
}

function CoreConceptPage({ onBack, onNext }: CoreConceptPageProps) {
  const [activeTab, setActiveTab] = useState<'prompt' | 'template' | 'link' | 'upload'>('prompt');
  const [promptText, setPromptText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Random prompt suggestions
  const randomPrompts = [
    "Create a futuristic cyberpunk city with neon lights, flying cars, and towering skyscrapers. Players can explore different districts, interact with NPCs, and discover hidden secrets in the underground.",
    "Design a magical fantasy realm with floating islands, ancient temples, and mystical creatures. Include interactive spells, treasure hunts, and epic quests across multiple kingdoms.",
    "Build an underwater civilization with coral cities, submarine vehicles, and marine life companions. Players navigate through ocean trenches and discover lost Atlantis-style ruins."
  ];

  // Mock template data
  const templates: Template[] = [
    {
      id: '1',
      title: 'Cyberpunk City',
      description: 'Neon-lit streets with futuristic buildings and flying cars',
      category: 'Sci-Fi',
      thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      popular: true
    },
    {
      id: '2',
      title: 'Medieval Fantasy',
      description: 'Magical kingdoms with castles, dragons, and mystical creatures',
      category: 'Fantasy',
      thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      popular: true
    },
    {
      id: '3',
      title: 'Space Station',
      description: 'Futuristic space habitat with zero gravity environments',
      category: 'Sci-Fi',
      thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  const handleGenerateRandom = () => {
    const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    setPromptText(randomPrompt);
  };

  const handleNext = () => {
    let content = '';
    if (activeTab === 'prompt') content = promptText;
    else if (activeTab === 'link') content = linkUrl;
    else if (activeTab === 'template') {
      const template = templates.find(t => t.id === selectedTemplate);
      content = template ? `${template.title}: ${template.description}` : '';
    } else content = 'uploaded_file';

    const conceptData: ConceptData = {
      type: activeTab,
      content: content
    };
    onNext(conceptData);
  };

  const canContinue = () => {
    switch (activeTab) {
      case 'prompt':
        return promptText.trim().length > 0;
      case 'template':
        return selectedTemplate !== null;
      case 'link':
        return linkUrl.trim().length > 0;
      case 'upload':
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="absolute top-[75px] left-0 right-0 px-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-white font-semibold">Core Concept</h1>
        </div>
        
        {/* Progress Bar */}
        <ProgressBar currentStep={1} totalSteps={4} />
      </div>

      {/* Main Content */}
      <div className="absolute top-[155px] left-0 right-0 bottom-[180px] px-4">
        {/* Title Section */}
        <div className="mb-8">
          <h2 className="text-white text-2xl font-bold mb-2">
            What is the core idea behind your world?
          </h2>
          <p className="text-white/60 text-sm">
            Describe on the prompt bar or choose template
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10 mb-5 gap-0">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`flex-1 px-2 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none ${
              activeTab === 'prompt'
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <PenTool size={16} />
              Prompt
            </div>
          </button>
          <button
            onClick={() => setActiveTab('template')}
            className={`flex-1 px-2 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none ${
              activeTab === 'template'
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles size={16} />
              Template
            </div>
          </button>
          <button
            onClick={() => setActiveTab('link')}
            className={`flex-1 px-2 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none ${
              activeTab === 'link'
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Link size={16} />
              Link
            </div>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 px-2 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none ${
              activeTab === 'upload'
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Upload size={16} />
              Upload
            </div>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'prompt' && (
            <div className="space-y-4">
              <div>
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Describe the world or story you want to create..."
                  className="w-full h-40 bg-white/5 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 resize-none"
                />
              </div>
              
              {/* Generate Random Button */}
              <button
                onClick={handleGenerateRandom}
                className="w-full py-4 px-6 bg-white/5 border border-white/20 rounded-2xl text-white/80 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <Dice6 size={20} />
                Generate Random
              </button>
            </div>
          )}

          {activeTab === 'template' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-2 border-blue-400 bg-white/10'
                        : 'border border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex-shrink-0"
                        style={{
                          backgroundImage: template.thumbnail,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-medium">{template.title}</h4>
                          {template.popular && (
                            <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-full border border-orange-400/20">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-white/60 text-sm mb-1">{template.description}</p>
                        <span className="text-white/50 text-xs">{template.category}</span>
                      </div>
                    </div>
                    {selectedTemplate === template.id && false && (
                      <div className="absolute top-3 right-3">
                        <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'link' && (
            <div className="space-y-4">
              <div>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com/inspiration"
                  className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-medium mb-2">🔗 Supported link types:</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Image galleries or Pinterest boards</li>
                  <li>• Video references or YouTube links</li>
                  <li>• Game screenshots or concept art</li>
                  <li>• Architecture or environment references</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <FileImage size={24} className="text-white/60" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Drop files here or click to browse</p>
                    <p className="text-white/60 text-sm">Supports images, documents, and concept art</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-medium mb-2">📁 Supported formats:</h3>
                <div className="grid grid-cols-2 gap-2 text-white/70 text-sm">
                  <div>
                    <p className="font-medium text-white/80 mb-1">Images:</p>
                    <p>JPG, PNG, GIF, WebP</p>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 mb-1">Documents:</p>
                    <p>PDF, TXT, DOC</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Button */}
      <div className="absolute bottom-[114px] left-0 right-0 p-4">
        <button
          onClick={handleNext}
          disabled={!canContinue()}
          className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
            canContinue()
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}

// Component: Experience Button
function ExperienceButton({ title, icon, backgroundImage, onClick }: {
  title: string;
  icon: React.ReactNode;
  backgroundImage: string;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className="relative h-[120px] rounded-[20px] overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] border border-white/50 shadow-lg backdrop-blur-[20px]"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), ${backgroundImage}`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      <div className="relative h-full flex items-center px-10">
        <div className="flex items-center gap-3">
          <div className="text-white/90 shrink-0">{icon}</div>
          <h3 className="text-white text-[20px] font-bold drop-shadow-lg" style={{ textShadow: '#000000 0px 2px 5px' }}>{title}</h3>
        </div>
      </div>
    </div>
  );
}

// Mock user account data
const mockUserAccount = {
  gems: 2450,
  hasCreatorSubscription: false,
  subscriptionExpiry: undefined
};

// Custom Foundation Modal (간단 버전)
interface CustomFoundationConfig {
  characterPortraits: number;
  environmentArt: number;
  audioTracks: number;
  storyBeats: number;
  interactiveElements: number;
}
function CustomFoundationModal({ isOpen, onClose, onConfirm, config, setConfig, cost }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: CustomFoundationConfig;
  setConfig: (cfg: CustomFoundationConfig) => void;
  cost: number;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-[#18181b] rounded-3xl shadow-2xl w-full max-w-[380px] p-5 relative flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white/60 hover:text-white" onClick={onClose}><X size={24} /></button>
        <h2 className="text-xl font-bold text-white mb-6">Custom Foundation</h2>
        <div className="flex flex-col gap-6">
          {/* Character Portraits */}
          <div>
            <div className="flex justify-between items-center mb-2 text-base">
              <span className="text-white font-medium">Character Portraits</span>
              <span className="text-white/70 font-semibold w-6 text-right">{config.characterPortraits}</span>
            </div>
            <input type="range" min={0} max={10} value={config.characterPortraits} onChange={e => setConfig({ ...config, characterPortraits: +e.target.value })} className="w-full accent-blue-500" />
            <div className="flex justify-between text-xs text-white/40 mt-1">
              <span>0</span><span>10</span>
            </div>
          </div>
          {/* Environment Art */}
          <div>
            <div className="flex justify-between items-center mb-2 text-base">
              <span className="text-white font-medium">Environment Art</span>
              <span className="text-white/70 font-semibold w-6 text-right">{config.environmentArt}</span>
            </div>
            <input type="range" min={0} max={15} value={config.environmentArt} onChange={e => setConfig({ ...config, environmentArt: +e.target.value })} className="w-full accent-blue-500" />
            <div className="flex justify-between text-xs text-white/40 mt-1">
              <span>0</span><span>15</span>
            </div>
          </div>
          {/* Audio Tracks */}
          <div>
            <div className="flex justify-between items-center mb-2 text-base">
              <span className="text-white font-medium">Audio Tracks</span>
              <span className="text-white/70 font-semibold w-6 text-right">{config.audioTracks}</span>
            </div>
            <input type="range" min={0} max={8} value={config.audioTracks} onChange={e => setConfig({ ...config, audioTracks: +e.target.value })} className="w-full accent-blue-500" />
            <div className="flex justify-between text-xs text-white/40 mt-1">
              <span>0</span><span>8</span>
            </div>
          </div>
          {/* Story Beats */}
          <div>
            <div className="flex justify-between items-center mb-2 text-base">
              <span className="text-white font-medium">Story Beats</span>
              <span className="text-white/70 font-semibold w-6 text-right">{config.storyBeats}</span>
            </div>
            <input type="range" min={5} max={25} value={config.storyBeats} onChange={e => setConfig({ ...config, storyBeats: +e.target.value })} className="w-full accent-blue-500" />
            <div className="flex justify-between text-xs text-white/40 mt-1">
              <span>5</span><span>25</span>
            </div>
          </div>
          {/* Interactive Elements */}
          <div>
            <div className="flex justify-between items-center mb-2 text-base">
              <span className="text-white font-medium">Interactive Elements</span>
              <span className="text-white/70 font-semibold w-6 text-right">{config.interactiveElements}</span>
            </div>
            <input type="range" min={0} max={20} value={config.interactiveElements} onChange={e => setConfig({ ...config, interactiveElements: +e.target.value })} className="w-full accent-blue-500" />
            <div className="flex justify-between text-xs text-white/40 mt-1">
              <span>0</span><span>20</span>
            </div>
          </div>
        </div>
        {/* Total Cost */}
        <div className="mt-6 mb-4">
          <div className="bg-zinc-900 rounded-2xl px-4 py-3 flex items-center justify-between">
            <span className="text-white/80 font-semibold text-base">Total Cost</span>
            <span className="text-yellow-400 font-bold text-xl">{cost}</span>
            <span className="text-white/40 ml-1">Gems</span>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-2 rounded-xl bg-zinc-800 text-white/80 font-semibold text-base" onClick={onClose}>Cancel</button>
          <button className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-base" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

// 2단계: Core Pillars
function DefineCorePillarsPage({ onBack, onNext, conceptData }: { onBack: () => void; onNext: (data: PillarsData) => void; conceptData: ConceptData }) {
  // AI-powered content analysis and recommendations
  const getRecommendations = (conceptData: ConceptData) => {
    const content = conceptData.content.toLowerCase();
    
    const keywords = {
      cyberpunk: ['cyberpunk', 'neon', 'futuristic', 'tech', 'robot', 'ai', 'cyber'],
      fantasy: ['fantasy', 'magic', 'dragon', 'castle', 'medieval', 'wizard', 'kingdom'],
      scifi: ['space', 'alien', 'station', 'galaxy', 'planet', 'starship', 'quantum'],
      horror: ['horror', 'ghost', 'zombie', 'dark', 'scary', 'haunted', 'evil'],
      adventure: ['adventure', 'explore', 'treasure', 'quest', 'journey', 'discovery'],
      romance: ['love', 'romance', 'relationship', 'intimate', 'heart'],
      mystery: ['mystery', 'detective', 'crime', 'investigate', 'clue', 'solve']
    };

    const detectedThemes: string[] = [];
    Object.entries(keywords).forEach(([theme, words]) => {
      if (words.some(word => content.includes(word))) {
        detectedThemes.push(theme);
      }
    });

    return {
      themes: detectedThemes.length > 0 ? detectedThemes : ['adventure'],
      primaryTheme: detectedThemes[0] || 'adventure'
    };
  };

  const recommendations = getRecommendations(conceptData);

  // Comprehensive Theme options based on reference
  const themeOptions = [
    { 
      id: 'romance', 
      label: 'Romance', 
      icon: <Heart size={20} />, 
      description: 'Warm, tension-filled, intimate',
      recommended: recommendations.themes.includes('romance')
    },
    { 
      id: 'mystery', 
      label: 'Mystery', 
      icon: <Eye size={20} />, 
      description: 'Suspenseful, intriguing, intellectual',
      recommended: recommendations.themes.includes('mystery')
    },
    { 
      id: 'hero-journey', 
      label: "Hero's Journey", 
      icon: <Mountain size={20} />, 
      description: 'Epic, inspirational, transformative',
      recommended: recommendations.themes.includes('adventure')
    },
    { 
      id: 'survival', 
      label: 'Survival', 
      icon: <Shield size={20} />, 
      description: 'Harsh, high-stakes, desperate',
      recommended: false
    },
    { 
      id: 'rebellion', 
      label: 'Rebellion', 
      icon: <Swords size={20} />, 
      description: 'Defiant, urgent, righteous',
      recommended: false
    },
    { 
      id: 'tragedy', 
      label: 'Tragedy', 
      icon: <Award size={20} />, 
      description: 'Somber, inevitable, profound loss',
      recommended: false
    },
    { 
      id: 'comedy', 
      label: 'Comedy', 
      icon: <Laugh size={20} />, 
      description: 'Lighthearted, humorous, witty',
      recommended: false
    },
    { 
      id: 'slice-of-life', 
      label: 'Slice of Life', 
      icon: <Coffee size={20} />, 
      description: 'Gentle, relatable, introspective',
      recommended: false
    },
    { 
      id: 'thriller', 
      label: 'Thriller/Suspense', 
      icon: <Bomb size={20} />, 
      description: 'Tense, psychological, anxiety-inducing',
      recommended: false
    },
    { 
      id: 'redemption', 
      label: 'Redemption', 
      icon: <Award size={20} />, 
      description: 'Regretful, seeking forgiveness',
      recommended: false
    }
  ];

  // Comprehensive Genre options based on reference
  const genreOptions = [
    { 
      id: 'fantasy', 
      label: 'Fantasy', 
      icon: <Wand2 size={20} />, 
      description: 'Magic systems, medieval/mythical settings, epic quests',
      recommended: recommendations.themes.includes('fantasy')
    },
    { 
      id: 'scifi', 
      label: 'Sci-Fi', 
      icon: <Rocket size={20} />, 
      description: 'Future technology, space exploration, scientific principles',
      recommended: recommendations.themes.includes('scifi') || recommendations.themes.includes('cyberpunk')
    },
    { 
      id: 'cyberpunk', 
      label: 'Cyberpunk', 
      icon: <Zap size={20} />, 
      description: 'High-tech low-life, neon-drenched cities, cybernetics',
      recommended: recommendations.themes.includes('cyberpunk')
    },
    { 
      id: 'contemporary', 
      label: 'Contemporary', 
      icon: <Building size={20} />, 
      description: 'Modern world, relatable situations, real-world technology',
      recommended: false
    },
    { 
      id: 'historical', 
      label: 'Historical', 
      icon: <Crown size={20} />, 
      description: 'Specific past era, historical context, period-accurate details',
      recommended: false
    },
    { 
      id: 'isekai', 
      label: 'Isekai', 
      icon: <Gamepad2 size={20} />, 
      description: 'Modern person transported to fantasy/game world',
      recommended: false
    },
    { 
      id: 'post-apocalyptic', 
      label: 'Post-Apocalyptic', 
      icon: <Skull size={20} />, 
      description: 'Ruined cities, survival against odds, scarcity of resources',
      recommended: false
    },
    { 
      id: 'horror', 
      label: 'Horror', 
      icon: <Skull size={20} />, 
      description: 'Fear, dread, monstrous entities, psychological tension',
      recommended: recommendations.themes.includes('horror')
    },
    { 
      id: 'high-school', 
      label: 'High-School', 
      icon: <GraduationCap size={20} />, 
      description: 'School uniforms, classrooms, clubs, teenage social dynamics',
      recommended: false
    },
    { 
      id: 'mythic-east-asian', 
      label: 'Mythic East Asian', 
      icon: <Mountain size={20} />, 
      description: 'Pagodas, temples, traditional clothing, martial arts sects',
      recommended: false
    }
  ];

  // Art Style options
  const artStyleOptions = [
    { 
      id: 'realistic', 
      label: 'Realistic', 
      icon: <Camera size={20} />, 
      description: 'Photorealistic rendering and lifelike details',
      recommended: true
    },
    { 
      id: 'anime', 
      label: 'Anime', 
      icon: <Star size={20} />, 
      description: 'Japanese animation style with expressive characters',
      recommended: false
    },
    { 
      id: 'painterly', 
      label: 'Painterly', 
      icon: <Palette size={20} />, 
      description: 'Traditional art techniques and brush strokes',
      recommended: false
    },
    { 
      id: 'cartoon', 
      label: 'Cartoon', 
      icon: <Sparkles size={20} />, 
      description: 'Stylized and simplified character designs',
      recommended: false
    },
    { 
      id: 'pixel-art', 
      label: 'Pixel Art', 
      icon: <PieChart size={20} />, 
      description: 'Retro 8-bit and 16-bit style graphics',
      recommended: false
    },
    { 
      id: 'neon-noir', 
      label: 'Neon-Noir', 
      icon: <Zap size={20} />, 
      description: 'Dark cyberpunk aesthetic with bright neon accents',
      recommended: recommendations.themes.includes('cyberpunk')
    },
    { 
      id: 'minimalist', 
      label: 'Minimalist', 
      icon: <Target size={20} />, 
      description: 'Clean, simple designs with essential elements only',
      recommended: false
    },
    { 
      id: 'gothic', 
      label: 'Dark/Gothic', 
      icon: <Skull size={20} />, 
      description: 'Dark, atmospheric with medieval gothic elements',
      recommended: recommendations.themes.includes('horror')
    }
  ];

  // Framework options based on reference
  const frameworkOptions = [
    { 
      id: 'rpg', 
      label: 'RPG', 
      icon: <Sword size={20} />, 
      description: 'Character stats, quests, exploration, stat-based checks',
      recommended: true
    },
    { 
      id: 'dating-sim', 
      label: 'Dating Sim', 
      icon: <Heart size={20} />, 
      description: 'Relationship building, dialogue choices, romantic endings',
      recommended: recommendations.themes.includes('romance')
    },
    { 
      id: 'visual-novel', 
      label: 'Visual Novel', 
      icon: <FileText size={20} />, 
      description: 'Story through text and character sprites, branching paths',
      recommended: false
    },
    { 
      id: 'roguelike', 
      label: 'Roguelike', 
      icon: <Dice6 size={20} />, 
      description: 'Single "run" challenges, fail and restart with progression',
      recommended: false
    },
    { 
      id: 'adventure', 
      label: 'Adventure', 
      icon: <Map size={20} />, 
      description: 'Exploration and puzzle-solving, gather information/items',
      recommended: false
    },
    { 
      id: 'murder-mystery', 
      label: 'Murder Mystery', 
      icon: <Eye size={20} />, 
      description: 'Crime investigation, gather clues, interrogate suspects',
      recommended: recommendations.themes.includes('mystery')
    },
    { 
      id: 'strategy', 
      label: 'Strategy/Management', 
      icon: <Target size={20} />, 
      description: 'High-level decisions, manage resources or systems',
      recommended: false
    }
  ];

  // Auto-select recommendations on mount - Updated to always select
  const getDefaultSelection = (options: any[]) => {
    const recommendedOption = options.find(option => option.recommended);
    return recommendedOption ? recommendedOption.id : options[0].id;
  };

  const [selectedTheme, setSelectedTheme] = useState<string>(() => getDefaultSelection(themeOptions));
  const [selectedGenre, setSelectedGenre] = useState<string>(() => getDefaultSelection(genreOptions));
  const [selectedArtStyle, setSelectedArtStyle] = useState<string>(() => getDefaultSelection(artStyleOptions));
  const [selectedFramework, setSelectedFramework] = useState<string>(() => getDefaultSelection(frameworkOptions));

  const handleNext = () => {
    const pillarsData: PillarsData = {
      theme: selectedTheme,
      genre: selectedGenre,
      artStyle: selectedArtStyle,
      framework: selectedFramework
    };
    onNext(pillarsData);
  };

  // Always returns true since we now auto-select everything
  const canContinue = () => {
    return selectedTheme && selectedGenre && selectedArtStyle && selectedFramework;
  };

  const PillarCarouselSection = ({ title, options, selectedValue, onSelect }: {
    title: string;
    options: any[];
    selectedValue: string;
    onSelect: (value: string) => void;
  }) => (
    <div className="mb-8">
      <h3 className="text-white text-lg font-semibold mb-4 px-4">{title}</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-2">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`flex-shrink-0 w-[140px] h-[100px] rounded-2xl border-2 transition-all cursor-pointer relative ${
              selectedValue === option.id
                ? 'border-blue-400 bg-blue-400/20'
                : 'border-white/20 bg-white/5 hover:bg-white/10'
            }`}
          >
            {/* Recommended indicator */}
            {option.recommended && selectedValue !== option.id && (
              <div className="absolute top-2 right-2 z-10 bg-orange-500 text-orange-100 text-xs px-2 py-0.5 rounded-full border border-orange-400/20">
                Recommended
              </div>
            )}
            
            {/* Card content */}
            <div className="p-3 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className={`${selectedValue === option.id ? 'text-blue-400' : 'text-white/70'}`}>
                  {option.icon}
                </div>
                <h4 className={`font-medium text-sm ${selectedValue === option.id ? 'text-blue-400' : 'text-white'}`}>
                  {option.label}
                </h4>
              </div>
              <p className={`text-xs leading-tight ${selectedValue === option.id ? 'text-blue-300/80' : 'text-white/60'}`}>
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="absolute top-[75px] left-0 right-0 px-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-white font-semibold">Define Core Pillars</h1>
        </div>
        
        {/* Progress Bar */}
        <ProgressBar currentStep={2} totalSteps={4} />
      </div>

      {/* Main Content */}
      <div className="absolute top-[155px] left-0 right-0 bottom-[180px] overflow-y-auto">
        {/* AI Insight */}
        <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-400/20 mb-6 mx-4">
          <div className="flex items-start gap-3">
            <Bot size={20} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-400 font-medium text-sm">AI Recommendations</p>
              <p className="text-blue-300/80 text-sm">
                Based on your concept, I've pre-selected pillars that match your vision. Feel free to adjust them!
              </p>
            </div>
          </div>
        </div>

        {/* Pillar Carousel Sections */}
        <PillarCarouselSection
          title="Theme"
          options={themeOptions}
          selectedValue={selectedTheme}
          onSelect={setSelectedTheme}
        />

        <PillarCarouselSection
          title="Genre"
          options={genreOptions}
          selectedValue={selectedGenre}
          onSelect={setSelectedGenre}
        />

        <PillarCarouselSection
          title="Art Style"
          options={artStyleOptions}
          selectedValue={selectedArtStyle}
          onSelect={setSelectedArtStyle}
        />

        <PillarCarouselSection
          title="Framework"
          options={frameworkOptions}
          selectedValue={selectedFramework}
          onSelect={setSelectedFramework}
        />
      </div>

      {/* Next Button - Always enabled now */}
      <div className="absolute bottom-[114px] left-0 right-0 p-4">
        <button
          onClick={handleNext}
          className="w-full py-4 px-6 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
        >
          Next
        </button>
      </div>
    </>
  );
}

// 3단계: Refine Parameters
function RefineExperienceParametersPage({ onBack, onNext, pillarsData }: { onBack: () => void; onNext: (data: ParametersData) => void; pillarsData: PillarsData }) {
  const [selectedExperienceStyle, setSelectedExperienceStyle] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>(3);
  const [nsfwEnabled, setNsfwEnabled] = useState<boolean>(false);

  // Get experience style options based on framework
  const getExperienceStyleOptions = (framework: string) => {
    switch (framework) {
      case 'rpg':
        return [
          {
            id: 'classic-dnd',
            title: 'Classic D&D-Style Campaign',
            description: 'Focus on party-based co-op, turn-based actions, explicit skill checks, and a strong AI GM narrative voice.',
            icon: <Sword size={20} />,
            previewImage: 'linear-gradient(135deg, #8B4513 0%, #CD853F 50%, #F4A460 100%)',
            recommended: true
          },
          {
            id: 'action-roguelite',
            title: 'Action Roguelite',
            description: 'Emphasizes fast-paced mini-games, procedural generation of story beats, and run-based progression.',
            icon: <Zap size={20} />,
            previewImage: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)'
          },
          {
            id: 'jrpg-saga',
            title: 'JRPG Saga',
            description: 'Features strong character-driven arcs, dramatic story beats, and a focus on skill trees/classes.',
            icon: <Star size={20} />,
            previewImage: 'linear-gradient(135deg, #FF69B4 0%, #BA55D3 50%, #9370DB 100%)'
          },
          {
            id: 'narrative-heavy-rpg',
            title: 'Narrative-Heavy RPG',
            description: 'De-emphasizes combat/stats in favor of deep dialogue systems and branching quests.',
            icon: <FileText size={20} />,
            previewImage: 'linear-gradient(135deg, #4A90E2 0%, #7B68EE 50%, #9932CC 100%)'
          }
        ];
      
      case 'dating-sim':
        return [
          {
            id: 'classic-otome',
            title: 'Classic Otome',
            description: 'Story from a female protagonist\'s POV with multiple distinct male Love Interests, each with a dedicated "route."',
            icon: <Heart size={20} />,
            previewImage: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 50%, #DC143C 100%)',
            recommended: true
          },
          {
            id: 'slice-of-life-romance',
            title: 'Slice-of-Life Romance',
            description: 'Focuses on everyday situations and gentle relationship-building.',
            icon: <Coffee size={20} />,
            previewImage: 'linear-gradient(135deg, #F0E68C 0%, #DDA0DD 50%, #98FB98 100%)'
          },
          {
            id: 'dramatic-love-triangle',
            title: 'Dramatic Love Triangle',
            description: 'Core mechanics are built around managing relationships between three central characters.',
            icon: <Heart size={20} />,
            previewImage: 'linear-gradient(135deg, #B22222 0%, #DC143C 50%, #FF1493 100%)'
          },
          {
            id: 'comedy-dating-sim',
            title: 'Comedy Dating Sim',
            description: 'Choices, characters, and situations are designed to be humorous.',
            icon: <Laugh size={20} />,
            previewImage: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6347 100%)'
          }
        ];
      
      default:
        return [
          {
            id: 'general-interactive',
            title: 'General Interactive Experience',
            description: 'A flexible format that adapts to your chosen theme and genre.',
            icon: <Sparkles size={20} />,
            previewImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            recommended: true
          }
        ];
    }
  };

  const experienceStyleOptions: (ReturnType<typeof getExperienceStyleOptions>[number] & { thumbnail: string; tags: string[] })[] = getExperienceStyleOptions(pillarsData.framework).map((option, idx) => ({
    ...option,
    thumbnail: idx === 0
      ? '/images/experience/test.png'
      : option.previewImage || [
        '/images/experience/romance1.png',
        '/images/experience/romance2.png',
        '/images/experience/romance3.png',
      ][(idx-1) % 3],
    tags: (
      idx === 0 ? ['Adult', 'Cute', 'Urban'] :
      idx === 1 ? ['Historical', 'Forbidden', 'Passionate'] :
      idx === 2 ? ['Magic', 'Fantasy', 'enemies-to-lovers'] :
      ['Taboo', 'Intense', 'Attraction']
    )
  }));

  const didAutoSelect = React.useRef(false);
  React.useEffect(() => {
    if (!didAutoSelect.current) {
      const recommendedOption = experienceStyleOptions.find(option => option.recommended);
      if (recommendedOption) {
        setSelectedExperienceStyle(recommendedOption.id);
        didAutoSelect.current = true;
      }
    }
  }, [experienceStyleOptions]);

  const handleNext = () => {
    const parametersData: ParametersData = {
      experienceStyle: selectedExperienceStyle,
      difficulty: difficulty,
      nsfwEnabled: nsfwEnabled
    };
    onNext(parametersData);
  };

  const canContinue = () => {
    return selectedExperienceStyle !== '';
  };

  const getDifficultyLabel = (level: number) => {
    const labels = ['Beginner', 'Easy', 'Medium', 'Hard', 'Expert'];
    return labels[level - 1];
  };

  return (
    <>
      {/* Header */}
      <div className="absolute top-[75px] left-0 right-0 px-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-white font-semibold">Refine Details & Setting</h1>
        </div>
        
        {/* Progress Bar */}
        <ProgressBar currentStep={3} totalSteps={4} />
      </div>

      {/* Main Content */}
      <div className="absolute top-[155px] left-0 right-0 bottom-[180px] overflow-y-auto px-4">
        {/* Experience Style Section */}
        <div className="mb-8">
          <h2 className="text-white text-xl font-semibold mb-4">Experience Style</h2>
          <p className="text-white/60 text-sm mb-4">
            Choose a specific style that refines your {pillarsData.framework.replace('-', ' ')} framework
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {experienceStyleOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedExperienceStyle(option.id)}
                className={`relative rounded-xl bg-white/5 shadow-lg overflow-hidden flex flex-col transition hover:scale-[1.02] border-2 cursor-pointer ${
                  selectedExperienceStyle === option.id ? 'border-blue-400 bg-blue-400/20' : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}
              >
                {option.recommended && (
                  <span className="absolute top-2 right-2 z-10 bg-orange-500 text-orange-100 text-xs px-2 py-0.5 rounded-full border border-orange-400/20">
                    Recommended
                  </span>
                )}
                <img src={option.thumbnail} alt={option.title} className="w-full h-32 object-cover rounded-t-xl" />
                <div className="flex-1 min-w-0 relative">
                  <div className="flex items-center gap-2 mt-3 px-4">
                    {option.icon}
                    <h3 className={`font-bold text-lg ${selectedExperienceStyle === option.id ? 'text-blue-400' : 'text-white'}`}>{option.title}</h3>
                  </div>
                  <p className="text-white/70 text-sm px-4 mt-1 mb-2">{option.description}</p>
                  <div className="flex flex-wrap gap-2 px-4 pb-3">
                    {option.tags && option.tags.map((tag: string) => (
                      <span key={tag} className="rounded-full bg-white/10 text-white/70 text-xs px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setting Parameters Section */}
        <div className="mb-8">
          <h2 className="text-white text-xl font-semibold mb-4">Setting Parameters</h2>
          
          {/* Difficulty Slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-white font-medium">Difficulty</label>
              <div className="flex items-center gap-2">
                <span className="text-white/80 text-sm">{getDifficultyLabel(difficulty)}</span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${star <= difficulty ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min="1"
                max="5"
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((difficulty - 1) / 4) * 100}%, rgba(255,255,255,0.2) ${((difficulty - 1) / 4) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
            
            <div className="flex justify-between mt-2 text-xs text-white/50">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>

          {/* NSFW Toggle */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium mb-1">Enable Mature Content (18+)</h3>
                <p className="text-white/60 text-sm">Allow adult themes, violence, and mature storylines</p>
              </div>
              <button
                onClick={() => setNsfwEnabled(!nsfwEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  nsfwEnabled ? 'bg-blue-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    nsfwEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {nsfwEnabled && (
              <div className="mt-3 p-3 bg-orange-500/10 rounded-lg border border-orange-400/20">
                <div className="flex items-start gap-2">
                  <Award size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-orange-400 font-medium text-sm">Content Warning</p>
                    <p className="text-orange-300/80 text-sm">
                      This experience may contain mature themes suitable only for adults.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="absolute bottom-[114px] left-0 right-0 p-4">
        <button
          onClick={handleNext}
          disabled={!canContinue()}
          className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
            canContinue()
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}

// 4단계: Blueprint Quality
function InitialBlueprintQualityPage({ onBack, onGenerate, parametersData }: { onBack: () => void; onGenerate: (options: any) => void; parametersData: ParametersData }) {
  const [selectedTier, setSelectedTier] = useState('');
  const [showBuyGemsModal, setShowBuyGemsModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customConfig, setCustomConfig] = useState({
    characterPortraits: 3,
    environmentArt: 5,
    audioTracks: 2,
    storyBeats: 10,
    interactiveElements: 8
  });
  const calculateCustomCost = (config: CustomFoundationConfig) =>
    config.characterPortraits * 50 +
    config.environmentArt * 30 +
    config.audioTracks * 80 +
    config.storyBeats * 15 +
    config.interactiveElements * 20;
  const customCost = calculateCustomCost(customConfig);

  const handleGenerateBlueprintClick = () => {
    const options = {
      ...parametersData,
      // 필요시 conceptData, pillarsData 등 추가
    };
    onGenerate(options);
  };

  return (
    <>
      {/* 상단 헤더 및 진행바 */}
      <div className="absolute top-[75px] left-0 right-0 px-4 z-20">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-white font-semibold">Initial Blueprint Quality</h1>
        </div>
        <ProgressBar currentStep={4} totalSteps={4} />
      </div>
      {/* Gem Info & Buy Gems */}
      <div className="absolute top-[155px] left-0 right-0 px-4">
        <div className="bg-white/5 rounded-xl p-3 border border-white/10 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Star size={16} className="text-white fill-white" />
            </div>
            <div>
              <p className="text-white font-medium">{mockUserAccount.gems} Gems</p>
              <p className="text-white/60 text-sm">
                {mockUserAccount.hasCreatorSubscription ? 'Creator Subscription Active' : 'Free Account'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowBuyGemsModal(true)}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg border border-white/20 transition-colors flex items-center gap-1"
          >
            + Buy Gems
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="absolute top-[235px] left-0 right-0 bottom-[180px] overflow-y-auto px-4">
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold mb-2">Choose Your Blueprint Quality</h2>
          <p className="text-white/60 text-sm">
            Select the level of detail and richness for your AI-generated first draft
          </p>
        </div>
        <div className="space-y-4">
          {/* Standard Foundation - Free */}
          <div
            onClick={() => setSelectedTier('standard')}
            className={`p-5 rounded-xl cursor-pointer transition-all border-2 ${
              selectedTier === 'standard'
                ? 'border-green-400 bg-green-400/20'
                : 'border-white/20 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${selectedTier === 'standard' ? 'text-green-400' : 'text-white'}`}>Standard Foundation</h3>
                  <p className="text-green-400 text-sm font-medium">FREE</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-green-300">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Core story structure and framework</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Text-based asset descriptions</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Basic character outlines</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Minimal interactive elements</span>
              </div>
            </div>
          </div>
          {/* Enhanced Foundation - Paid */}
          <div
            onClick={() => setSelectedTier('enhanced')}
            className={`p-5 rounded-xl cursor-pointer transition-all border-2 ${
              selectedTier === 'enhanced'
                ? 'border-blue-400 bg-blue-400/20'
                : 'border-white/20 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${selectedTier === 'enhanced' ? 'text-blue-400' : 'text-white'}`}>Enhanced Foundation</h3>
                  <p className="text-blue-400 text-sm font-medium">299 Gems</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-blue-300">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Everything in Standard Foundation</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>5 detailed story beats with branching paths</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>3 initial character portraits</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>2 starter environment art pieces</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>1 ambient audio track</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Enhanced interactive elements</span>
              </div>
            </div>
          </div>
          {/* Custom Foundation - Premium */}
          <div
            onClick={() => { setSelectedTier('custom'); setShowCustomModal(true); }}
            className={`p-5 rounded-xl cursor-pointer transition-all border-2 ${
              selectedTier === 'custom'
                ? 'border-purple-400 bg-purple-400/20'
                : 'border-white/20 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Settings size={20} className="text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${selectedTier === 'custom' ? 'text-purple-400' : 'text-white'}`}>Custom Foundation</h3>
                  <p className="text-purple-400 text-sm font-medium">{customCost} Gems</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-purple-300">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span>Everything in Enhanced Foundation</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span>Customizable asset quantities</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span>Premium art and audio generation</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span>Advanced interactive mechanics</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span>Priority generation queue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Generate Button */}
      <div className="absolute bottom-[114px] left-0 right-0 p-4">
        <button
          onClick={handleGenerateBlueprintClick}
          disabled={!selectedTier}
          className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
            selectedTier
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
        >
          <Sparkles size={20} />
          Generate Blueprint
        </button>
      </div>
      {/* Buy Gems Modal */}
      <BuyGemsModal
        isOpen={showBuyGemsModal}
        onClose={() => setShowBuyGemsModal(false)}
        onPurchase={(type, planId) => {
          setShowBuyGemsModal(false);
          // 실제 구매/구독 로직 필요시 여기에 추가
        }}
      />
      {/* Custom Foundation Modal */}
      <CustomFoundationModal isOpen={showCustomModal} onClose={() => setShowCustomModal(false)} onConfirm={() => { setSelectedTier('custom'); setShowCustomModal(false); }} config={customConfig} setConfig={setCustomConfig} cost={customCost} />
    </>
  );
}

// Gemini 텍스트 생성 함수
async function fetchGeminiText(prompt: string) {
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDF6eaNo9amQysWrXIgonxmLzZt6j0164c',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}
// Gemini 이미지 생성 함수 (Base64 → data URL)
async function fetchGeminiImage(prompt: string) {
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=AIzaSyDF6eaNo9amQysWrXIgonxmLzZt6j0164c',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );
  const data = await response.json();
  // base64 or url, 예시: data.candidates[0].content.parts[0].inlineData.data
  const base64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (base64) return `data:image/png;base64,${base64}`;
  // url fallback
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// Main CreatePage Component
export const CreatePage: React.FC = () => {
  const [mode, setMode] = useState<'initial' | 'interactive' | 'story' | 'gallery'>('initial');
  const [step, setStep] = useState(1);
  const [conceptData, setConceptData] = useState<ConceptData | null>(null);
  const [pillarsData, setPillarsData] = useState<PillarsData | null>(null);
  const [parametersData, setParametersData] = useState<ParametersData | null>(null);
  const [blueprintData, setBlueprintData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // handleGenerateBlueprintClick 함수 추가
  const handleGenerateBlueprintClick = (options: any) => {
    // 간단한 더미 데이터로 테스트
    const dummyBlueprintData = {
      story: "A mysterious adventure begins in a forgotten realm...",
      characters: ["Hero", "Mentor", "Villain"],
      rules: ["Turn-based combat", "Skill checks", "Inventory management"],
      settings: "Medieval fantasy world",
      gmInstructions: "Guide players through the story with descriptive narration",
      goals: ["Complete the main quest", "Discover hidden secrets", "Defeat the final boss"],
      imageUrl: "/images/experience/test.png"
    };
    setBlueprintData(dummyBlueprintData);
    setStep(5);
  };

  // 초기 모드 선택 화면
  if (mode === 'initial') {
    return <InitialModePage onSelectMode={(selectedMode) => {
      setMode(selectedMode);
      if (selectedMode === 'interactive') {
        setStep(1);
      }
      // story와 gallery 모드는 나중에 구현
    }} />;
  }

  // Interactive World 플로우 (4단계)
  if (mode === 'interactive') {
    if (step === 1) {
      return <CoreConceptPage onBack={() => setMode('initial')} onNext={(data) => { setConceptData(data); setStep(2); }} />;
    }
    if (step === 2 && conceptData) {
      return <DefineCorePillarsPage onBack={() => setStep(1)} onNext={(data) => { setPillarsData(data); setStep(3); }} conceptData={conceptData} />;
    }
    if (step === 3 && conceptData && pillarsData) {
      return <RefineExperienceParametersPage onBack={() => setStep(2)} onNext={(data) => { setParametersData(data); setStep(4); }} pillarsData={pillarsData} />;
    }
    if (step === 4 && conceptData && pillarsData && parametersData) {
      return <InitialBlueprintQualityPage
        onBack={() => setStep(3)}
        onGenerate={handleGenerateBlueprintClick}
        parametersData={parametersData}
      />;
    }
    if (step === 5 && blueprintData) {
      return <BlueprintEditor
        {...blueprintData}
        onBack={() => setStep(4)}
        onLivePreview={() => console.log('Live Preview')}
        onApply={() => console.log('Apply')}
      />;
    }
  }

  // 로딩 중에는 LoadingPage 렌더링
  if (loading) return <LoadingPage progress={progress} />;

  return null;
};

// 임시 로딩 페이지
function LoadingPage({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80">
      <div className="text-white text-xl mb-6">Generating content...</div>
      <div className="w-64 h-4 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="text-white/60 mt-4">{progress}%</div>
    </div>
  );
} 