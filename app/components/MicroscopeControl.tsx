'use client';

import { useState } from 'react';

export default function MicroscopeControl() {
  const [magnification, setMagnification] = useState(100);
  const [focus, setFocus] = useState(50);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);
  const [isAutoFocus, setIsAutoFocus] = useState(false);

  const magnifications = [40, 100, 200, 400, 1000];

  const handleMagnificationChange = (mag: number) => {
    setMagnification(mag);
  };

  const handleFocusChange = (value: number) => {
    setFocus(value);
  };

  const handleStageMove = (x: number, y: number) => {
    setStageX(x);
    setStageY(y);
  };

  const toggleAutoFocus = () => {
    setIsAutoFocus(!isAutoFocus);
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-blue-300">현미경 제어</h2>
      </div>

      <div className="space-y-6">
        {/* 배율 제어 */}
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-3">
            배율 선택
          </label>
          <div className="grid grid-cols-5 gap-2">
            {magnifications.map((mag) => (
              <button
                key={mag}
                onClick={() => handleMagnificationChange(mag)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  magnification === mag
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30'
                }`}
              >
                {mag}x
              </button>
            ))}
          </div>
        </div>

        {/* 초점 제어 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-blue-200">
              초점 조절
            </label>
            <button
              onClick={toggleAutoFocus}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isAutoFocus
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
              }`}
            >
              {isAutoFocus ? '자동 초점 ON' : '자동 초점 OFF'}
            </button>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={focus}
              onChange={(e) => handleFocusChange(Number(e.target.value))}
              className="w-full h-2 bg-blue-500/20 rounded-lg appearance-none cursor-pointer slider"
              disabled={isAutoFocus}
            />
            <div className="flex justify-between text-xs text-blue-300 mt-1">
              <span>가까움</span>
              <span className="font-medium">{focus}</span>
              <span>멀음</span>
            </div>
          </div>
        </div>

        {/* 스테이지 제어 */}
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-3">
            스테이지 위치 제어
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-blue-300 mb-2">X축</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleStageMove(stageX - 1, stageY)}
                  className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="w-16 text-center text-sm font-mono text-blue-200 bg-black/20 px-2 py-1 rounded">
                  {stageX}
                </span>
                <button
                  onClick={() => handleStageMove(stageX + 1, stageY)}
                  className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-blue-300 mb-2">Y축</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleStageMove(stageX, stageY - 1)}
                  className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <span className="w-16 text-center text-sm font-mono text-blue-200 bg-black/20 px-2 py-1 rounded">
                  {stageY}
                </span>
                <button
                  onClick={() => handleStageMove(stageX, stageY + 1)}
                  className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 빠른 제어 버튼 */}
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-3">
            빠른 제어
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 text-sm font-medium transition-all">
              홈 위치로
            </button>
            <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg text-yellow-300 text-sm font-medium transition-all">
              초점 리셋
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 