import { useEffect, useRef } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Navbar }             from './components/Navbar';
import { Hero }               from './components/Hero';
import { About }              from './components/About';
import { Experience }         from './components/Experience';
import { Skills }             from './components/Skills';
import { Security }           from './components/Security';
import { Contact }            from './components/Contact';
import { Footer }             from './components/Footer';
import { GithubNoticeBanner } from './components/GithubNoticeBanner';

export default function App() {
  useScrollReveal();

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () =>
      document.documentElement.style.setProperty('--header-h', el.offsetHeight + 'px');
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div ref={headerRef} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <GithubNoticeBanner />
        <Navbar />
      </div>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Security />
      <Contact />
      <Footer />
    </>
  );
}
