import { useEffect, useState } from 'react';

interface LandingProps {
  onResume: () => void;
  onTerminal: () => void;
}

export function Landing({ onResume, onTerminal }: LandingProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={styles.root}>
      <div style={{
        ...styles.content,
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <p style={styles.greeting}>Hello, I'm</p>
        <h1 style={styles.name}>Ivan Kramarenko</h1>
        <p style={styles.subtitle}>Backend Engineer &amp; Rust Enthusiast</p>

        <div style={styles.buttons}>
          <button style={styles.resumeBtn} onClick={onResume}>
            View Resume →
          </button>
          <button style={styles.terminalBtn} onClick={onTerminal}>
            Go Deeper <span style={styles.cursor}>_</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    minHeight:       '100dvh',
    background:      'var(--bg)',
    padding:         '2rem',
  } as React.CSSProperties,

  content: {
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    textAlign:       'center',
    gap:             '1rem',
  } as React.CSSProperties,

  greeting: {
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       '0.85rem',
    color:          'var(--muted)',
    letterSpacing:  '0.12em',
    textTransform:  'uppercase',
  } as React.CSSProperties,

  name: {
    fontFamily:     "'Syne', sans-serif",
    fontWeight:     800,
    fontSize:       'clamp(2.4rem, 7vw, 5rem)',
    letterSpacing:  '-0.03em',
    color:          'var(--text)',
    lineHeight:     1.1,
  } as React.CSSProperties,

  subtitle: {
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       'clamp(0.85rem, 2.2vw, 1.1rem)',
    color:          'var(--muted)',
    marginBottom:   '1rem',
  } as React.CSSProperties,

  buttons: {
    display:        'flex',
    gap:            '1rem',
    flexWrap:       'wrap',
    justifyContent: 'center',
    marginTop:      '0.5rem',
  } as React.CSSProperties,

  resumeBtn: {
    display:        'inline-flex',
    alignItems:     'center',
    gap:            '0.4rem',
    padding:        '0.65rem 1.4rem',
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       '0.8rem',
    letterSpacing:  '0.06em',
    borderRadius:   '3px',
    border:         'none',
    background:     'var(--rust)',
    color:          '#fff',
    cursor:         'pointer',
    transition:     'background 0.2s',
  } as React.CSSProperties,

  terminalBtn: {
    display:        'inline-flex',
    alignItems:     'center',
    gap:            '0.4rem',
    padding:        '0.65rem 1.4rem',
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       '0.8rem',
    letterSpacing:  '0.06em',
    borderRadius:   '3px',
    border:         '1px solid var(--rust)',
    background:     'transparent',
    color:          'var(--text)',
    cursor:         'pointer',
    transition:     'background 0.2s, color 0.2s',
  } as React.CSSProperties,

  cursor: {
    display:   'inline-block',
    color:     'var(--rust)',
    animation: 'blink 1.1s step-end infinite',
  } as React.CSSProperties,
} as const;
