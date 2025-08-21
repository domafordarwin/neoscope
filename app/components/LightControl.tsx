'use client';

import { useState, useEffect } from 'react';

interface LightPreset {
  id: string;
  name: string;
  colors: { r: number; g: number; b: number; w: number };
  intensity: number;
}

export default function LightControl() {
  const [isLightOn, setIsLightOn] = useState(false);
  const [intensity, setIntensity] = useState(50);
  const [temperature, setTemperature] = useState(5500);
  const [currentPreset, setCurrentPreset] = useState<string>('white');
  const [customColor, setCustomColor] = useState({ r: 255, g: 255, b: 255, w: 0 });

  const lightPresets: LightPreset[] = [
    { id: 'white', name: '백색광', colors: { r: 255, g: 255, b: 255, w: 0 }, intensity: 50 },
    { id: 'warm', name: '따뜻한 빛', colors: { r: 255, g: 200, b: 150, w: 0 }, intensity: 60 },
    { id: 'cool', name: '차가운 빛', colors: { r: 150, g: 200, b: 255, w: 0 }, intensity: 55 },
    { id: 'uv', name: '자외선', colors: { r: 100, g: 0, b: 255, w: 0 }, intensity: 30 },
    { id: 'red', name: '적색광', colors: { r: 255, g: 0, b: 0, w: 0 }, intensity: 40 },
    { id: 'green', name: '녹색광', colors: { r: 0, g: 255, b: 0, w: 0 }, intensity: 45 },
    { id: 'blue', name: '청색광', colors: { r: 0, g: 0, b: 255, w: 0 }, intensity: 40 },
  ];

  const handlePresetChange = (presetId: string) => {
    const preset = lightPresets.find(p => p.id === presetId);
    if (preset) {
      setCurrentPreset(presetId);
      setCustomColor(preset.colors);
      setIntensity(preset.intensity);
    }
  };

  const handleColorChange = (channel: 'r' | 'g' | 'b' | 'w', value: number) => {
    setCustomColor(prev => ({ ...prev, [channel]: value }));
  };

  const toggleLight = () => {
    setIsLightOn(!isLightOn);
  };

  const sendToNeopixel = () => {
    // 네오픽셀에 명령 전송 시뮬레이션
    console.log('네오픽셀에 명령 전송:', {
      isOn: isLightOn,
      color: customColor,
      intensity,
      temperature
    });
  };

  useEffect(() => {
    sendToNeopixel();
  }, [isLightOn, customColor, intensity, temperature]);

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-yellow-300">네오픽셀 조명 제어</h2>
      </div>

      <div className="space-y-6">
        {/* 조명 ON/OFF */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-yellow-200">조명 상태</span>
          <button
            onClick={toggleLight}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isLightOn ? 'bg-yellow-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isLightOn ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* 조명 프리셋 */}
        <div>
          <label className="block text-sm font-medium text-yellow-200 mb-3">
            조명 프리셋
          </label>
          <div className="grid grid-cols-2 gap-2">
            {lightPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetChange(preset.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  currentPreset === preset.id
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/50'
                    : 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border border-yellow-500/30'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* 색상 제어 */}
        <div>
          <label className="block text-sm font-medium text-yellow-200 mb-3">
            RGBW 색상 제어
          </label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-red-300 w-4">R</span>
              <input
                type="range"
                min="0"
                max="255"
                value={customColor.r}
                onChange={(e) => handleColorChange('r', Number(e.target.value))}
                className="flex-1 h-2 bg-red-500/30 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-red-300 w-8 text-right">{customColor.r}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-green-300 w-4">G</span>
              <input
                type="range"
                min="0"
                max="255"
                value={customColor.g}
                onChange={(e) => handleColorChange('g', Number(e.target.value))}
                className="flex-1 h-2 bg-green-500/30 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-green-300 w-8 text-right">{customColor.g}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-blue-300 w-4">B</span>
              <input
                type="range"
                min="0"
                max="255"
                value={customColor.b}
                onChange={(e) => handleColorChange('b', Number(e.target.value))}
                className="flex-1 h-2 bg-blue-500/30 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-blue-300 w-8 text-right">{customColor.b}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-white w-4">W</span>
              <input
                type="range"
                min="0"
                max="255"
                value={customColor.w}
                onChange={(e) => handleColorChange('w', Number(e.target.value))}
                className="flex-1 h-2 bg-gray-500/30 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-white w-8 text-right">{customColor.w}</span>
            </div>
          </div>
          
          {/* 색상 미리보기 */}
          <div className="mt-3 p-3 rounded-lg border border-yellow-500/30 bg-black/20">
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-full border border-white/30"
                style={{
                  backgroundColor: `rgb(${customColor.r}, ${customColor.g}, ${customColor.b})`
                }}
              />
              <div className="text-xs text-yellow-200">
                <div>RGB: ({customColor.r}, {customColor.g}, {customColor.b})</div>
                <div>W: {customColor.w}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 밝기 제어 */}
        <div>
          <label className="block text-sm font-medium text-yellow-200 mb-3">
            밝기 조절
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-yellow-500/30 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-yellow-300 mt-1">
              <span>0%</span>
              <span className="font-medium">{intensity}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* 색온도 제어 */}
        <div>
          <label className="block text-sm font-medium text-yellow-200 mb-3">
            색온도 (K)
          </label>
          <div className="relative">
            <input
              type="range"
              min="2000"
              max="10000"
              step="100"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full h-2 bg-purple-500/30 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-purple-300 mt-1">
              <span>2000K</span>
              <span className="font-medium">{temperature}K</span>
              <span>10000K</span>
            </div>
          </div>
        </div>

        {/* 빠른 제어 */}
        <div>
          <label className="block text-sm font-medium text-yellow-200 mb-3">
            빠른 제어
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg text-yellow-300 text-xs font-medium transition-all">
              최대 밝기
            </button>
            <button className="px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg text-yellow-300 text-xs font-medium transition-all">
              조명 끄기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 