import React, { useEffect, useRef, useState } from 'react';
import { SpiderWeb, AsymmetricWeb, DewDrops, Spider } from './SpiderWeb';

const milestones = [
  { year: '1974', title: 'First thread spun', desc: 'Silkstrand opens with 42 students in a converted weaver\'s barn on Weaver Lane.' },
  { year: '1988', title: 'Arts Conservatory', desc: 'Nine studio ateliers launch — ceramics, strings, printmaking, and film.' },
  { year: '2001', title: 'Global Year begins', desc: 'Grade-11 students embark on term-abroad partnerships in Kyoto and Oaxaca.' },
  { year: '2012', title: 'New wetland campus', desc: 'A 22-acre ecology campus opens, with gardens, ponds, and the Weaver Library.' },
  { year: '2019', title: 'Full K–12 program', desc: 'Upper school grows to twelfth grade with the first capstone-thesis cohort.' },
  { year: '2026', title: 'Today', desc: 'A community of 820 students, 94 faculty, and threads spun to 37 countries.' },
];

export default function Timeline() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [pathLen, setPathLen] = useState(1);
  const [spiderPos, setSpiderPos] = useState({ x: 0, y: 0, angle: 0 });
  const [visible, setVisible] = useState(new Set());
  const nodeRefs = useRef([]);

  // measure path length
  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  // scroll progress tied to section
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh * 0.6;
      const scrolled = Math.min(Math.max(-r.top + vh * 0.3, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      if (pathRef.current && pathLen) {
        const len = Math.min(p, 1) * pathLen;
        const pt = pathRef.current.getPointAtLength(len);
        const nxt = pathRef.current.getPointAtLength(Math.min(len + 1, pathLen));
        const ang = (Math.atan2(nxt.y - pt.y, nxt.x - pt.x) * 180) / Math.PI;
        setSpiderPos({ x: pt.x, y: pt.y, angle: ang });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathLen]);

  // reveal milestone nodes
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => new Set(v).add(Number(e.target.dataset.idx)));
      });
    }, { threshold: 0.4 });
    nodeRefs.current.forEach(n => n && io.observe(n));
    return () => io.disconnect();
  }, []);

  const VIEW_W = 1000;
  const VIEW_H = 1600;
  // S-curve path through 6 milestones
  const pathD = `M 500 40 
    C 700 180, 300 260, 500 400
    C 760 560, 240 620, 500 780
    C 740 920, 260 990, 500 1140
    C 760 1280, 260 1360, 500 1520`;

  const ND = pathLen;
  const visibleLen = Math.min(progress, 1) * ND;

  return (
    <section id="timeline" ref={sectionRef} className="relative py-28 overflow-hidden" data-testid="timeline-section">
      {/* decorative webs */}
      <div className="absolute left-0 top-40 opacity-50 pointer-events-none" style={{ transform: 'translateX(-40%)' }}>
        <AsymmetricWeb size={320} stroke="rgba(140,111,198,0.4)" />
      </div>
      <div className="absolute right-0 bottom-24 opacity-50 pointer-events-none" style={{ transform: 'translateX(38%)' }}>
        <SpiderWeb size={340} rings={6} spokes={12} stroke="rgba(95,178,136,0.4)" spin />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
        <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--lavender-deep)] mb-4">Our Story · 02b</div>
        <h2 className="font-display text-5xl lg:text-6xl tracking-tight leading-[1]">Threads through <em className="italic">time</em>.</h2>
        <p className="mt-6 max-w-xl text-[var(--ink-soft)] text-[16px] leading-relaxed">Fifty-two years of weaving. Scroll to follow the spider along the strand.</p>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
        {/* SVG path layer */}
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid meet" aria-hidden>
          {/* ghost path */}
          <path d={pathD} stroke="rgba(43,33,64,0.12)" strokeWidth="2" fill="none" strokeDasharray="4 6" />
          {/* drawn path */}
          <path
            ref={pathRef}
            d={pathD}
            stroke="url(#threadGrad)"
            strokeWidth="2.4"
            fill="none"
            strokeDasharray={pathLen}
            strokeDashoffset={pathLen - visibleLen}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          <defs>
            <linearGradient id="threadGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8C6FC6" />
              <stop offset="50%" stopColor="#5FB288" />
              <stop offset="100%" stopColor="#F08F5F" />
            </linearGradient>
          </defs>

          {/* dew drops along path */}
          {[0.15, 0.32, 0.48, 0.66, 0.82].map((t, i) => {
            if (!pathRef.current || !pathLen) return null;
            const pt = pathRef.current.getPointAtLength(t * pathLen);
            const on = progress > t;
            return (
              <g key={i} style={{ opacity: on ? 1 : 0.25, transition: 'opacity .5s ease' }}>
                <circle cx={pt.x} cy={pt.y} r={on ? 6 : 3} fill="#B5E3CC" opacity="0.9" style={{ transition: 'r .4s cubic-bezier(.2,.7,.2,1)' }} />
                <circle cx={pt.x - 1.5} cy={pt.y - 1.5} r="1.6" fill="#fff" />
              </g>
            );
          })}

          {/* crawling spider */}
          {pathRef.current && pathLen > 1 && (
            <g transform={`translate(${spiderPos.x} ${spiderPos.y}) rotate(${spiderPos.angle + 90})`} style={{ transition: 'transform 0.08s linear' }}>
              <g transform="translate(-14 -14) scale(0.9)">
                <g stroke="#2B2140" strokeWidth="1.4" strokeLinecap="round" fill="none">
                  <path d="M14 16 L2 6" /><path d="M14 16 L-2 14" /><path d="M14 16 L2 24" />
                  <path d="M14 16 L26 6" /><path d="M14 16 L30 14" /><path d="M14 16 L26 24" />
                </g>
                <ellipse cx="14" cy="17" rx="7" ry="6" fill="#2B2140" />
                <circle cx="14" cy="11" r="4" fill="#2B2140" />
                <circle cx="12.5" cy="10.5" r="0.9" fill="#B5E3CC" />
                <circle cx="15.5" cy="10.5" r="0.9" fill="#FFD3B5" />
              </g>
            </g>
          )}
        </svg>

        {/* milestone cards, positioned alternately */}
        <div className="relative" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
          {milestones.map((m, i) => {
            // anchor y positions roughly align with path curve endpoints
            const yPct = (i / (milestones.length - 1)) * 96 + 2;
            const side = i % 2 === 0 ? 'left' : 'right';
            const isIn = visible.has(i);
            return (
              <div
                key={m.year}
                ref={el => nodeRefs.current[i] = el}
                data-idx={i}
                data-testid={`milestone-${i}`}
                className={`absolute top-0 w-[44%] ${side === 'left' ? 'left-0 text-right pr-8' : 'right-0 text-left pl-8'}`}
                style={{
                  top: `${yPct}%`,
                  transform: isIn ? 'translateY(-50%)' : `translateY(calc(-50% + 18px))`,
                  opacity: isIn ? 1 : 0,
                  transition: 'opacity .7s ease, transform .9s cubic-bezier(.2,.7,.2,1)',
                }}
              >
                <div className={`inline-block ${side === 'left' ? 'items-end' : 'items-start'}`} data-web-anchor>
                  <div className="flex items-center gap-3 mb-2" style={{ flexDirection: side === 'left' ? 'row-reverse' : 'row' }}>
                    <span className="w-2 h-2 rounded-full bg-[var(--lavender-deep)]" />
                    <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--lavender-deep)]">Milestone · {i + 1}</span>
                  </div>
                  <div className="font-display text-5xl lg:text-6xl leading-none text-[var(--ink)]">{m.year}</div>
                  <h3 className="font-display text-2xl mt-3">{m.title}</h3>
                  <p className="text-[14px] text-[var(--ink-soft)] mt-2 leading-relaxed max-w-[320px] inline-block">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
