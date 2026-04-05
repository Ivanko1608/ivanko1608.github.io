import { useState } from 'react';
import { hero } from '../data';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { generatePdf } from '../lib/generatePdf';

const NAV_LINKS = [
  { target: 'about',      label: 'About'      },
  { target: 'experience', label: 'Experience' },
  { target: 'skills',     label: 'Skills'     },
  { target: 'security',   label: 'Security'   },
  { target: 'contact',    label: 'Contact'    },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

interface NavbarProps {
  onBack?: () => void;
}

export function Navbar({ onBack }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [first, ...rest] = hero.name.split(' ');

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav style={styles.nav}>
        {/* Logo / Back */}
        {onBack ? (
          <button style={styles.backLink} onClick={onBack}>
            ← back
          </button>
        ) : (
          <button style={{ ...styles.logo, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => { closeMenu(); scrollTo('hero'); }}>
            {first}<span style={styles.logoDot}>.</span>{rest.join(' ')}
          </button>
        )}

        {/* Desktop links */}
        {!isMobile && (
          <ul style={styles.links}>
            {NAV_LINKS.map(({ target, label }) => (
              <li key={target}>
                <button
                  style={styles.link}
                  onClick={() => scrollTo(target)}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--rust)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Right side: CTA button or hamburger */}
        {isMobile ? (
          <button
            style={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button style={styles.pdfBtn} onClick={() => generatePdf()}>
              ↓ PDF
            </button>
            <a href={`mailto:${hero.ctaEmail}`} style={styles.hireCta}>
              Hire me →
            </a>
          </div>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobile && menuOpen && (
        <div style={styles.drawer}>
          {NAV_LINKS.map(({ target, label }) => (
            <button
              key={target}
              style={styles.drawerLink}
              onClick={() => { closeMenu(); scrollTo(target); }}
            >
              {label}
            </button>
          ))}
          <button
            style={styles.drawerPdf}
            onClick={() => { closeMenu(); generatePdf(); }}
          >
            ↓ Download PDF
          </button>
          <a
            href={`mailto:${hero.ctaEmail}`}
            style={styles.drawerCta}
            onClick={closeMenu}
          >
            Hire me →
          </a>
        </div>
      )}
    </>
  );
}

const styles = {
  nav: {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    padding:        '1.1rem 1.5rem',
    background:     'rgba(10,11,14,0.92)',
    backdropFilter: 'blur(12px)',
    borderBottom:   '1px solid var(--line)',
  } as React.CSSProperties,

  backLink: {
    background:     'transparent',
    border:         'none',
    color:          'var(--muted)',
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       '0.78rem',
    letterSpacing:  '0.06em',
    cursor:         'pointer',
    padding:        0,
    transition:     'color 0.2s',
  } as React.CSSProperties,

  logo: {
    fontFamily:     "'Syne', sans-serif",
    fontWeight:     800,
    fontSize:       '1.05rem',
    letterSpacing:  '0.04em',
    color:          'var(--text)',
    textDecoration: 'none',
  } as React.CSSProperties,

  logoDot: {
    color: 'var(--rust)',
  } as React.CSSProperties,

  links: {
    display:   'flex',
    gap:       '2.2rem',
    listStyle: 'none',
  } as React.CSSProperties,

  link: {
    background:     'none',
    border:         'none',
    cursor:         'pointer',
    padding:        0,
    color:          'var(--muted)',
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       '0.78rem',
    letterSpacing:  '0.12em',
    textTransform:  'uppercase',
    transition:     'color 0.2s',
  } as React.CSSProperties,

  pdfBtn: {
    display:        'inline-flex',
    alignItems:     'center',
    padding:        '0.45rem 0.8rem',
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       '0.72rem',
    letterSpacing:  '0.06em',
    borderRadius:   '3px',
    background:     'transparent',
    color:          'var(--muted)',
    border:         '1px solid var(--bg3)',
    cursor:         'pointer',
    transition:     'color 0.2s, border-color 0.2s',
  } as React.CSSProperties,

  hireCta: {
    display:        'inline-flex',
    alignItems:     'center',
    textDecoration: 'none',
    padding:        '0.45rem 1rem',
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       '0.72rem',
    letterSpacing:  '0.06em',
    borderRadius:   '3px',
    background:     'var(--rust)',
    color:          '#fff',
    transition:     'background 0.2s',
  } as React.CSSProperties,

  hamburger: {
    background:  'transparent',
    border:      'none',
    color:       'var(--text)',
    fontSize:    '1.2rem',
    cursor:      'pointer',
    padding:     '0.2rem 0.4rem',
    lineHeight:  1,
  } as React.CSSProperties,

  drawer: {
    position:       'fixed',
    top:            'var(--header-h, 92px)',
    left:           0,
    right:          0,
    zIndex:         99,
    background:     'rgba(10,11,14,0.97)',
    backdropFilter: 'blur(16px)',
    borderBottom:   '1px solid var(--line)',
    display:        'flex',
    flexDirection:  'column',
    padding:        '1.5rem',
    gap:            '0.2rem',
  } as React.CSSProperties,

  drawerLink: {
    background:     'none',
    border:         'none',
    cursor:         'pointer',
    textAlign:      'left',
    color:          'var(--muted)',
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       '0.9rem',
    letterSpacing:  '0.1em',
    textTransform:  'uppercase',
    padding:        '0.75rem 0',
    borderBottom:   '1px solid var(--line)',
  } as React.CSSProperties,

  drawerPdf: {
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    padding:        '0.65rem 1.2rem',
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       '0.8rem',
    letterSpacing:  '0.06em',
    borderRadius:   '3px',
    background:     'transparent',
    color:          'var(--muted)',
    border:         '1px solid var(--bg3)',
    cursor:         'pointer',
    marginTop:      '1rem',
  } as React.CSSProperties,

  drawerCta: {
    display:        'inline-flex',
    alignItems:     'center',
    textDecoration: 'none',
    padding:        '0.65rem 1.2rem',
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       '0.8rem',
    letterSpacing:  '0.06em',
    borderRadius:   '3px',
    background:     'var(--rust)',
    color:          '#fff',
    marginTop:      '1rem',
    justifyContent: 'center',
  } as React.CSSProperties,
} as const;
