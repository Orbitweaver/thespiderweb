import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Mail } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Newsletter({ variant = 'footer' }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email });
      toast.success('Welcome to the thread.');
      setEmail('');
    } catch (err) {
      toast.error('Could not subscribe. Please check your email.');
    } finally { setLoading(false); }
  };

  const light = variant === 'footer';
  return (
    <form onSubmit={submit} data-testid="newsletter-form" className={`flex items-center gap-2 rounded-full p-1.5 border ${light ? 'bg-white/10 border-white/20' : 'bg-white border-[rgba(43,33,64,0.15)]'}`}>
      <Mail className={`w-4 h-4 ml-3 ${light ? 'text-[var(--cream)]/70' : 'text-[var(--ink-soft)]'}`} />
      <Input
        type="email"
        data-testid="newsletter-email"
        required
        placeholder="you@school.edu"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={`h-9 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 ${light ? 'text-[var(--cream)] placeholder:text-[var(--cream)]/50' : ''}`}
      />
      <Button type="submit" disabled={loading} data-testid="newsletter-submit" className="btn-pill rounded-full h-9 px-5 bg-[var(--lavender-deep)] text-white hover:bg-[var(--lavender-deep)] text-[11px] tracking-[0.22em] uppercase">
        {loading ? '…' : 'Join'}
      </Button>
    </form>
  );
}
