'use client';

import { useState, useEffect } from 'react';
import MicroscopeControl from './components/MicroscopeControl';
import LightControl from './components/LightControl';
import StatusPanel from './components/StatusPanel';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('연결 대기 중...');

  useEffect(() => {
    // 연결 상태 시뮬레이션
    const timer = setTimeout(() => {
      setIsConnected(true);
      setConnectionStatus('연결됨');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-blue-500/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  NeoScope
                </h1>
                <p className="text-blue-200 text-sm">네오픽셀 현미경 조명 제어 시스템</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                isConnected 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
              }`}>
                {connectionStatus}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Microscope Control Panel */}
          <div className="lg:col-span-2">
            <MicroscopeControl />
          </div>

          {/* Light Control Panel */}
          <div className="lg:col-span-1">
            <LightControl />
          </div>
        </div>

        {/* Status Panel */}
        <div className="mt-8">
          <StatusPanel isConnected={isConnected} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-blue-500/30 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-blue-300 text-sm">
            <p>&copy; 2024 NeoScope - 네오픽셀 현미경 조명 제어 시스템</p>
            <p className="mt-2">고정밀 LED 조명 제어로 최적의 관찰 환경을 제공합니다</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
