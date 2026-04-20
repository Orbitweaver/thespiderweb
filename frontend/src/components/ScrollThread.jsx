import React from 'react';
import { useScrollProgress } from '../lib/interactions';

/* Thread progress bar across the top */
export default function ScrollThread() {
  const p = useScrollProgress();
  return (
    <div className="fixed top-0 inset-x-0 z-[60] pointer-events-none h-[3px]" data-testid="scroll-thread">
      <div className="relative h-full">
        <div className="absolute inset-y-0 left-0" style={{
          width: `${p * 100}%`,
          background: 'linear-gradient(90deg, #8C6FC6, #5FB288, #F08F5F)',
          transition: 'width .05s linear',
          boxShadow: '0 0 12px rgba(140,111,198,0.45)'
        }} />
        {/* spider riding the thread */}
        <svg width="18" height="18" viewBox="0 0 64 64" aria-hidden className="absolute" style={{ left: `calc(${p * 100}% - 9px)`, top: -9, transition: 'left .05s linear' }}>
          <g stroke="#2B2140" strokeWidth="2.2" strokeLinecap="round" fill="none">
            <path d="M32 38 L12 22" /><path d="M32 38 L8 30" /><path d="M32 38 L12 44" /><path d="M32 38 L10 54" />
            <path d="M32 38 L52 22" /><path d="M32 38 L56 30" /><path d="M32 38 L52 44" /><path d="M32 38 L54 54" />
          </g>
          <ellipse cx="32" cy="40" rx="11" ry="9" fill="#2B2140" />
          <circle cx="32" cy="30" r="6" fill="#2B2140" />
        </svg>
      </div>
    </div>
  );
}
