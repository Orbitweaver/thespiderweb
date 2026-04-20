import React, { useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Nav from './components/Nav';
import WebCursor from './components/WebCursor';
import ScrollThread from './components/ScrollThread';
import { Hero, About, Academics, Admissions, Events, Contact, Footer } from './components/Sections';
import Timeline from './components/Timeline';
import Stories from './components/Stories';
import ProgramDetail from './components/ProgramDetail';

function Home() {
  const location = useLocation();
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    // wait for layout, retry a few times until element is present & measured
    let attempts = 0;
    const tick = () => {
      attempts += 1;
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (attempts < 20) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }, [location.state]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Academics />
        <Admissions />
        <Events />
        <Stories />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App relative">
      <BrowserRouter>
        <WebCursor />
        <ScrollThread />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
        </Routes>
        <Toaster position="bottom-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
