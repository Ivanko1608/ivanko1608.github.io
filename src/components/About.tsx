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

          {/* Syntax-highlighted Rust snippet */}
          <div style={styles.codeBlock}>
            <span style={styles.co}>{'// the goal: own memory, own performance'}</span>{'\n'}
            <span style={styles.kw}>async fn </span>
            <span style={styles.fn}>handle_conversion</span>({'\n'}
            {'    '}state: <span style={styles.ty}>Arc</span>{'<'}<span style={styles.ty}>AppState</span>{'>'},{'\n'}
            {'    '}ev:    <span style={styles.ty}>ConversionEvent</span>,{'\n'}
            {') -> '}<span style={styles.ty}>Result</span>{'<(), '}<span style={styles.ty}>AppError</span>{'> {'}{'\n'}
            {'    '}state.kafka.send(<span style={styles.st}>"conversions"</span>, ev).await?;{'\n'}
            {'    '}<span style={styles.ty}>Ok</span>(())
            {'\n}'}
          </div>
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

  codeBlock: {
    background:   'var(--code-bg)',
    border:       '1px solid var(--bg3)',
    borderRadius: '4px',
    padding:      '1rem 1.2rem',
    fontSize:     '0.75rem',
    color:        '#8B949E',
    marginTop:    '1.2rem',
    overflowX:    'auto',
    whiteSpace:   'pre',
    fontFamily:   "'JetBrains Mono', monospace",
    lineHeight:   1.7,
  } as React.CSSProperties,

  kw: { color: '#FF7B72' } as React.CSSProperties,
  ty: { color: '#79C0FF' } as React.CSSProperties,
  fn: { color: '#D2A8FF' } as React.CSSProperties,
  st: { color: '#A5D6FF' } as React.CSSProperties,
  co: { color: '#8B949E', fontStyle: 'italic' } as React.CSSProperties,
} as const;
