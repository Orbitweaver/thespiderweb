import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Nav from './components/Nav';
import WebCursor from './components/WebCursor';
import { Hero, About, Academics, Admissions, Events, Contact, Footer } from './components/Sections';
import Timeline from './components/Timeline';
import Stories from './components/Stories';
import ProgramDetail from './components/ProgramDetail';

function Home() {
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
