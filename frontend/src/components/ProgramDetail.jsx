import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Users, Compass } from 'lucide-react';
import { programsCatalog } from '../data/programs';
import { SpiderWeb, AsymmetricWeb, HangingWeb } from './SpiderWeb';
import { Button } from './ui/button';
import { useParallax, useStagger } from '../lib/interactions';

export default function ProgramDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const program = programsCatalog.find(p => p.slug === slug);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);

  const goToAdmissions = () => navigate('/', { state: { scrollTo: 'admissions' } });

  const heroImgParallax = useParallax(0.22);
  const heroTextParallax = useParallax(-0.06);
  const pillarsStagger = useStagger({ step: 140 });
  const weekStagger = useStagger({ step: 110 });
  const galleryStagger = useStagger({ step: 180 });
  const othersStagger = useStagger({ step: 120 });

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <div className="font-display text-4xl">Thread not found.</div>
        <Link to="/" className="underline">Return home</Link>
      </div>
    );
  }

  const others = programsCatalog.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <div className="relative" data-testid={`program-page-${program.slug}`}>
      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[rgba(251,247,242,0.82)] border-b border-[rgba(43,33,64,0.08)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} data-testid="program-back-btn" className="flex items-center gap-2 text-[13px] tracking-[0.18em] uppercase link-u" data-web-anchor>
            <ArrowLeft className="w-4 h-4" /> Silkstrand
          </button>
          <button onClick={goToAdmissions} className="btn-pill rounded-full bg-[var(--ink)] text-[var(--cream)] px-5 py-2.5 text-[13px] tracking-wide" data-testid="program-apply-btn">Apply →</button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute -left-32 top-10 opacity-60 pointer-events-none"><SpiderWeb size={420} stroke="rgba(140,111,198,0.35)" spin /></div>
        <div className="absolute -right-28 bottom-0 opacity-50 pointer-events-none"><AsymmetricWeb size={280} stroke="rgba(95,178,136,0.4)" /></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-end relative z-10">
          <div ref={heroTextParallax} className="lg:col-span-7 parallax">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] tracking-[0.26em] uppercase" style={{ background: program.color }}>{program.grades}</div>
            <h1 className="font-display text-[56px] sm:text-[80px] lg:text-[104px] leading-[0.95] tracking-tight mt-6">{program.name}</h1>
            <p className="mt-6 font-display italic text-2xl text-[var(--ink-soft)]">{program.tagline}</p>
            <p className="mt-8 text-[16px] leading-[1.7] text-[var(--ink-soft)] max-w-xl">{program.lead}</p>
          </div>
          <div className="lg:col-span-5">
            <div ref={heroImgParallax} className="relative rounded-3xl overflow-hidden border border-[rgba(43,33,64,0.08)] aspect-[4/5] parallax" data-web-anchor>
              <img src={program.hero} alt={program.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(43,33,64,0.25), transparent 60%)' }} />
              <div className="absolute top-0 right-0 opacity-70"><HangingWeb size={110} threadLen={60} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative py-24 bg-[var(--cream-2)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-14">
            <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--lavender-deep)] mb-3">Four pillars</div>
            <h2 className="font-display text-5xl tracking-tight">How the week is woven.</h2>
          </div>
          <div ref={pillarsStagger} className="grid md:grid-cols-2 gap-6">
            {program.pillars.map((p, i) => (
              <div key={i} data-stagger-item className="stagger-item p-8 rounded-3xl bg-white border border-[rgba(43,33,64,0.08)] tilt" data-web-anchor>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--lavender-deep)] mb-2">Pillar · {String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-display text-2xl">{p.t}</h3>
                <p className="text-[15px] text-[var(--ink-soft)] mt-3 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Week + meta */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--lavender-deep)] mb-3">A week, in shape</div>
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight">What a typical week looks like.</h2>
            <ol ref={weekStagger} className="mt-10 space-y-5">
              {program.week.map((w, i) => (
                <li key={i} data-stagger-item className="stagger-item flex gap-5 items-start pl-0" data-web-anchor>
                  <span className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-[12px] tracking-[0.2em] font-display" style={{ background: program.color }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[15px] leading-relaxed text-[var(--ink)] pt-2">{w}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="lg:col-span-5 p-8 rounded-3xl bg-[var(--ink)] text-[var(--cream)] relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 opacity-15"><SpiderWeb size={320} stroke="rgba(201,182,228,0.6)" spin /></div>
            <div className="relative z-10 space-y-8">
              <div>
                <div className="flex items-center gap-3 text-[var(--lavender)]"><Users className="w-4 h-4" /><span className="text-[11px] tracking-[0.3em] uppercase">Teaching</span></div>
                <div className="font-display text-5xl mt-2">{program.teachers}</div>
                <div className="text-[13px] text-[var(--cream)]/70">faculty in this division</div>
              </div>
              <div>
                <div className="flex items-center gap-3 text-[var(--lavender)]"><Compass className="w-4 h-4" /><span className="text-[11px] tracking-[0.3em] uppercase">Ratio</span></div>
                <div className="font-display text-5xl mt-2">{program.studentRatio}</div>
                <div className="text-[13px] text-[var(--cream)]/70">student-to-teacher</div>
              </div>
              <Button data-testid="program-inquire-btn" onClick={goToAdmissions} className="btn-pill rounded-full h-12 w-full bg-[var(--cream)] text-[var(--ink)] hover:bg-[var(--cream)] tracking-[0.2em] text-[12px] uppercase">Inquire about {program.name}</Button>
            </div>
          </aside>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative py-24 bg-[var(--cream-2)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight">From the studios.</h2>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">Campus gallery</span>
          </div>
          <div ref={galleryStagger} className="grid md:grid-cols-3 gap-5">
            {program.gallery.map((g, i) => (
              <GalleryImage key={i} src={g} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Other programs */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-10"><h2 className="font-display text-4xl tracking-tight">Other threads to follow.</h2></div>
          <div ref={othersStagger} className="grid md:grid-cols-3 gap-6">
            {others.map(o => (
              <Link key={o.slug} to={`/programs/${o.slug}`} data-testid={`program-other-${o.slug}`} data-stagger-item className="stagger-item group block p-7 rounded-3xl border border-[rgba(43,33,64,0.08)] bg-white tilt" data-web-anchor>
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] tracking-[0.26em] uppercase" style={{ background: o.color }}>{o.grades}</div>
                <h3 className="font-display text-2xl mt-6">{o.name}</h3>
                <p className="text-[14px] text-[var(--ink-soft)] mt-2 line-clamp-2">{o.tagline}</p>
                <div className="mt-6 text-[11px] tracking-[0.25em] uppercase text-[var(--lavender-deep)] inline-flex items-center gap-1">Explore <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* Gallery image with clip-path sweep reveal on scroll (driven by stagger-item .in class via CSS) */
const GalleryImage = ({ src }) => {
  return (
    <div
      data-stagger-item
      className="stagger-item clip-reveal aspect-[4/5] rounded-3xl overflow-hidden border border-[rgba(43,33,64,0.08)] tilt relative"
      data-web-anchor
    >
      <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
    </div>
  );
};
