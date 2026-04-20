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
  const rings = 7, spokes = 10;
  const paths = [];
  for (let i = 0; i < spokes; i++) {
    const a = (i / (spokes - 1)) * (Math.PI / 2);
    paths.push(<path key={`s${i}`} d={`M 0 0 L ${Math.cos(a) * size} ${Math.sin(a) * size}`} stroke={stroke} fill="none" strokeWidth="1" />);
  }
  for (let r = 1; r <= rings; r++) {
    const rr = (r / rings) * size;
    const pts = [];
    for (let i = 0; i < spokes; i++) {
      const a = (i / (spokes - 1)) * (Math.PI / 2);
      pts.push(`${i === 0 ? 'M' : 'L'} ${(Math.cos(a) * rr).toFixed(2)} ${(Math.sin(a) * rr).toFixed(2)}`);
    }
    paths.push(<path key={`r${r}`} d={pts.join(' ')} stroke={stroke} fill="none" strokeWidth="1" />);
  }
  const t = { tl: '', tr: `translate(${size} 0) scale(-1 1)`, br: `translate(${size} ${size}) scale(-1 -1)`, bl: `translate(0 ${size}) scale(1 -1)` }[corner];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden>
      <g transform={t}>{paths}</g>
    </svg>
  );
};

/* Spider — also accepts wobble prop */
export const Spider = ({ size = 36, className = '', wobble = false }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={`${className} ${wobble ? 'spider-wobble' : ''}`} aria-hidden>
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

/* HangingWeb — small web dangling from a thread with optional spider */
export const HangingWeb = ({ size = 160, threadLen = 120, stroke = 'rgba(140,111,198,0.45)', withSpider = false, className = '' }) => (
  <svg width={size} height={size + threadLen} viewBox={`${-size/2} 0 ${size} ${size + threadLen}`} className={className} aria-hidden>
    <line x1="0" y1="0" x2="0" y2={threadLen} stroke="rgba(43,33,64,0.35)" strokeWidth="1" />
    <g transform={`translate(0 ${threadLen + size/2}) rotate(-6)`} className="float-slow">
      <WebPrimitive radius={size/2 - 2} rings={5} spokes={10} stroke={stroke} />
    </g>
    {withSpider && (
      <g transform={`translate(-10 ${threadLen + size/2 - 6})`}>
        <g stroke="#2B2140" strokeWidth="1.2" strokeLinecap="round" fill="none">
          <path d="M10 10 L -2 2"/><path d="M10 10 L -4 10"/><path d="M10 10 L -2 18"/>
          <path d="M10 10 L 22 2"/><path d="M10 10 L 24 10"/><path d="M10 10 L 22 18"/>
        </g>
        <ellipse cx="10" cy="11" rx="6" ry="5" fill="#2B2140"/>
        <circle cx="10" cy="7" r="3" fill="#2B2140"/>
      </g>
    )}
  </svg>
);

/* AsymmetricWeb — organic repaired web */
export const AsymmetricWeb = ({ size = 260, stroke = 'rgba(95,178,136,0.45)', className = '' }) => {
  const spokes = 9;
  const sp = [];
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2 + (Math.sin(i) * 0.08);
    const r = size / 2 - 4 + Math.sin(i * 1.7) * 8;
    sp.push(`M 0 0 L ${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`);
  }
  const rings = [];
  for (let r = 1; r <= 5; r++) {
    const pts = [];
    for (let i = 0; i <= spokes; i++) {
      const a = (i / spokes) * Math.PI * 2 + Math.sin(i * r * 0.6) * 0.05;
      const rr = (r / 5) * (size / 2 - 6) * (1 + Math.sin(i + r) * 0.04);
      pts.push(`${i === 0 ? 'M' : 'L'} ${(Math.cos(a) * rr).toFixed(2)} ${(Math.sin(a) * rr).toFixed(2)}`);
    }
    rings.push(pts.join(' '));
  }
  return (
    <svg width={size} height={size} viewBox={`${-size/2} ${-size/2} ${size} ${size}`} className={className} aria-hidden>
      {sp.map((d, i) => (<path key={`as${i}`} d={d} stroke={stroke} strokeWidth="1" fill="none" />))}
      {rings.map((d, i) => (<path key={`ar${i}`} d={d} stroke={stroke} strokeWidth="1" fill="none" />))}
    </svg>
  );
};

/* BrokenWeb — torn strands */
export const BrokenWeb = ({ size = 200, stroke = 'rgba(240,143,95,0.5)', className = '' }) => {
  const spokes = 10;
  const sp = [];
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2;
    const cut = i % 3 === 0 ? 0.55 : 1;
    sp.push(`M 0 0 L ${(Math.cos(a) * (size / 2) * cut).toFixed(2)} ${(Math.sin(a) * (size / 2) * cut).toFixed(2)}`);
  }
  const arcs = [];
  for (let r = 1; r <= 4; r++) {
    const rr = (r / 4) * (size / 2 - 6);
    for (let i = 0; i < spokes; i++) {
      if ((i + r) % 4 === 0) continue;
      const a1 = (i / spokes) * Math.PI * 2;
      const a2 = ((i + 1) / spokes) * Math.PI * 2;
      arcs.push(`M ${(Math.cos(a1) * rr).toFixed(2)} ${(Math.sin(a1) * rr).toFixed(2)} A ${rr} ${rr} 0 0 1 ${(Math.cos(a2) * rr).toFixed(2)} ${(Math.sin(a2) * rr).toFixed(2)}`);
    }
  }
  return (
    <svg width={size} height={size} viewBox={`${-size/2} ${-size/2} ${size} ${size}`} className={className} aria-hidden>
      {sp.map((d, i) => (<path key={`bs${i}`} d={d} stroke={stroke} strokeWidth="1" fill="none" />))}
      {arcs.map((d, i) => (<path key={`ba${i}`} d={d} stroke={stroke} strokeWidth="1" fill="none" />))}
    </svg>
  );
};

/* MoonWeb — half-disc web for section edges */
export const MoonWeb = ({ size = 400, stroke = 'rgba(201,182,228,0.5)', className = '' }) => {
  const spokes = 11;
  const sp = [];
  for (let i = 0; i < spokes; i++) {
    const a = (i / (spokes - 1)) * Math.PI - Math.PI;
    sp.push(`M 0 0 L ${(Math.cos(a) * size).toFixed(2)} ${(Math.sin(a) * size).toFixed(2)}`);
  }
  const rings = [];
  for (let r = 1; r <= 6; r++) {
    const rr = (r / 6) * size;
    const pts = [];
    for (let i = 0; i < spokes; i++) {
      const a = (i / (spokes - 1)) * Math.PI - Math.PI;
      pts.push(`${i === 0 ? 'M' : 'L'} ${(Math.cos(a) * rr).toFixed(2)} ${(Math.sin(a) * rr).toFixed(2)}`);
    }
    rings.push(pts.join(' '));
  }
  return (
    <svg width={size * 2} height={size} viewBox={`${-size} ${-size} ${size * 2} ${size}`} className={className} aria-hidden>
      {sp.map((d, i) => (<path key={`ms${i}`} d={d} stroke={stroke} strokeWidth="1" fill="none" />))}
      {rings.map((d, i) => (<path key={`mr${i}`} d={d} stroke={stroke} strokeWidth="1" fill="none" />))}
    </svg>
  );
};

/* DewDrops — glistening droplets */
export const DewDrops = ({ points = [], className = '' }) => (
  <svg className={className} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden>
    {points.map((p, i) => (
      <g key={i} className="dew" style={{ animationDelay: `${i * 0.35}s` }}>
        <circle cx={p.x} cy={p.y} r={p.r || 4} fill={p.fill || '#B5E3CC'} opacity="0.9" />
        <circle cx={p.x - (p.r || 4) * 0.3} cy={p.y - (p.r || 4) * 0.3} r={(p.r || 4) * 0.25} fill="#fff" opacity="0.9" />
      </g>
    ))}
  </svg>
);

/* Internal primitive used by HangingWeb */
const WebPrimitive = ({ radius, rings, spokes, stroke }) => {
  const { spokes: sp, rings: rg } = buildWeb({ radius, rings, spokes, cx: 0, cy: 0 });
  return (
    <g>
      {sp.map((d, i) => (<path key={`ps${i}`} d={d} stroke={stroke} strokeWidth="1" fill="none" />))}
      {rg.map((d, i) => (<path key={`pr${i}`} d={d} stroke={stroke} strokeWidth="1" fill="none" />))}
    </g>
  );
};
