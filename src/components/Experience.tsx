import type { ExperienceItem, Tag } from '../data';
import { experience } from '../data';
import { useMediaQuery } from '../hooks/useMediaQuery';

function Bold({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i} style={{ color: 'var(--text)' }}>{part.slice(2, -2)}</strong>
          : part,
      )}
    </>
  );
}

function TagBadge({ tag }: { tag: Tag }) {
  const variantStyles: Record<Tag['variant'], React.CSSProperties> = {
    default: { borderColor: 'var(--bg3)', color: 'var(--muted)' },
    rust: { borderColor: 'var(--rust-dim)', color: 'var(--rust)' },
    go: { borderColor: '#00ACD7', color: '#00ACD7' },
    node: { borderColor: '#417E38', color: '#6CC24A' },
  };
  return (
    <span style={{ ...styles.tag, ...variantStyles[tag.variant] }}>
      {tag.label}
    </span>
  );
}

function TimelineItem({ item }: { item: ExperienceItem }) {
  return (
    <div className="reveal" style={styles.item}>
      <div style={{ ...styles.dot, ...(item.current ? styles.dotActive : {}) }} />
      <div style={styles.meta}>{item.period}</div>
      <div style={styles.title}>{item.title}</div>
      <div style={styles.company}>{item.company}</div>
      <div style={styles.body}>
        <p>{item.body}</p>
        {item.bullets.length > 0 && (
          <ul style={styles.bulletList}>
            {item.bullets.map((bullet, i) => (
              <li key={i} style={styles.bulletItem}>
                <span style={styles.bulletArrow}>›</span>
                <Bold text={bullet} />
              </li>
            ))}
          </ul>
        )}
        <div style={styles.tagRow}>
          {item.tags.map((tag) => <TagBadge key={tag.label} tag={tag} />)}
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section
      id="experience"
      style={{ ...styles.section, padding: isMobile ? '4rem 1.5rem' : '6rem 3rem' }}
    >
      <div style={styles.inner}>
        <div className="section-label">// work history</div>
        <h2>Experience</h2>
        <div style={styles.timeline}>
          {experience.map((item) => (
            <TimelineItem key={item.title + item.period} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth: 'none',
    borderTop: '1px solid var(--line)',
    background: 'linear-gradient(to bottom, transparent, var(--bg1) 30%, transparent)',
  } as React.CSSProperties,

  inner: {
    maxWidth: '860px',
    margin: '0 auto',
  } as React.CSSProperties,

  timeline: {
    position: 'relative',
  } as React.CSSProperties,

  item: {
    paddingLeft: '2.4rem',
    paddingBottom: '3.2rem',
    position: 'relative',
    borderLeft: '1px solid',
    borderImage: 'linear-gradient(to bottom, var(--rust), var(--line), transparent) 1',
  } as React.CSSProperties,

  dot: {
    position: 'absolute',
    left: '-6px',
    top: '0.3rem',
    width: '11px',
    height: '11px',
    borderRadius: '50%',
    background: 'var(--bg)',
    border: '2px solid var(--rust)',
  } as React.CSSProperties,

  dotActive: {
    background: 'var(--rust)',
    boxShadow: '0 0 12px rgba(232,73,29,0.5)',
  } as React.CSSProperties,

  meta: {
    fontSize: '0.7rem',
    color: 'var(--muted)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '0.4rem',
  } as React.CSSProperties,

  title: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: '0.2rem',
  } as React.CSSProperties,

  company: {
    color: 'var(--rust)',
    fontSize: '0.82rem',
    marginBottom: '1rem',
  } as React.CSSProperties,

  body: {
    color: '#9CA3AF',
    fontSize: '0.82rem',
    lineHeight: 1.85,
    maxWidth: '640px',
  } as React.CSSProperties,

  bulletList: {
    listStyle: 'none',
    marginTop: '0.6rem',
  } as React.CSSProperties,

  bulletItem: {
    display: 'flex',
    gap: '0.4rem',
    marginBottom: '0.35rem',
  } as React.CSSProperties,

  bulletArrow: {
    color: 'var(--rust)',
    flexShrink: 0,
  } as React.CSSProperties,

  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
    marginTop: '0.9rem',
  } as React.CSSProperties,

  tag: {
    fontSize: '0.68rem',
    letterSpacing: '0.08em',
    padding: '0.2rem 0.6rem',
    borderRadius: '2px',
    background: 'var(--bg2)',
    border: '1px solid',
  } as React.CSSProperties,
} as const;
