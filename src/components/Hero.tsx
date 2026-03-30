import { hero, stats } from '../data';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { GitHubIcon } from './icons/GitHubIcon';

export function Hero() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [firstName, lastName] = hero.name.split(' ');

  return (
    <div id="hero" className="scanlines" style={{ ...styles.hero, padding: isMobile ? '0 1.5rem' : '0 3rem' }}>
      {/* Dot-grid background */}
      <div style={styles.gridBg} />

      {/* Radial rust glow */}
      <div style={styles.glow} />

      <div style={styles.inner}>
        {/* "Available" pill badge */}
        <div style={styles.tag}>{hero.tagline}</div>

        {/* Name */}
        <h1 style={styles.h1}>
          {firstName}<br />
          <span style={{ color: 'var(--rust)' }}>{lastName}</span>
        </h1>

        {/* Subtitle */}
        <p style={styles.sub}>
          {hero.subtitle}<br />
          Primary stack:{' '}
          <em style={{ color: 'var(--amber)', fontStyle: 'normal' }}>{hero.stack}</em>{' '}
          {hero.stackNote}
        </p>

        {/* CTA buttons */}
        <div style={{ ...styles.cta, flexDirection: isMobile ? 'column' : 'row' }}>
          <a href={`mailto:${hero.ctaEmail}`} style={{ ...styles.btnPrimary, textAlign: 'center', justifyContent: 'center' }}>
            Get in touch →
          </a>
          <a href={hero.githubUrl} target="_blank" rel="noreferrer" style={styles.btnGhost}>
            <GitHubIcon size={14} /> GitHub
          </a>
          <a href={hero.blogUrl} target="_blank" rel="noreferrer" style={styles.btnGhost}>Blog →</a>
        </div>

        {/* Stats row */}
        <div style={{
          ...styles.statsRow,
          gap:                 isMobile ? '1.4rem' : '3rem',
          flexWrap:            'wrap',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : undefined,
          display:             isMobile ? 'grid' : 'flex',
        }}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <div style={styles.statNum}>
                {stat.value.replace(/[^0-9kK]/g, '')}
                <span style={{ color: 'var(--rust)' }}>
                  {stat.value.replace(/[0-9kK]/g, '')}
                </span>
              </div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const BASE_BTN: React.CSSProperties = {
  display:        'inline-flex',
  alignItems:     'center',
  gap:            '0.5rem',
  textDecoration: 'none',
  padding:        '0.65rem 1.4rem',
  fontFamily:     "'JetBrains Mono', monospace",
  fontSize:       '0.78rem',
  letterSpacing:  '0.06em',
  borderRadius:   '3px',
  transition:     'all 0.2s',
  cursor:         'pointer',
  border:         'none',
};

const styles = {
  hero: {
    position:   'relative',
    minHeight:  '100vh',
    display:    'flex',
    alignItems: 'center',
    overflow:   'hidden',
    background: 'var(--bg)',
  } as React.CSSProperties,

  gridBg: {
    position:        'absolute',
    inset:           0,
    backgroundImage: `
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px)
    `,
    backgroundSize: '48px 48px',
    maskImage:      'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)',
  } as React.CSSProperties,

  glow: {
    position:      'absolute',
    width:         '600px',
    height:        '600px',
    background:    'radial-gradient(circle, rgba(232,73,29,0.12) 0%, transparent 70%)',
    top:           '50%',
    left:          '55%',
    transform:     'translate(-50%, -50%)',
    pointerEvents: 'none',
  } as React.CSSProperties,

  inner: {
    position: 'relative',
    maxWidth: '860px',
    width:    '100%',
  } as React.CSSProperties,

  tag: {
    display:       'inline-flex',
    alignItems:    'center',
    gap:           '0.5rem',
    border:        '1px solid var(--rust-dim)',
    color:         'var(--rust)',
    fontSize:      '0.72rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    padding:       '0.3rem 0.8rem',
    borderRadius:  '2px',
    marginBottom:  '1.8rem',
    animation:     'fadeUp 0.6s ease both',
  } as React.CSSProperties,

  h1: {
    fontFamily:    "'Syne', sans-serif",
    fontSize:      'clamp(2.6rem, 7vw, 6rem)',
    fontWeight:    800,
    lineHeight:    1.0,
    letterSpacing: '-0.02em',
    color:         'var(--text)',
    animation:     'fadeUp 0.7s 0.1s ease both',
  } as React.CSSProperties,

  sub: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize:   'clamp(0.85rem, 2.5vw, 1.05rem)',
    color:      'var(--muted)',
    marginTop:  '1.4rem',
    maxWidth:   '560px',
    animation:  'fadeUp 0.7s 0.2s ease both',
  } as React.CSSProperties,

  cta: {
    display:   'flex',
    flexWrap:  'wrap',
    gap:       '0.8rem',
    marginTop: '2.4rem',
    animation: 'fadeUp 0.7s 0.3s ease both',
  } as React.CSSProperties,

  btnPrimary: {
    ...BASE_BTN,
    background: 'var(--rust)',
    color:      '#fff',
  } as React.CSSProperties,

  btnGhost: {
    ...BASE_BTN,
    background: 'transparent',
    color:      'var(--text)',
    border:     '1px solid var(--bg3)',
  } as React.CSSProperties,

  statsRow: {
    marginTop:  '3.5rem',
    paddingTop: '2rem',
    borderTop:  '1px solid var(--line)',
    animation:  'fadeUp 0.7s 0.4s ease both',
  } as React.CSSProperties,

  statNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize:   '2.2rem',
    fontWeight: 800,
    color:      'var(--text)',
    lineHeight: 1,
  } as React.CSSProperties,

  statLabel: {
    fontSize:      '0.7rem',
    color:         'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginTop:     '0.25rem',
  } as React.CSSProperties,
} as const;
