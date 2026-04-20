import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Spider, SpiderWeb } from './SpiderWeb';

const LINKS = [
  { id: 'home', label: 'Home', n: '01' },
  { id: 'about', label: 'About', n: '02' },
  { id: 'academics', label: 'Academics', n: '03' },
  { id: 'admissions', label: 'Admissions', n: '04' },
  { id: 'events', label: 'Events', n: '05' },
  { id: 'stories', label: 'Stories', n: '06' },
  { id: 'contact', label: 'Contact', n: '07' },
];

export default function MobileDrawer({ open, onClose }) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  // Mount/unmount with transition
  useEffect(() => {
    if (open) {
      setMounted(true);
      // next frame, flip visible true to trigger enter transitions
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      document.body.style.overflow = 'hidden';
    } else if (mounted) {
      setVisible(false);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = '';
      }, 850);
    }
    return () => document.body.style.overflow && (document.body.style.overflow = '');
    // eslint-disable-next-line
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!mounted) return null;

  const go = (id) => {
    onClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-[70] md:hidden"
      data-testid="mobile-drawer"
      role="dialog"
      aria-modal="true"
    >
      {/* Ink overlay with clip-path weave */}
      <div
        className="absolute inset-0 bg-[var(--ink)] text-[var(--cream)]"
        style={{
          clipPath: visible ? 'circle(160% at 100% 0%)' : 'circle(0% at 100% 0%)',
          transition: 'clip-path 0.85s cubic-bezier(.76,0,.24,1)',
        }}
      >
        {/* Big rotating web top-left */}
        <div
          className="absolute -top-32 -left-28 pointer-events-none"
          style={{
            opacity: visible ? 0.32 : 0,
            transform: visible ? 'rotate(0deg) scale(1)' : 'rotate(-60deg) scale(0.4)',
            transition: 'opacity .7s ease .25s, transform 1.1s cubic-bezier(.2,.7,.2,1) .15s',
          }}
        >
          <SpiderWeb size={460} rings={7} spokes={14} stroke="rgba(201,182,228,0.6)" spin />
        </div>

        {/* Dangling spider */}
        <div
          className="absolute top-0 right-12 flex flex-col items-center pointer-events-none"
          style={{
            transform: visible ? 'translateY(0)' : 'translateY(-160px)',
            opacity: visible ? 1 : 0,
            transition: 'transform 1s cubic-bezier(.2,.7,.2,1) .35s, opacity .4s ease .35s',
          }}
        >
          <div className="w-px bg-[var(--lavender)]/60 h-28" />
          <Spider size={36} wobble />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          data-testid="drawer-close-btn"
          className="absolute top-6 left-6 w-11 h-11 rounded-full border border-white/25 bg-white/5 flex items-center justify-center hover:bg-white/15 transition-colors"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'rotate(0)' : 'rotate(-90deg)',
            transition: 'opacity .4s ease .4s, transform .6s cubic-bezier(.2,.7,.2,1) .4s, background-color .2s ease',
          }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand label */}
        <div
          className="absolute top-7 right-6 text-right"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-12px)',
            transition: 'opacity .5s ease .45s, transform .7s cubic-bezier(.2,.7,.2,1) .45s',
          }}
        >
          <div className="font-display text-[18px] leading-none">Silkstrand</div>
          <div className="text-[9px] uppercase tracking-[0.26em] text-[var(--lavender)] mt-1">Academy</div>
        </div>

        {/* Animated thread path drawing through the list */}
        <svg
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 700"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M 40 110 C 140 170, 120 260, 60 330 C 10 400, 80 470, 140 540 C 200 610, 120 660, 60 690"
            stroke="url(#drawerThread)"
            strokeWidth="1.3"
            fill="none"
            strokeDasharray="1200"
            style={{
              strokeDashoffset: visible ? 0 : 1200,
              transition: 'stroke-dashoffset 1.4s cubic-bezier(.76,0,.24,1) .35s',
            }}
          />
          <defs>
            <linearGradient id="drawerThread" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C9B6E4" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#B5E3CC" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFD3B5" stopOpacity="0.55" />
            </linearGradient>
          </defs>
        </svg>

        {/* Nav links */}
        <nav className="relative z-10 pt-28 px-8 flex flex-col gap-2">
          {LINKS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              data-testid={`drawer-nav-${l.id}`}
              className="group text-left flex items-baseline gap-4 py-2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-28px)',
                transition: `opacity .55s ease ${0.5 + i * 0.07}s, transform .75s cubic-bezier(.2,.7,.2,1) ${0.5 + i * 0.07}s`,
              }}
            >
              <span className="text-[11px] tracking-[0.3em] text-[var(--lavender)]/80 w-8">{l.n}</span>
              <span className="font-display text-[44px] leading-[0.95] tracking-tight relative">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:text-[var(--peach)]">{l.label}</span>
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-[var(--peach)] group-hover:w-full transition-all duration-500" />
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom CTA + info */}
        <div
          className="absolute bottom-8 inset-x-8 flex flex-col gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity .6s ease 1.1s, transform .8s cubic-bezier(.2,.7,.2,1) 1.1s',
          }}
        >
          <button
            onClick={() => go('admissions')}
            data-testid="drawer-apply-btn"
            className="btn-pill rounded-full h-12 bg-[var(--cream)] text-[var(--ink)] text-[12px] tracking-[0.24em] uppercase"
          >
            Begin Admission →
          </button>
          <div className="text-[12px] text-[var(--cream)]/60 leading-relaxed">
            214 Weaver Lane · Silkstrand, CA<br />admissions@silkstrand.edu
          </div>
        </div>
      </div>
    </div>
  );
}
