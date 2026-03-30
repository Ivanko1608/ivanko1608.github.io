import { useState } from 'react';
import { hero } from '../data';
import { useMediaQuery } from '../hooks/useMediaQuery';

const NAV_LINKS = [
  { href: '#about',      label: 'About'      },
  { href: '#experience', label: 'Experience' },
  { href: '#skills',     label: 'Skills'     },
  { href: '#security',   label: 'Security'   },
  { href: '#contact',    label: 'Contact'    },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [first, ...rest] = hero.name.split(' ');

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav style={styles.nav}>
        {/* Logo */}
        <a href="#hero" style={styles.logo} onClick={closeMenu}>
          {first}<span style={styles.logoDot}>.</span>{rest.join(' ')}
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={styles.links}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  style={styles.link}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--rust)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  {label}
                </a>
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
          <a href={`mailto:${hero.ctaEmail}`} style={styles.hireCta}>
            Hire me →
          </a>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobile && menuOpen && (
        <div style={styles.drawer}>
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={styles.drawerLink}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
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
    color:          'var(--muted)',
    textDecoration: 'none',
    fontSize:       '0.78rem',
    letterSpacing:  '0.12em',
    textTransform:  'uppercase',
    transition:     'color 0.2s',
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
    background:     'rgba(10,11,14,0.97)',
    backdropFilter: 'blur(16px)',
    borderBottom:   '1px solid var(--line)',
    display:        'flex',
    flexDirection:  'column',
    padding:        '1.5rem',
    gap:            '0.2rem',
  } as React.CSSProperties,

  drawerLink: {
    color:          'var(--muted)',
    textDecoration: 'none',
    fontSize:       '0.9rem',
    letterSpacing:  '0.1em',
    textTransform:  'uppercase',
    padding:        '0.75rem 0',
    borderBottom:   '1px solid var(--line)',
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
