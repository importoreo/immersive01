import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlueprintEditorProps {
  story: string;
  characters: string[];
  rules: string[];
  settings?: string;
  gmInstructions?: string;
  goals?: string[];
  imageUrl?: string;
  onBack?: () => void;
  onLivePreview?: () => void;
  onApply?: () => void;
}

const CARD_LIST = [
  {
    key: 'story',
    title: 'Story Beats',
    subtitle: 'Outline key narrative events',
    items: ['Introduction', 'Rising Action', 'Climax'],
  },
  {
    key: 'characters',
    title: 'Characters',
    subtitle: 'Define the cast',
    items: ['Main Characters', 'Sub Characters', 'Villain'],
  },
  {
    key: 'rules',
    title: 'Rules & Logics',
    subtitle: 'Set the round rules',
    items: ['Core Mechanics', 'Items setup', 'Economy'],
  },
  {
    key: 'gm',
    title: 'GM Setting',
    subtitle: 'Adjust the game master\'s parameters',
    items: ['Narrator persona', 'Pacing style', 'NPC Behavior'],
  },
];

// GM Setting을 Rules & Logics 바로 아래로 이동
CARD_LIST.splice(3, 0, CARD_LIST.pop());

export const BlueprintEditor: React.FC<BlueprintEditorProps> = ({
  story,
  characters,
  rules,
  settings,
  gmInstructions,
  goals,
  imageUrl,
  onBack,
  onLivePreview,
  onApply,
}) => {
  const [activeSection, setActiveSection] = useState<'main' | 'story' | 'characters' | 'rules' | 'gm'>('main');

  // Detail page (all English)
  if (activeSection !== 'main') {
    const card = CARD_LIST.find(c => c.key === activeSection);
    if (!card) return null;
    return (
      <div className="min-h-[100dvh] w-full flex flex-col relative">
        {/* Header */}
        <div className="absolute top-[35px] left-0 right-0 px-4 z-20">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => setActiveSection('main')} className="text-white/60 hover:text-white transition-colors">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-white font-semibold text-lg">{card.title}</h1>
          </div>
        </div>
        <div className="absolute top-[150px] left-0 right-0 bottom-[180px] overflow-y-auto px-4">
          {/* Characters detail: show main character image */}
          {activeSection === 'characters' && (
            <div className="flex flex-col items-center mb-8">
              {imageUrl && (
                <img src={imageUrl} alt="Main Character" className="rounded-xl w-40 h-40 object-cover mb-4" />
              )}
              <div className="text-white/80 text-lg font-semibold mb-2">Main Character</div>
            </div>
          )}
          {/* Detail content (all English) */}
          <div className="bg-white/10 rounded-2xl p-8 text-white/80 text-center text-lg">
            <div className="font-bold text-2xl mb-2">{card.title} Details</div>
            <div className="text-base mb-4">{card.subtitle}</div>
            <ul className="text-left mx-auto max-w-md">
              {card.items.map((item, i) => (
                <li key={i} className="mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-sm text-white/60">(Editing UI coming soon)</div>
          </div>
        </div>
      </div>
    );
  }

  // 메인 카드 리스트 (이전 버전 스타일 유지)
  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative">
      {/* 상단 헤더 및 타이틀 (이전 버전 스타일) */}
      <div className="absolute top-[35px] left-0 right-0 px-4 z-20">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-white font-semibold text-lg">Blueprint Editor</h1>
        </div>
        <div className="mb-6">
          <h2 className="text-white text-2xl font-bold mb-1">Blueprint Editor</h2>
          <p className="text-white/60 text-sm">Tap each pillar to define the foundation of your story</p>
        </div>
      </div>
      {/* 카드 리스트 (이전 버전 카드 스타일) */}
      <div className="absolute top-[160px] left-0 right-0 bottom-[60px] overflow-y-auto px-4 space-y-6 pb-32">
        {CARD_LIST.map((card) => (
          <div
            key={card.key}
            className="rounded-2xl bg-white/5 border border-white/10 shadow-lg p-6 flex flex-col cursor-pointer transition hover:scale-[1.02] hover:bg-white/10 hover:border-blue-400 hover:shadow-xl"
            onClick={() => setActiveSection(card.key as any)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center" />
                <div>
                  <h3 className="text-white font-bold text-xl leading-tight">{card.title}</h3>
                  <p className="text-white/60 text-base leading-tight">{card.subtitle}</p>
                </div>
              </div>
              <ChevronRight className="text-white/40" />
            </div>
            <hr className="my-2 border-white/10" />
            <div className="pl-20 space-y-2">
              {card.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/90 text-base">
                  <span>{item}</span>
                  <span className="ml-auto w-3 h-3 rounded-full bg-green-400" />
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* Dummy invisible card for scrollability, same hierarchy as other cards */}
        <div className="rounded-2xl bg-white/5 border border-white/10 shadow-lg p-6 flex flex-col opacity-0 pointer-events-none select-none" />
      </div>
      {/* 하단 버튼 (이전 버전 스타일) */}
      <div className="absolute bottom-[114px] left-0 right-0 p-4 flex flex-row gap-2">
        <button
          onClick={onLivePreview}
          className="w-1/2 py-4 px-6 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white"
        >
          Live Preview
        </button>
        <button
          onClick={onApply}
          className="w-1/2 py-4 px-6 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
        >
          Apply
        </button>
      </div>
    </div>
  );
}; 