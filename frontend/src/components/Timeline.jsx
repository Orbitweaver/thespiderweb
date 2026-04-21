import React, { useEffect, useRef, useState } from 'react';
import { SpiderWeb, AsymmetricWeb } from './SpiderWeb';

const milestones = [
  {
    year: '01',
    prompt: 'What if real and hard work was part of the curriculum?',
    desc: 'We treat learning as labour — the kind that builds character. Every term, our students take on projects that matter: a family budget, a market survey, a neighbourhood cleanup.',
    tag: 'Curriculum by doing',
    img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&q=80',
    tone: 'warm',
  },
  {
    year: '02',
    prompt: 'What if villages were classrooms & communities were educators?',
    desc: 'We believe every elder, every shopkeeper, every farmer has something to teach. Our syllabus invites them in — by interview, by walk, by workshop.',
    tag: 'Community as faculty',
    img: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=900&q=80',
    tone: 'film',
  },
  {
    year: '03',
    prompt: 'What if schools were not defined by scores, but by curiosity?',
    desc: 'We prepare students for Cambridge IGCSE — rigorously. But we measure ourselves by the questions they learn to ask, not only by the grades they earn.',
    tag: 'Curiosity, first',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80',
    tone: 'clean',
  },
  {
    year: '04',
    prompt: 'What if factories became laboratories of real-world science?',
    desc: 'A bakery is chemistry. A workshop is physics. A clinic is biology. Our students learn to see the science in the places they already pass every day.',
    tag: 'Science, in place',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80',
    tone: 'crisp',
  },
  {
    year: '05',
    prompt: 'What if local markets taught Mathematics and Economics?',
    desc: 'Supply, demand, weight, price, margin, seasonality — the local market is the richest textbook we have. Every week, our students read it.',
    tag: 'Market as textbook',
    img: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900&q=80',
    tone: 'warm',
  },
];

const toneFilter = {
  sepia: 'sepia(0.55) saturate(0.75) contrast(0.95) brightness(0.95)',
  warm: 'sepia(0.18) saturate(1.05) contrast(1.02) hue-rotate(-6deg)',
  film: 'saturate(0.9) contrast(1.05) brightness(0.98)',
  clean: 'saturate(0.95) contrast(1.02)',
  crisp: 'saturate(1.05) contrast(1.05)',
};

export default function Timeline() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [pathLen, setPathLen] = useState(1);
  const [spiderPos, setSpiderPos] = useState({ x: 0, y: 0, angle: 0 });
  const [visible, setVisible] = useState(new Set());
  const nodeRefs = useRef([]);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

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

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => new Set(v).add(Number(e.target.dataset.idx)));
      });
    }, { threshold: 0.35 });
    nodeRefs.current.forEach(n => n && io.observe(n));
    return () => io.disconnect();
  }, []);

  const VIEW_W = 1000;
  const VIEW_H = 1500;
  const pathD = `M 500 40 
    C 720 180, 280 260, 500 420
    C 780 580, 220 660, 500 820
    C 760 980, 240 1060, 500 1220
    C 760 1360, 240 1450, 500 1480`;

  const visibleLen = Math.min(progress, 1) * pathLen;

  return (
    <section id="timeline" ref={sectionRef} className="relative py-28 overflow-hidden" data-testid="timeline-section">
      <div className="absolute left-0 top-40 opacity-50 pointer-events-none" style={{ transform: 'translateX(-40%)' }}>
        <AsymmetricWeb size={320} stroke="rgba(140,111,198,0.4)" />
      </div>
      <div className="absolute right-0 bottom-24 opacity-50 pointer-events-none" style={{ transform: 'translateX(38%)' }}>
        <SpiderWeb size={340} rings={6} spokes={12} stroke="rgba(95,178,136,0.4)" spin />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
        <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--lavender-deep)] mb-4">Our Vision · 02b</div>
        <h2 className="font-display text-5xl lg:text-6xl tracking-tight leading-[1]">Five <em className="italic">what-ifs</em> we live by.</h2>
        <p className="mt-6 max-w-xl text-[var(--ink-soft)] text-[16px] leading-relaxed">The Web began as a series of questions — and we haven't stopped asking them. Scroll to follow the spider along the strand.</p>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <path d={pathD} stroke="rgba(43,33,64,0.12)" strokeWidth="2" fill="none" strokeDasharray="4 6" />
          <path
            ref={pathRef}
            d={pathD}
            stroke="url(#threadGrad2)"
            strokeWidth="2.4"
            fill="none"
            strokeDasharray={pathLen}
            strokeDashoffset={pathLen - visibleLen}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          <defs>
            <linearGradient id="threadGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8C6FC6" />
              <stop offset="50%" stopColor="#5FB288" />
              <stop offset="100%" stopColor="#F08F5F" />
            </linearGradient>
          </defs>

          {[0.18, 0.38, 0.58, 0.78].map((t, i) => {
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

        <div className="relative" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
          {milestones.map((m, i) => {
            const yPct = (i / (milestones.length - 1)) * 92 + 4;
            const side = i % 2 === 0 ? 'left' : 'right';
            const isIn = visible.has(i);
            return (
              <div
                key={m.year}
                ref={el => nodeRefs.current[i] = el}
                data-idx={i}
                data-testid={`milestone-${i}`}
                className={`absolute w-[46%] ${side === 'left' ? 'left-0' : 'right-0'}`}
                style={{
                  top: `${yPct}%`,
                  transform: isIn ? 'translateY(-50%)' : 'translateY(calc(-50% + 22px))',
                  opacity: isIn ? 1 : 0,
                  transition: 'opacity .8s ease, transform 1s cubic-bezier(.2,.7,.2,1)',
                }}
              >
                <div className={`flex gap-6 ${side === 'left' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`} data-web-anchor>
                  <WebDisc img={m.img} tone={m.tone} index={i} />
                  <div className="flex-1 min-w-0">
                    <div className={`flex items-center gap-2 mb-2 ${side === 'left' ? 'flex-row-reverse' : ''}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--lavender-deep)]" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--lavender-deep)]">{m.tag}</span>
                    </div>
                    <div className="font-display text-5xl lg:text-6xl leading-none text-[var(--ink)]">{m.year}</div>
                    <h3 className="font-display italic text-xl lg:text-2xl mt-3 leading-snug">{m.prompt}</h3>
                    <p className="text-[13.5px] text-[var(--ink-soft)] mt-3 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const WebDisc = ({ img, tone, index }) => {
  const size = 128;
  const spokes = 12;
  const rings = 5;
  return (
    <div className="shrink-0 relative group" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(140,111,198,0.18), transparent 70%)', transform: 'scale(1.35)' }} />
      <div className="absolute inset-0 rounded-full overflow-hidden border-2" style={{ borderColor: 'rgba(43,33,64,0.12)' }}>
        <img
          src={img}
          alt=""
          loading="lazy"
          draggable="false"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ filter: toneFilter[tone] || '' }}
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,211,181,0.25), transparent 60%)' }} />
      </div>
      <svg width={size} height={size} viewBox={`${-size/2} ${-size/2} ${size} ${size}`} className="absolute inset-0 web-spin-slow pointer-events-none" aria-hidden>
        {Array.from({ length: spokes }).map((_, s) => {
          const a = (s / spokes) * Math.PI * 2;
          return <line key={s} x1="0" y1="0" x2={Math.cos(a) * (size / 2 - 2)} y2={Math.sin(a) * (size / 2 - 2)} stroke="rgba(251,247,242,0.42)" strokeWidth="0.6" />;
        })}
        {Array.from({ length: rings }).map((_, r) => {
          const rr = ((r + 1) / rings) * (size / 2 - 2);
          const pts = [];
          for (let i = 0; i <= spokes; i++) {
            const a = (i / spokes) * Math.PI * 2;
            pts.push(`${i === 0 ? 'M' : 'L'} ${(Math.cos(a) * rr).toFixed(2)} ${(Math.sin(a) * rr).toFixed(2)}`);
          }
          return <path key={`r${r}`} d={pts.join(' ')} stroke="rgba(251,247,242,0.35)" strokeWidth="0.6" fill="none" />;
        })}
      </svg>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[var(--ink)] text-[var(--cream)] text-[9px] tracking-[0.28em] uppercase font-medium">
        #{String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
};
