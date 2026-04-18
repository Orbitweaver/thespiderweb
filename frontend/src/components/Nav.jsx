import React, { useEffect, useState } from 'react';
import { Spider } from './SpiderWeb';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'academics', label: 'Academics' },
  { id: 'admissions', label: 'Admissions' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = 'home';
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < 180) current = l.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl bg-[rgba(251,247,242,0.78)] border-b border-[rgba(43,33,64,0.08)]' : 'bg-transparent'}`} data-testid="site-nav">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <button onClick={() => go('home')} className="flex items-center gap-3 group" data-testid="nav-logo">
          <Spider size={28} />
          <div className="leading-none text-left">
            <div className="font-display text-[22px] tracking-tight">Silkstrand</div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-soft)]">Academy · Est. 1974</div>
          </div>
        </button>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button
              key={l.id}
              data-testid={`nav-${l.id}`}
              data-web-anchor
              onClick={() => go(l.id)}
              className={`link-u text-[13px] uppercase tracking-[0.22em] ${active === l.id ? 'active text-[var(--lavender-deep)]' : 'text-[var(--ink-soft)]'} hover:text-[var(--ink)] transition-colors`}
            >{l.label}</button>
          ))}
        </nav>
        <button onClick={() => go('admissions')} className="btn-pill hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-[var(--cream)] px-5 py-2.5 text-[13px] tracking-wide" data-testid="nav-apply-btn">
          Apply →
        </button>
      </div>
    </header>
  );
}
