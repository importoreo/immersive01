import React, { useState } from 'react';
import { ChevronLeft, Sparkles, FileText, Star, Settings } from 'lucide-react';

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
  // step 4와 동일한 구조/스타일 복붙
  const [showBuyGemsModal, setShowBuyGemsModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);

  return (
    <>
      {/* 상단 헤더 및 진행바 */}
      <div className="absolute top-[75px] left-0 right-0 px-4 z-20">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-white font-semibold">Blueprint Editor</h1>
        </div>
        {/* 제목/소제목 */}
        <div className="mb-6">
          <h2 className="text-white text-2xl font-bold mb-1">Blueprint Editor</h2>
          <p className="text-white/60 text-sm">Tap each pillar to define the foundation of your story</p>
        </div>
      </div>
      {/* Blueprint Info 섹션 완전히 제거됨 */}
      {/* Main Content */}
      <div className="absolute top-[200px] left-0 right-0 bottom-[180px] overflow-y-auto px-4">
        <div className="space-y-4">
          {/* Story 카드 */}
          <div className="p-5 rounded-xl border-2 border-blue-400/20 bg-white/5">
            <div className="flex items-center gap-3 mb-2">
              <FileText size={20} className="text-blue-400" />
              <h3 className="font-semibold text-blue-400">Story</h3>
            </div>
            <div className="text-white/90 text-sm whitespace-pre-line">{story}</div>
          </div>
          {/* Characters 카드 */}
          <div className="p-5 rounded-xl border-2 border-purple-400/20 bg-white/5">
            <div className="flex items-center gap-3 mb-2">
              <Settings size={20} className="text-purple-400" />
              <h3 className="font-semibold text-purple-400">Characters</h3>
            </div>
            <ul className="text-white/90 text-sm pl-4 list-disc">
              {characters && characters.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          {/* Rules 카드 */}
          <div className="p-5 rounded-xl border-2 border-green-400/20 bg-white/5">
            <div className="flex items-center gap-3 mb-2">
              <Settings size={20} className="text-green-400" />
              <h3 className="font-semibold text-green-400">Rules</h3>
            </div>
            <ul className="text-white/90 text-sm pl-4 list-disc">
              {rules && rules.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          {/* Settings, GM Instructions, Goals 등 추가 항목 */}
          {settings && (
            <div className="p-5 rounded-xl border-2 border-cyan-400/20 bg-white/5">
              <div className="flex items-center gap-3 mb-2">
                <Settings size={20} className="text-cyan-400" />
                <h3 className="font-semibold text-cyan-400">Settings</h3>
              </div>
              <div className="text-white/90 text-sm whitespace-pre-line">{settings}</div>
            </div>
          )}
          {gmInstructions && (
            <div className="p-5 rounded-xl border-2 border-pink-400/20 bg-white/5">
              <div className="flex items-center gap-3 mb-2">
                <Settings size={20} className="text-pink-400" />
                <h3 className="font-semibold text-pink-400">GM Instructions</h3>
              </div>
              <div className="text-white/90 text-sm whitespace-pre-line">{gmInstructions}</div>
            </div>
          )}
          {goals && goals.length > 0 && (
            <div className="p-5 rounded-xl border-2 border-yellow-400/20 bg-white/5">
              <div className="flex items-center gap-3 mb-2">
                <Settings size={20} className="text-yellow-400" />
                <h3 className="font-semibold text-yellow-400">Goals</h3>
              </div>
              <ul className="text-white/90 text-sm pl-4 list-disc">
                {goals.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          )}
          {imageUrl && (
            <div className="p-5 rounded-xl border-2 border-indigo-400/20 bg-white/5 flex flex-col items-center">
              <img src={imageUrl} alt="Blueprint" className="rounded-xl max-w-full max-h-60 object-cover mb-2" />
              <span className="text-white/60 text-xs">AI Generated Image</span>
            </div>
          )}
        </div>
      </div>
      {/* 하단 버튼 */}
      <div className="absolute bottom-[114px] left-0 right-0 p-4 flex flex-row gap-2">
        <button
          onClick={onLivePreview}
          className="w-1/2 py-4 px-6 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white"
        >
          <Sparkles size={20} />
          Live Preview
        </button>
        <button
          onClick={onApply}
          className="w-1/2 py-4 px-6 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
        >
          Apply
        </button>
      </div>
      {/* Buy Gems Modal, Custom Foundation Modal 등 필요시 추가 */}
    </>
  );
}; 