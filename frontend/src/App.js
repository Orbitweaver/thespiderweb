import React from 'react';
import '@/App.css';
import { Toaster } from 'sonner';
import Nav from './components/Nav';
import WebCursor from './components/WebCursor';
import { Hero, About, Academics, Admissions, Events, Contact, Footer } from './components/Sections';
import Timeline from './components/Timeline';

function App() {
  return (
    <div className="App relative">
      <WebCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Academics />
        <Admissions />
        <Events />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
