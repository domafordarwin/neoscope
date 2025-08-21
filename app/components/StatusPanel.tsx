'use client';

import { useState, useEffect } from 'react';

interface SystemStatus {
  cpu: number;
  memory: number;
  temperature: number;
  uptime: string;
}

export default function StatusPanel({ isConnected }: { isConnected: boolean }) {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpu: 0,
    memory: 0,
    temperature: 25,
    uptime: '00:00:00'
  });

  const [neopixelStatus, setNeopixelStatus] = useState({
    isConnected: false,
    ledCount: 0,
    firmwareVersion: '1.0.0',
    lastUpdate: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    // 시스템 상태 시뮬레이션
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        cpu: Math.floor(Math.random() * 30) + 10,
        memory: Math.floor(Math.random() * 20) + 30,
        temperature: Math.floor(Math.random() * 10) + 22,
        uptime: prev.uptime
      }));
    }, 2000);

    // 네오픽셀 상태 시뮬레이션
    const neopixelInterval = setInterval(() => {
      setNeopixelStatus(prev => ({
        ...prev,
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(neopixelInterval);
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      setTimeout(() => {
        setNeopixelStatus(prev => ({
          ...prev,
          isConnected: true,
          ledCount: 24
        }));
      }, 1000);
    }
  }, [isConnected]);

  const getStatusColor = (status: boolean) => {
    return status ? 'text-green-400' : 'text-red-400';
  };

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-green-300">시스템 상태</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 연결 상태 */}
        <div className="bg-black/20 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-200">연결 상태</h3>
            <div className={`${getStatusColor(isConnected)}`}>
              {getStatusIcon(isConnected)}
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-300">
            {isConnected ? '연결됨' : '연결 안됨'}
          </div>
          <p className="text-xs text-blue-400 mt-1">
            {isConnected ? '시스템 정상 작동 중' : '연결을 확인해주세요'}
          </p>
        </div>

        {/* CPU 사용률 */}
        <div className="bg-black/20 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-200">CPU 사용률</h3>
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-blue-300">
            {systemStatus.cpu}%
          </div>
          <div className="w-full bg-blue-500/20 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${systemStatus.cpu}%` }}
            />
          </div>
        </div>

        {/* 메모리 사용률 */}
        <div className="bg-black/20 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-200">메모리 사용률</h3>
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-blue-300">
            {systemStatus.memory}%
          </div>
          <div className="w-full bg-blue-500/20 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${systemStatus.memory}%` }}
            />
          </div>
        </div>

        {/* 온도 */}
        <div className="bg-black/20 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-200">시스템 온도</h3>
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-blue-300">
            {systemStatus.temperature}°C
          </div>
          <p className="text-xs text-blue-400 mt-1">
            {systemStatus.temperature < 30 ? '정상' : '주의 필요'}
          </p>
        </div>
      </div>

      {/* 네오픽셀 상태 */}
      <div className="mt-6 bg-black/20 rounded-lg p-4 border border-yellow-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <h3 className="text-lg font-medium text-yellow-200">네오픽셀 상태</h3>
          <div className={`${getStatusColor(neopixelStatus.isConnected)}`}>
            {getStatusIcon(neopixelStatus.isConnected)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm text-yellow-300 mb-1">연결 상태</div>
            <div className={`text-lg font-semibold ${getStatusColor(neopixelStatus.isConnected)}`}>
              {neopixelStatus.isConnected ? '연결됨' : '연결 안됨'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-yellow-300 mb-1">LED 개수</div>
            <div className="text-lg font-semibold text-yellow-200">
              {neopixelStatus.ledCount}개
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-yellow-300 mb-1">펌웨어 버전</div>
            <div className="text-lg font-semibold text-yellow-200">
              v{neopixelStatus.firmwareVersion}
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-yellow-400">
          마지막 업데이트: {neopixelStatus.lastUpdate}
        </div>
      </div>

      {/* 시스템 정보 */}
      <div className="mt-6 bg-black/20 rounded-lg p-4 border border-green-500/20">
        <h3 className="text-lg font-medium text-green-200 mb-4">시스템 정보</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-green-300">가동 시간:</span>
            <span className="text-green-200 ml-2 font-mono">{systemStatus.uptime}</span>
          </div>
          <div>
            <span className="text-green-300">네트워크:</span>
            <span className="text-green-200 ml-2">WiFi 연결됨</span>
          </div>
          <div>
            <span className="text-green-300">IP 주소:</span>
            <span className="text-green-200 ml-2 font-mono">192.168.1.100</span>
          </div>
          <div>
            <span className="text-green-300">MAC 주소:</span>
            <span className="text-green-200 ml-2 font-mono">AA:BB:CC:DD:EE:FF</span>
          </div>
        </div>
      </div>
    </div>
  );
} 