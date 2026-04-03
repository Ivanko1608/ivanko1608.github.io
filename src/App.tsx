import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Security } from './components/Security';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { GithubNoticeBanner } from './components/GithubNoticeBanner';
import { Landing } from './components/Landing';
import { Terminal } from './components/Terminal';

type View = 'landing' | 'hr' | 'terminal';

function HrView({ onBack }: { onBack: () => void }) {
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
      <div ref={headerRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <Navbar onBack={onBack} />
        <GithubNoticeBanner />
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

function viewFromHash(): View {
  const h = window.location.hash.replace('#', '');
  if (h === 'resume') return 'hr';
  if (h === 'terminal') return 'terminal';
  return 'landing';
}

export default function App() {
  const [view, setView] = useState<View>(viewFromHash);

  useEffect(() => {
    const onPop = () => setView(viewFromHash());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (v: View) => {
    const hash = v === 'hr' ? '#resume' : v === 'terminal' ? '#terminal' : '';
    window.history.pushState(null, '', hash || window.location.pathname);
    setView(v);
  };

  return (
    <>
      {view === 'landing'  && <Landing onResume={() => navigate('hr')} onTerminal={() => navigate('terminal')} />}
      {view === 'hr'       && <HrView onBack={() => navigate('landing')} />}
      {view === 'terminal' && <Terminal onBack={() => navigate('landing')} />}
    </>
  );
}
