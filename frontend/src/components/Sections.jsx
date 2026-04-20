import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { SpiderWeb, Spider, HangingWeb, AsymmetricWeb, BrokenWeb, MoonWeb } from './SpiderWeb';
import Newsletter from './Newsletter';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowUpRight, Calendar, MapPin, BookOpen, Sparkles, Compass, Leaf, Music, Beaker, Trophy } from 'lucide-react';
import { useMagnetic, useTilt, useCountUp, useRipple } from '../lib/interactions';

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

/* Staggered letter reveal for hero headline */
const SplitWords = ({ text, className = '', delay = 0, gradient = false }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block align-baseline" style={{ paddingBottom: '0.1em' }}>
          <span
            className={`inline-block word-rise ${gradient ? 'shimmer-ink' : ''}`}
            style={{ animationDelay: `${delay + i * 90}ms` }}
          >
            {w}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
};

/* Animated stat with count-up + tilt */
const Stat = ({ n, suffix = '', l, format = (v) => Math.round(v).toString() }) => {
  const [ref, value] = useCountUp(n, 1800);
  const tiltRef = useTilt(7);
  return (
    <div ref={tiltRef} className="rounded-2xl bg-white/60 backdrop-blur border border-[rgba(43,33,64,0.08)] p-6 tilt cursor-pointer" data-web-anchor>
      <div ref={ref} className="font-display text-5xl tabular-nums">{format(value)}{suffix}</div>
      <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--ink-soft)] mt-1">{l}</div>
    </div>
  );
};

/* HERO */
export const Hero = () => {
  const ref = useRef(null);
  const applyRef = useMagnetic(0.28);
  const tourRef = useMagnetic(0.22);
  const ripple = useRipple();
  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      ref.current.style.setProperty('--px', x);
      ref.current.style.setProperty('--py', y);
    };
    const el = ref.current;
    el?.addEventListener('mousemove', onMove);
    return () => el?.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <section id="home" ref={ref} className="relative min-h-[100vh] pt-28 pb-24 overflow-hidden" data-testid="hero-section">
      <div className="absolute -left-32 -top-20 opacity-70 pointer-events-none" style={{ transform: 'translate(calc(var(--px,0) * -18px), calc(var(--py,0) * -14px))' }}>
        <SpiderWeb size={520} rings={7} spokes={16} stroke="rgba(140,111,198,0.35)" spin />
      </div>
      <div className="absolute -right-40 top-40 opacity-60 pointer-events-none" style={{ transform: 'translate(calc(var(--px,0) * 22px), calc(var(--py,0) * 14px))' }}>
        <SpiderWeb size={420} rings={6} spokes={14} stroke="rgba(95,178,136,0.35)" />
      </div>
      <div className="absolute top-0 right-[18%] hidden md:block pointer-events-none">
        <div className="w-px bg-[rgba(43,33,64,0.35)] h-56 mx-auto" />
        <div className="spider-drop -mt-2 flex justify-center"><Spider size={40} wobble /></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-end relative z-10">
        <div className="lg:col-span-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--mint)] text-[var(--ink)] px-3 py-1 text-[11px] tracking-[0.24em] uppercase mb-8 badge-float" data-web-anchor>
            <Sparkles className="w-3.5 h-3.5" /> Admissions 2026 — now open
          </div>
          <h1 className="font-display text-[56px] sm:text-[72px] lg:text-[104px] leading-[0.92] tracking-[-0.03em]">
            <SplitWords text="Weaving" />
            <em className="italic"><SplitWords text=" curious" delay={360} gradient /></em>
            <br/>
            <SplitWords text="minds, one" delay={720} />
            <span className="relative inline-block">
              <SplitWords text=" thread" delay={1000} />
              <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 220 16" fill="none">
                <path d="M2 10 C 60 2, 160 18, 218 6" stroke="var(--peach-deep)" strokeWidth="3" strokeLinecap="round" className="underline-draw"/>
              </svg>
            </span><br/>
            <SplitWords text="at a time." delay={1400} />
          </h1>
          <p className="mt-10 max-w-xl text-[17px] leading-[1.65] text-[var(--ink-soft)] fade-up-delay">
            Silkstrand Academy is a K–12 learning community where intellectual play, the arts,
            and science are woven together — gently, deliberately, beautifully.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 fade-up-delay" style={{ animationDelay: '1.9s' }}>
            <div ref={applyRef}>
              <Button data-testid="hero-apply-btn" onClick={(e) => { ripple(e); document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-pill btn-ripple rounded-full bg-[var(--ink)] hover:bg-[var(--ink)] text-[var(--cream)] h-12 px-7 text-[13px] tracking-[0.18em] uppercase">Begin Admission <ArrowUpRight className="ml-1 w-4 h-4" /></Button>
            </div>
            <div ref={tourRef}>
              <Button data-testid="hero-tour-btn" onClick={(e) => { ripple(e); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} variant="outline" className="btn-ripple rounded-full h-12 px-7 text-[13px] tracking-[0.18em] uppercase border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--cream)]">Take a Tour</Button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-5">
          <Stat n={50} l="Years of craft" />
          <Stat n={94} suffix="%" l="University placement" />
          <Stat n={18} suffix=":1" l="Student-teacher ratio" />
        </div>
      </div>

      <div className="mt-24 relative z-10 overflow-hidden border-y border-[rgba(43,33,64,0.08)] py-5">
        <div className="marquee-inner flex gap-12 whitespace-nowrap w-max text-[var(--ink-soft)] font-display italic text-2xl">
          {Array.from({length: 2}).map((_,k) => (
            <div className="flex gap-12" key={k}>
              {['Curiosity', '⁕', 'Craft', '⁕', 'Community', '⁕', 'Character', '⁕', 'Creativity', '⁕', 'Compassion', '⁕'].map((w,i)=>(
                <span key={i} className="px-4">{w}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ABOUT */
export const About = () => {
  const r = useReveal();
  return (
    <section id="about" className="relative py-28 bg-[var(--cream-2)] overflow-hidden" data-testid="about-section">
      <div className="absolute -top-10 right-10 opacity-70 pointer-events-none"><HangingWeb size={140} threadLen={80} withSpider /></div>
      <div className="absolute bottom-0 left-0 opacity-50 pointer-events-none"><BrokenWeb size={220} /></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 relative z-10">
        <div ref={r} className="reveal lg:col-span-5">
          <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--lavender-deep)] mb-4">About · 01</div>
          <h2 className="font-display text-5xl lg:text-6xl leading-[1] tracking-tight">A school spun from intention.</h2>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
          {[
            { icon: Leaf, t: 'Rooted in place', d: 'A 22-acre campus where gardens, wetlands, and studios are part of the curriculum.' },
            { icon: Compass, t: 'Guided inquiry', d: 'Socratic seminars, open studios, and project weeks across every division.' },
            { icon: BookOpen, t: 'Global, literary', d: 'Reading lists built by our librarians — from Ghalib to Le Guin to Baldwin.' },
            { icon: Sparkles, t: 'Joyful rigor', d: 'High standards without the hurry. Space to think, make, and revise.' },
          ].map((f, i) => (
            <TiltCard key={i} f={f} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TiltCard = ({ f }) => {
  const tRef = useTilt(6);
  return (
    <div ref={tRef} className="p-7 rounded-2xl bg-white border border-[rgba(43,33,64,0.08)] card-icon-hover" data-web-anchor style={{ transformStyle: 'preserve-3d' }}>
      <f.icon className="w-6 h-6 text-[var(--lavender-deep)] icon-swing" />
      <h3 className="font-display text-2xl mt-4">{f.t}</h3>
      <p className="text-[15px] text-[var(--ink-soft)] mt-2 leading-relaxed">{f.d}</p>
    </div>
  );
};

/* ACADEMICS */
const programs = [
  { icon: Leaf, slug: 'lower-school', name: 'Lower School', grades: 'K–5', color: 'var(--mint)', desc: 'Phonics, nature journaling, mixed-age studios, and slow mornings outside.' },
  { icon: Beaker, slug: 'middle-school', name: 'Middle School', grades: '6–8', color: 'var(--peach)', desc: 'Deep project blocks — cartography, civics, chemistry, and chamber music.' },
  { icon: BookOpen, slug: 'upper-school', name: 'Upper School', grades: '9–12', color: 'var(--lavender)', desc: 'Honors seminars, AP options, and a two-year capstone thesis.' },
  { icon: Music, slug: 'arts-conservatory', name: 'Arts Conservatory', grades: 'Elective', color: '#F7D9E4', desc: 'Strings, ceramics, printmaking, film — nine ateliers led by practicing artists.' },
  { icon: Trophy, slug: 'athletics', name: 'Athletics', grades: 'All', color: '#D9EAF7', desc: 'No-cut teams, 14 sports, and a renowned cross-country program.' },
  { icon: Compass, slug: 'global-year', name: 'Global Year', grades: 'Gr. 11', color: '#FFE7A8', desc: 'A term abroad embedded in partner schools — Kyoto, Oaxaca, Edinburgh.' },
];

const ProgramCard = ({ p, i }) => {
  const tRef = useTilt(8);
  return (
    <Link to={`/programs/${p.slug}`} className="group relative p-7 rounded-3xl border border-[rgba(43,33,64,0.08)] bg-white overflow-hidden block card-icon-hover" data-testid={`program-${i}`} data-web-anchor>
      <div ref={tRef} style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full blob-morph" style={{ background: p.color, opacity: 0.65 }} />
        <div className="relative" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex items-center justify-between">
            <p.icon className="w-7 h-7 text-[var(--ink)] icon-swing" />
            <span className="text-[10px] tracking-[0.25em] uppercase px-2 py-1 rounded-full bg-[var(--cream-2)]">{p.grades}</span>
          </div>
          <h3 className="font-display text-3xl mt-8">{p.name}</h3>
          <p className="text-[15px] text-[var(--ink-soft)] mt-3 leading-relaxed">{p.desc}</p>
          <div className="mt-8 flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-[var(--ink)] opacity-60 group-hover:opacity-100 transition-opacity arrow-slide">
            Explore <ArrowUpRight className="w-4 h-4 arrow-icon" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export const Academics = () => {
  const r = useReveal();
  return (
    <section id="academics" className="relative py-28" data-testid="academics-section">
      <div className="absolute right-0 top-10 opacity-40 pointer-events-none"><SpiderWeb size={340} stroke="rgba(240,143,95,0.35)" /></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={r} className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--lavender-deep)] mb-4">Academics · 02</div>
            <h2 className="font-display text-5xl lg:text-6xl tracking-tight leading-[1]">Six programs. <em className="italic">One web.</em></h2>
          </div>
          <p className="max-w-md text-[var(--ink-soft)]">Our divisions are connected by faculty, studios, and rituals — so curiosity threads from first grade to twelfth.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (<ProgramCard key={i} p={p} i={i} />))}
        </div>
      </div>
    </section>
  );
};

/* ADMISSIONS — client-only */
export const Admissions = () => {
  const [form, setForm] = useState({ student_name: '', parent_name: '', email: '', phone: '', grade: '', program: 'Lower School', notes: '' });
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    toast.success('Inquiry received — our admissions team will reach out within 48 hours.');
    setForm({ student_name: '', parent_name: '', email: '', phone: '', grade: '', program: 'Lower School', notes: '' });
    setLoading(false);
  };
  return (
    <section id="admissions" className="relative py-28 bg-[var(--ink)] text-[var(--cream)] overflow-hidden" data-testid="admissions-section">
      <div className="absolute -left-32 bottom-0 opacity-30 pointer-events-none"><SpiderWeb size={520} stroke="rgba(201,182,228,0.35)" spin /></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-5">
          <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--lavender)] mb-4">Admissions · 03</div>
          <h2 className="font-display text-5xl lg:text-6xl leading-[1] tracking-tight">Begin your <em className="italic text-[var(--peach)]">thread</em>.</h2>
          <p className="mt-8 text-[var(--cream)]/80 max-w-md leading-relaxed">Send us a line. We'll respond within two school days with campus tour dates and a portfolio of our programs.</p>
          <ul className="mt-10 space-y-4 text-[15px]">
            {['Rolling admissions · Sept & Jan intake', 'Merit & need-based financial aid', 'Sibling & alumni priority'].map(x => (
              <li key={x} className="flex items-start gap-3"><span className="mt-1.5 inline-block w-2 h-2 rounded-full bg-[var(--mint)] dew" />{x}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={submit} className="lg:col-span-7 bg-[var(--cream)] text-[var(--ink)] rounded-3xl p-8 lg:p-10 space-y-5" data-testid="admissions-form">
          <div className="grid sm:grid-cols-2 gap-5">
            <div><Label>Student Name</Label><Input data-testid="adm-student" required value={form.student_name} onChange={e => update('student_name', e.target.value)} className="mt-2 h-11 input-glow" /></div>
            <div><Label>Parent / Guardian</Label><Input data-testid="adm-parent" required value={form.parent_name} onChange={e => update('parent_name', e.target.value)} className="mt-2 h-11 input-glow" /></div>
            <div><Label>Email</Label><Input data-testid="adm-email" type="email" required value={form.email} onChange={e => update('email', e.target.value)} className="mt-2 h-11 input-glow" /></div>
            <div><Label>Phone</Label><Input data-testid="adm-phone" required value={form.phone} onChange={e => update('phone', e.target.value)} className="mt-2 h-11 input-glow" /></div>
            <div><Label>Seeking Grade</Label><Input data-testid="adm-grade" required placeholder="e.g., Grade 4" value={form.grade} onChange={e => update('grade', e.target.value)} className="mt-2 h-11 input-glow" /></div>
            <div>
              <Label>Interested Program</Label>
              <Select value={form.program} onValueChange={v => update('program', v)}>
                <SelectTrigger data-testid="adm-program" className="mt-2 h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Lower School','Middle School','Upper School','Arts Conservatory','Athletics','Global Year'].map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div><Label>Anything we should know?</Label><Textarea data-testid="adm-notes" value={form.notes} onChange={e => update('notes', e.target.value)} className="mt-2 min-h-[110px] input-glow" /></div>
          <Button type="submit" disabled={loading} data-testid="adm-submit" className="btn-pill btn-ripple rounded-full h-12 px-8 bg-[var(--ink)] text-[var(--cream)] hover:bg-[var(--ink)] tracking-[0.2em] text-[12px] uppercase">{loading ? 'Sending…' : 'Submit Inquiry'}</Button>
        </form>
      </div>
    </section>
  );
};

/* EVENTS — static */
const STATIC_EVENTS = [
  { id: 'e1', title: 'Spring Science Fair', description: 'Young minds showcase inventions, coding demos, and robotics projects across grades 5–12.', date: '2026-03-14', location: 'Main Auditorium', category: 'academic' },
  { id: 'e2', title: 'Inter-House Athletics Meet', description: 'A full-day athletics championship with track, field, and relay events.', date: '2026-04-02', location: 'Silk Field', category: 'sports' },
  { id: 'e3', title: 'Silkstrand Arts Night', description: 'Student paintings, pottery, and a live orchestra performance under the stars.', date: '2026-04-19', location: 'Webgarden Pavilion', category: 'arts' },
  { id: 'e4', title: 'Community Reading Day', description: 'Parents and alumni read with primary students across classrooms.', date: '2026-05-08', location: 'Weaver Library', category: 'community' },
  { id: 'e5', title: 'Model United Nations', description: 'Two-day delegate conference hosting 20 schools across the region.', date: '2026-05-23', location: 'Strand Hall', category: 'academic' },
];

const EventCard = ({ ev }) => {
  const tRef = useTilt(5);
  const catColor = { academic: 'var(--lavender)', sports: 'var(--mint)', arts: 'var(--peach)', community: '#F7D9E4' };
  return (
    <article ref={tRef} data-testid={`event-${ev.id}`} data-web-anchor className="group relative flex gap-6 p-7 rounded-3xl border border-[rgba(43,33,64,0.08)] bg-white overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
      <div className="shrink-0 w-20 h-20 rounded-2xl flex flex-col items-center justify-center date-chip" style={{ background: catColor[ev.category] || 'var(--lavender)' }}>
        <div className="text-[10px] uppercase tracking-[0.22em]">{new Date(ev.date).toLocaleString('en', { month: 'short' })}</div>
        <div className="font-display text-3xl leading-none">{new Date(ev.date).getDate()}</div>
      </div>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">{ev.category}</div>
        <h3 className="font-display text-2xl mt-1">{ev.title}</h3>
        <p className="text-[14px] text-[var(--ink-soft)] mt-2 leading-relaxed">{ev.description}</p>
        <div className="flex items-center gap-4 mt-4 text-[12px] text-[var(--ink-soft)]">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(ev.date).toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{ev.location}</span>
        </div>
      </div>
    </article>
  );
};

export const Events = () => {
  const r = useReveal();
  return (
    <section id="events" className="relative py-28 overflow-hidden" data-testid="events-section">
      <div className="absolute -right-24 top-24 opacity-40 pointer-events-none float-slow"><AsymmetricWeb size={260} stroke="rgba(240,143,95,0.45)" /></div>
      <div className="absolute -left-10 bottom-20 opacity-40 pointer-events-none"><MoonWeb size={200} /></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div ref={r} className="reveal mb-14">
          <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--lavender-deep)] mb-4">Events · 04</div>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight">On the calendar.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {STATIC_EVENTS.map((ev) => (<EventCard key={ev.id} ev={ev} />))}
        </div>
      </div>
    </section>
  );
};

/* CONTACT — client-only */
export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    toast.success('Thanks — we\'ll be in touch soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };
  return (
    <section id="contact" className="relative py-28 bg-[var(--cream-2)]" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--lavender-deep)] mb-4">Contact · 05</div>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight leading-[1]">Say hello.</h2>
          <div className="mt-10 space-y-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
            <p><span className="text-[var(--ink)] font-medium">Main Campus</span><br/>214 Weaver Lane, Silkstrand, CA 94103</p>
            <p><span className="text-[var(--ink)] font-medium">Admissions</span><br/>admissions@silkstrand.edu · (415) 555 0128</p>
            <p><span className="text-[var(--ink)] font-medium">Visiting hours</span><br/>Tuesdays & Thursdays, 9:00 – 15:00</p>
          </div>
        </div>
        <form onSubmit={submit} className="lg:col-span-7 bg-white rounded-3xl p-8 lg:p-10 border border-[rgba(43,33,64,0.08)] space-y-5" data-testid="contact-form">
          <div className="grid sm:grid-cols-2 gap-5">
            <div><Label>Name</Label><Input data-testid="c-name" required value={form.name} onChange={e => update('name', e.target.value)} className="mt-2 h-11 input-glow" /></div>
            <div><Label>Email</Label><Input data-testid="c-email" type="email" required value={form.email} onChange={e => update('email', e.target.value)} className="mt-2 h-11 input-glow" /></div>
          </div>
          <div><Label>Subject</Label><Input data-testid="c-subject" required value={form.subject} onChange={e => update('subject', e.target.value)} className="mt-2 h-11 input-glow" /></div>
          <div><Label>Message</Label><Textarea data-testid="c-message" required value={form.message} onChange={e => update('message', e.target.value)} className="mt-2 min-h-[140px] input-glow" /></div>
          <Button type="submit" disabled={loading} data-testid="c-submit" className="btn-pill btn-ripple rounded-full h-12 px-8 bg-[var(--ink)] text-[var(--cream)] hover:bg-[var(--ink)] tracking-[0.2em] text-[12px] uppercase">{loading ? 'Sending…' : 'Send message'}</Button>
        </form>
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer className="relative bg-[var(--ink)] text-[var(--cream)] pt-20 pb-10 overflow-hidden" data-testid="site-footer">
    <div className="absolute -right-24 -top-24 opacity-20"><SpiderWeb size={420} stroke="rgba(201,182,228,0.6)" spin /></div>
    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <div className="mb-16 pb-12 border-b border-white/10 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[var(--lavender)] mb-3">Newsletter</div>
          <h3 className="font-display text-3xl lg:text-4xl leading-[1.05]">Letters from the <em className="italic text-[var(--peach)]">weavers' desk</em> — once a month.</h3>
        </div>
        <div className="lg:col-span-6">
          <Newsletter variant="footer" />
          <p className="text-[12px] text-[var(--cream)]/60 mt-3">Student work, admissions windows, and the occasional recipe. Unsubscribe anytime.</p>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4"><Spider size={30} wobble /><span className="font-display text-2xl">Silkstrand</span></div>
          <p className="text-[13px] text-[var(--cream)]/70 leading-relaxed max-w-xs">A K–12 independent school weaving curiosity, craft, and character since 1974.</p>
        </div>
        {[
          { t: 'Explore', l: ['About','Academics','Arts','Athletics'] },
          { t: 'Admissions', l: ['Inquire','Visit','Tuition','Financial Aid'] },
          { t: 'Community', l: ['Events','Stories','Alumni','Careers'] },
        ].map(c => (
          <div key={c.t}>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[var(--lavender)] mb-4">{c.t}</div>
            <ul className="space-y-2 text-[14px] text-[var(--cream)]/80">{c.l.map(x => (<li key={x} className="hover:text-[var(--peach)] transition-colors cursor-pointer hover-underline">{x}</li>))}</ul>
          </div>
        ))}
      </div>
      <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between text-[12px] text-[var(--cream)]/60">
        <div>© {new Date().getFullYear()} Silkstrand Academy. Every thread matters.</div>
        <div>Woven in California · Accredited by WASC</div>
      </div>
    </div>
  </footer>
);
