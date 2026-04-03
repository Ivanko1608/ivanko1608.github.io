import { about } from '../data';
import { useMediaQuery } from '../hooks/useMediaQuery';

// Renders **bold** and *italic* markdown-like syntax in a string
function InlineMarkdown({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i} style={{ color: 'var(--text)', fontWeight: 500 }}>{part.slice(2, -2)}</strong>;
        if (part.startsWith('*') && part.endsWith('*'))
          return <em key={i} style={{ color: 'var(--amber)', fontStyle: 'normal' }}>{part.slice(1, -1)}</em>;
        return part;
      })}
    </>
  );
}

export function About() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section id="about" style={{ ...styles.section, padding: isMobile ? '4rem 1.5rem' : '6rem 3rem' }}>
      <div className="section-label">// who I am</div>
      <h2>About me</h2>

      <div style={{ ...styles.grid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2.5rem' : '4rem' }}>
        {/* Left — bio + language bars */}
        <div className="reveal" style={{ minWidth: 0 }}>
          {about.paragraphs.map((para, i) => (
            <p key={i} style={styles.para}><InlineMarkdown text={para} /></p>
          ))}

          <div style={styles.langList}>
            {about.languages.map(({ name, level, pct }) => (
              <div key={name} style={styles.langItem}>
                <span>{name}</span>
                <div style={styles.langBarWrap}>
                  <div style={{ ...styles.langBar, width: `${pct}%` }} />
                </div>
                <span style={styles.langLevel}>{level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Rust motivation card */}
        <div className="reveal" style={styles.rustCard}>
          <h3 style={styles.rustCardHeading}>{about.rustCard.heading}</h3>
          {about.rustCard.paragraphs.map((para, i) => (
            <p key={i} style={styles.rustCardPara}>{para}</p>
          ))}

          {/* diy-term project card */}
          <a
            href="https://github.com/Ivanko1608/diy-term"
            target="_blank"
            rel="noreferrer"
            style={styles.projectCard}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--rust-dim)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg3)'; }}
          >
            <div style={styles.projectLabel}>Featured project</div>
            <div style={styles.projectName}>diy-term</div>
            <div style={styles.projectDesc}>
              A shell built from scratch in Rust — stdlib only, zero crates.
            </div>
            <div style={styles.projectLink}>View on GitHub →</div>
          </a>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth:  '1100px',
    width:     '100%',
    margin:    '0 auto',
    borderTop: '1px solid var(--line)',
  } as React.CSSProperties,

  grid: {
    display:    'grid',
    alignItems: 'start',
  } as React.CSSProperties,

  para: {
    color:        '#9CA3AF',
    fontSize:     '0.92rem',
    marginBottom: '1rem',
    lineHeight:   1.9,
  } as React.CSSProperties,

  langList: {
    marginTop:     '1.8rem',
    display:       'flex',
    flexDirection: 'column',
    gap:           '0.5rem',
  } as React.CSSProperties,

  langItem: {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    fontSize:       '0.78rem',
  } as React.CSSProperties,

  langBarWrap: {
    flex:         1,
    height:       '3px',
    background:   'var(--bg3)',
    margin:       '0 1rem',
    borderRadius: '2px',
    overflow:     'hidden',
  } as React.CSSProperties,

  langBar: {
    height:       '100%',
    background:   'linear-gradient(90deg, var(--rust), var(--amber))',
    borderRadius: '2px',
  } as React.CSSProperties,

  langLevel: {
    color:    'var(--muted)',
    fontSize: '0.7rem',
  } as React.CSSProperties,

  rustCard: {
    background:   'var(--bg1)',
    border:       '1px solid var(--line)',
    borderLeft:   '3px solid var(--rust)',
    borderRadius: '6px',
    padding:      '1.8rem',
    minWidth:     0,
  } as React.CSSProperties,

  rustCardHeading: {
    fontFamily:   "'Syne', sans-serif",
    fontWeight:   700,
    fontSize:     '1.1rem',
    marginBottom: '1rem',
    color:        'var(--rust)',
  } as React.CSSProperties,

  rustCardPara: {
    color:        '#9CA3AF',
    fontSize:     '0.85rem',
    lineHeight:   1.8,
    marginBottom: '0.8rem',
  } as React.CSSProperties,

  projectCard: {
    display:        'block',
    background:     'var(--bg)',
    border:         '1px solid var(--bg3)',
    borderRadius:   '4px',
    padding:        '1.2rem 1.4rem',
    marginTop:      '1.2rem',
    textDecoration: 'none',
    transition:     'border-color 0.2s',
    cursor:         'pointer',
  } as React.CSSProperties,

  projectLabel: {
    fontSize:      '0.6rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color:         'var(--rust)',
    marginBottom:  '0.4rem',
  } as React.CSSProperties,

  projectName: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize:   '1rem',
    color:      'var(--text)',
  } as React.CSSProperties,

  projectDesc: {
    fontSize:   '0.78rem',
    color:      'var(--muted)',
    lineHeight: 1.6,
    marginTop:  '0.4rem',
  } as React.CSSProperties,

  projectLink: {
    fontSize:   '0.75rem',
    color:      'var(--rust)',
    marginTop:  '0.8rem',
  } as React.CSSProperties,
} as const;
