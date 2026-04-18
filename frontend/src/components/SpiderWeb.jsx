import React from 'react';
import { buildWeb } from '../lib/web';

export const SpiderWeb = ({ size = 420, rings = 6, spokes = 14, className = '', stroke = 'rgba(43,33,64,0.18)', spin = false }) => {
  const r = size / 2 - 4;
  const { spokes: sp, rings: rg } = buildWeb({ radius: r, rings, spokes, cx: 0, cy: 0 });
  return (
    <svg width={size} height={size} viewBox={`${-size/2} ${-size/2} ${size} ${size}`} className={`${className} ${spin ? 'web-spin' : ''}`} aria-hidden>
      {sp.map((d, i) => (<path key={`s${i}`} d={d} stroke={stroke} strokeWidth="1" fill="none" />))}
      {rg.map((d, i) => (<path key={`r${i}`} d={d} stroke={stroke} strokeWidth="1" fill="none" />))}
    </svg>
  );
};

export const QuarterWeb = ({ size = 520, corner = 'tl', stroke = 'rgba(140,111,198,0.35)', className = '' }) => {
  const origin = {
    tl: { x: 0, y: 0, rot: 0 },
    tr: { x: size, y: 0, rot: 90 },
    br: { x: size, y: size, rot: 180 },
    bl: { x: 0, y: size, rot: 270 },
  }[corner];
  const rings = 7, spokes = 10;
  const paths = [];
  for (let i = 0; i < spokes; i++) {
    const a = (i / (spokes - 1)) * (Math.PI / 2);
    const x = Math.cos(a) * size;
    const y = Math.sin(a) * size;
    paths.push(<path key={`s${i}`} d={`M 0 0 L ${x} ${y}`} stroke={stroke} fill="none" strokeWidth="1" />);
  }
  for (let r = 1; r <= rings; r++) {
    const rr = (r / rings) * size;
    const pts = [];
    for (let i = 0; i < spokes; i++) {
      const a = (i / (spokes - 1)) * (Math.PI / 2);
      const px = Math.cos(a) * rr;
      const py = Math.sin(a) * rr;
      pts.push(`${i === 0 ? 'M' : 'L'} ${px.toFixed(2)} ${py.toFixed(2)}`);
    }
    paths.push(<path key={`r${r}`} d={pts.join(' ')} stroke={stroke} fill="none" strokeWidth="1" />);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} style={{ transform: `translate(${origin.x - (corner.includes('r') ? size : 0)}px, ${origin.y - (corner.includes('b') ? size : 0)}px) rotate(${origin.rot}deg)` }} aria-hidden>
      <g transform={corner === 'tl' ? '' : corner === 'tr' ? `translate(${size} 0) scale(-1 1)` : corner === 'br' ? `translate(${size} ${size}) scale(-1 -1)` : `translate(0 ${size}) scale(1 -1)`}>
        {paths}
      </g>
    </svg>
  );
};

export const Spider = ({ size = 36, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden>
    <g stroke="#2B2140" strokeWidth="1.6" strokeLinecap="round" fill="none">
      <path d="M32 38 L12 22" /><path d="M32 38 L8 30" /><path d="M32 38 L12 44" /><path d="M32 38 L10 54" />
      <path d="M32 38 L52 22" /><path d="M32 38 L56 30" /><path d="M32 38 L52 44" /><path d="M32 38 L54 54" />
    </g>
    <ellipse cx="32" cy="40" rx="11" ry="9" fill="#2B2140" />
    <circle cx="32" cy="30" r="6" fill="#2B2140" />
    <circle cx="30" cy="29" r="1.2" fill="#B5E3CC" />
    <circle cx="34" cy="29" r="1.2" fill="#FFD3B5" />
  </svg>
);
