import type { SkillCategory, Pill, TechVariant } from '../data';
import { skillCategories } from '../data';
import { useMediaQuery } from '../hooks/useMediaQuery';

const pillVariantStyles: Record<TechVariant, React.CSSProperties> = {
  default:    { background: 'var(--bg2)',             border: '1px solid var(--bg3)',      color: 'var(--text)' },
  rust:       { background: 'rgba(232,73,29,0.12)',   border: '1px solid var(--rust-dim)', color: '#F4A17A' },
  go:         { background: 'rgba(0,172,215,0.08)',   border: '1px solid #00ACD7',         color: '#00ACD7' },
  typescript: { background: 'rgba(49,120,198,0.08)',  border: '1px solid #3178C6',         color: '#4F9CF9' },
  node:       { background: 'rgba(108,194,74,0.08)',  border: '1px solid #417E38',         color: '#6CC24A' },
};

function PillBadge({ pill }: { pill: Pill }) {
  return (
    <span style={{ ...styles.pill, ...pillVariantStyles[pill.variant ?? 'default'] }}>
      {pill.label}
    </span>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div className="reveal" style={category.featured ? styles.cardFeatured : styles.card}>
      <div style={category.featured ? styles.cardTitleFeatured : styles.cardTitle}>
        {category.title}
      </div>
      <div style={styles.pillsRow}>
        {category.pills.map((pill) => <PillBadge key={pill.label} pill={pill} />)}
      </div>
    </div>
  );
}

export function Skills() {
  const isMobile  = useMediaQuery('(max-width: 640px)');
  const isTablet  = useMediaQuery('(max-width: 900px)');

  const columns = isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)';

  return (
    <section
      id="skills"
      style={{ ...styles.section, padding: isMobile ? '4rem 1.5rem' : '6rem 3rem' }}
    >
      <div className="section-label">// technical stack</div>
      <h2>Skills &amp; Technologies</h2>

      <div style={{ ...styles.grid, gridTemplateColumns: columns }}>
        {skillCategories.map((cat) => (
          <SkillCard key={cat.title} category={cat} />
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth:  '1100px',
    margin:    '0 auto',
    borderTop: '1px solid var(--line)',
  } as React.CSSProperties,

  grid: {
    display: 'grid',
    gap:     '1.2rem',
  } as React.CSSProperties,

  card: {
    background:   'var(--bg1)',
    border:       '1px solid var(--bg3)',
    borderRadius: '6px',
    padding:      '1.4rem',
    transition:   'border-color 0.2s, transform 0.2s',
  } as React.CSSProperties,

  cardFeatured: {
    background:   'linear-gradient(135deg, var(--bg1), rgba(232,73,29,0.05))',
    border:       '1px solid var(--rust-dim)',
    borderRadius: '6px',
    padding:      '1.4rem',
    transition:   'border-color 0.2s, transform 0.2s',
  } as React.CSSProperties,

  cardTitle: {
    fontFamily:    "'Syne', sans-serif",
    fontSize:      '0.78rem',
    fontWeight:    700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color:         'var(--muted)',
    marginBottom:  '1rem',
  } as React.CSSProperties,

  cardTitleFeatured: {
    fontFamily:    "'Syne', sans-serif",
    fontSize:      '0.78rem',
    fontWeight:    700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color:         'var(--rust)',
    marginBottom:  '1rem',
  } as React.CSSProperties,

  pillsRow: {
    display:  'flex',
    flexWrap: 'wrap',
    gap:      '0.4rem',
  } as React.CSSProperties,

  pill: {
    fontSize:     '0.73rem',
    padding:      '0.25rem 0.65rem',
    borderRadius: '20px',
  } as React.CSSProperties,
} as const;
