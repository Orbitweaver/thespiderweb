import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SpiderWeb } from './SpiderWeb';
import { useStagger } from '../lib/interactions';

export const stories = [
  {
    slug: 'mycelium-and-math',
    tag: 'Research',
    date: 'Feb 2026',
    title: 'Mycelium and math: how the 4th grade mapped the forest floor',
    excerpt: 'For twelve weeks, students traced fungal networks under the cedar grove — and discovered their teacher\'s graph-theory unit hiding in the soil.',
    img: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=900&q=80',
    author: 'Ms. Ayodele',
    read: '6 min',
  },
  {
    slug: 'kyoto-letters',
    tag: 'Global Year',
    date: 'Jan 2026',
    title: 'Letters from Kyoto: an 11th-grader\'s term abroad',
    excerpt: 'Rhea Shah writes home from her partner school, where she is learning kintsugi and reading Ghalib in Urdu after dinner.',
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80',
    author: 'Rhea Shah (\'27)',
    read: '4 min',
  },
  {
    slug: 'the-weaver-library',
    tag: 'Place',
    date: 'Dec 2025',
    title: 'Inside the Weaver Library: a reading room by Priya Khan (\'98)',
    excerpt: 'Our alumna architect returned to design the school\'s cedar-vaulted library. A walk through, with a list of what\'s on the shelves this season.',
    img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900&q=80',
    author: 'Head of School',
    read: '7 min',
  },
  {
    slug: 'chamber-music-strand',
    tag: 'Arts',
    date: 'Nov 2025',
    title: 'A chamber music piece named "Strand"',
    excerpt: 'Composer Lio Tanaka (\'92) returns for a week of masterclasses, and the conservatory quartet debuts his new work in the Pavilion.',
    img: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=900&q=80',
    author: 'Conservatory Desk',
    read: '3 min',
  },
  {
    slug: 'a-gentle-curriculum',
    tag: 'Pedagogy',
    date: 'Oct 2025',
    title: 'A gentle curriculum — why we begin the day with a book',
    excerpt: 'Twenty minutes of silent reading, every morning, every grade. What fifty years of slow mornings have taught us about rigor.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&q=80',
    author: 'Ada Moreau, Founder',
    read: '8 min',
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
  const navigate = useNavigate();
  const gridStagger = useStagger({ step: 160 });
  const [featured, ...rest] = stories;

  return (
    <section id="stories" className="relative py-28 overflow-hidden" data-testid="stories-section">
      <div className="absolute -right-24 top-10 opacity-40 pointer-events-none"><SpiderWeb size={320} stroke="rgba(201,182,228,0.45)" spin /></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div ref={r} className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--lavender-deep)] mb-4">Stories · 06</div>
            <h2 className="font-display text-5xl lg:text-6xl tracking-tight leading-[1]">From the <em className="italic">weavers' desk</em>.</h2>
          </div>
          <p className="max-w-md text-[var(--ink-soft)]">A monthly dispatch of student work, pedagogy notes, and the occasional recipe from the library cafe.</p>
        </div>

        <div ref={gridStagger} className="grid lg:grid-cols-12 gap-6">
          {/* Featured */}
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

          {/* side grid */}
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
