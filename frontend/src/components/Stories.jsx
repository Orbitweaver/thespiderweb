import React, { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SpiderWeb } from './SpiderWeb';
import { useStagger } from '../lib/interactions';

export const stories = [
  {
    slug: 'the-market-as-textbook',
    tag: 'Economics',
    date: 'Feb 2026',
    title: 'The market as textbook: a Grade 8 project on seasonal prices',
    excerpt: 'For six weeks, our Grade 8 students tracked the weekly price of six staples across five local markets in five countries — and taught themselves linear regression along the way.',
    img: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900&q=80',
    author: 'Ms. Reema',
    read: '6 min',
  },
  {
    slug: 'letters-from-nairobi',
    tag: 'Global',
    date: 'Jan 2026',
    title: 'Letters from Nairobi: an IGCSE student on her first field trip',
    excerpt: 'Amina (Grade 9, Kenya) writes about a visit to a coffee cooperative, and how economics and environmental management suddenly felt like one subject, not two.',
    img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&q=80',
    author: 'Amina K. (\'28)',
    read: '4 min',
  },
  {
    slug: 'the-factory-is-a-lab',
    tag: 'Science',
    date: 'Dec 2025',
    title: 'The factory is a lab: a bakery in Cairo teaches chemistry',
    excerpt: 'One week, one bakery, one Grade 7 cohort. What happens when dough becomes data, and a baker becomes faculty.',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80',
    author: 'Mr. Hisham',
    read: '5 min',
  },
  {
    slug: 'why-boutique',
    tag: 'Pedagogy',
    date: 'Nov 2025',
    title: 'Why we stay boutique — a letter from the founder',
    excerpt: 'We cap our cohorts at 120 students across all grades. Here is why, and what we believe gets lost when a school grows too fast.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&q=80',
    author: 'Naqiyah Burhanuddin',
    read: '8 min',
  },
  {
    slug: 'joining-the-web',
    tag: 'Admissions',
    date: 'Oct 2025',
    title: 'Joining The Web: what the first month feels like',
    excerpt: 'Five new families tell us, in their own words, what changed in their household in the first month of online school at The Web.',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80',
    author: 'Admissions Desk',
    read: '3 min',
  },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('in'); }, { threshold: 0.14 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function Stories() {
  const r = useReveal();
  const gridStagger = useStagger({ step: 160 });
  const [featured, ...rest] = stories;

  return (
    <section id="stories" className="relative py-28 overflow-hidden" data-testid="stories-section">
      <div className="absolute -right-24 top-10 opacity-40 pointer-events-none"><SpiderWeb size={320} stroke="rgba(201,182,228,0.45)" spin /></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div ref={r} className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--lavender-deep)] mb-4">Stories · 06</div>
            <h2 className="font-display text-5xl lg:text-6xl tracking-tight leading-[1]">From <em className="italic">inside the web</em>.</h2>
          </div>
          <p className="max-w-md text-[var(--ink-soft)]">A monthly dispatch of student work, field notes, and letters from seven countries — our classrooms as they actually are.</p>
        </div>

        <div ref={gridStagger} className="grid lg:grid-cols-12 gap-6">
          <article data-testid={`story-${featured.slug}`} data-stagger-item className="stagger-item lg:col-span-7 tilt rounded-3xl overflow-hidden border border-[rgba(43,33,64,0.08)] bg-white" data-web-anchor>
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="clip-reveal stagger-item absolute inset-0" data-stagger-item>
                <img src={featured.img} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[var(--cream)] text-[10px] tracking-[0.28em] uppercase z-10">{featured.tag}</div>
            </div>
            <div className="p-8">
              <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--ink-soft)] mb-3">{featured.date} · {featured.read}</div>
              <h3 className="font-display text-3xl lg:text-4xl leading-[1.05]">{featured.title}</h3>
              <p className="text-[15px] text-[var(--ink-soft)] mt-4 leading-relaxed">{featured.excerpt}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-[13px] text-[var(--ink)]">by {featured.author}</span>
                <span className="inline-flex items-center gap-1 text-[11px] tracking-[0.22em] uppercase text-[var(--lavender-deep)]">Read story <ArrowUpRight className="w-3.5 h-3.5" /></span>
              </div>
            </div>
          </article>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {rest.map(s => (
              <article key={s.slug} data-testid={`story-${s.slug}`} data-stagger-item className="stagger-item flex gap-4 p-5 rounded-2xl bg-white border border-[rgba(43,33,64,0.08)] tilt" data-web-anchor>
                <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden clip-reveal stagger-item" data-stagger-item>
                  <img src={s.img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] tracking-[0.28em] uppercase text-[var(--lavender-deep)]">{s.tag} · {s.date}</div>
                  <h4 className="font-display text-[17px] leading-tight mt-1 line-clamp-2">{s.title}</h4>
                  <p className="text-[12.5px] text-[var(--ink-soft)] mt-1.5 line-clamp-2">{s.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
