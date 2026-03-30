import type { BlogPost } from '../data';
import { security } from '../data';
import { useMediaQuery } from '../hooks/useMediaQuery';

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      className="reveal"
      style={styles.card}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--rust-dim)';
        e.currentTarget.style.transform   = 'translateY(-3px)';
        e.currentTarget.style.boxShadow   = '0 12px 32px rgba(0,0,0,0.4)';
        const arrow = e.currentTarget.querySelector<HTMLElement>('.card-arrow');
        if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'translateX(0)'; }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--bg3)';
        e.currentTarget.style.transform   = '';
        e.currentTarget.style.boxShadow   = '';
        const arrow = e.currentTarget.querySelector<HTMLElement>('.card-arrow');
        if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'translateX(-4px)'; }
      }}
    >
      <div style={styles.cardTag}>{post.tag}</div>
      <div style={styles.cardTitle}>{post.title}</div>
      <div style={styles.cardDate}>{post.date}</div>
      <div className="card-arrow" style={{ ...styles.cardArrow, opacity: 0, transform: 'translateX(-4px)' }}>→</div>
    </a>
  );
}

export function Security() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section
      id="security"
      style={{ ...styles.section, padding: isMobile ? '4rem 1.5rem' : '6rem 3rem' }}
    >
      <div style={styles.inner}>
        <div className="section-label">// hashpigz blog · security research</div>
        <h2>Security Research</h2>

        <p style={styles.intro}>
          Outside of backend work, I research malware and offensive security — published on{' '}
          <a href={security.blogUrl} target="_blank" rel="noreferrer" style={styles.link}>
            ivankram.github.io
          </a>.
          {' '}Deep understanding of low-level system behaviour informs how I design resilient, secure backend systems.
        </p>

        <div style={{ ...styles.grid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {security.posts.map((post) => <BlogCard key={post.url} post={post} />)}
        </div>

        <div style={styles.ctfBadge}>{security.ctfBadge}</div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth:   'none',
    borderTop:  '1px solid var(--line)',
    background: 'linear-gradient(to bottom, transparent, var(--bg1) 40%, transparent)',
  } as React.CSSProperties,

  inner: {
    maxWidth: '1100px',
    margin:   '0 auto',
  } as React.CSSProperties,

  intro: {
    color:        'var(--muted)',
    fontSize:     '0.85rem',
    marginBottom: '2rem',
    maxWidth:     '540px',
  } as React.CSSProperties,

  link: {
    color:          'var(--rust)',
    textDecoration: 'none',
  } as React.CSSProperties,

  grid: {
    display: 'grid',
    gap:     '1.2rem',
  } as React.CSSProperties,

  card: {
    background:     'var(--bg1)',
    border:         '1px solid var(--bg3)',
    borderRadius:   '6px',
    padding:        '1.6rem',
    textDecoration: 'none',
    display:        'flex',
    flexDirection:  'column',
    transition:     'all 0.2s',
    position:       'relative',
  } as React.CSSProperties,

  cardTag: {
    fontSize:      '0.65rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color:         'var(--rust)',
    marginBottom:  '0.7rem',
  } as React.CSSProperties,

  cardTitle: {
    fontFamily:   "'Syne', sans-serif",
    fontSize:     '0.95rem',
    fontWeight:   700,
    color:        'var(--text)',
    lineHeight:   1.4,
    flex:         1,
    marginBottom: '1rem',
  } as React.CSSProperties,

  cardDate: {
    fontSize: '0.68rem',
    color:    'var(--muted)',
  } as React.CSSProperties,

  cardArrow: {
    color:      'var(--rust)',
    fontSize:   '0.9rem',
    marginLeft: 'auto',
    marginTop:  '0.5rem',
    transition: 'all 0.2s',
  } as React.CSSProperties,

  ctfBadge: {
    display:      'inline-flex',
    alignItems:   'center',
    gap:          '0.6rem',
    background:   'rgba(245,166,35,0.08)',
    border:       '1px solid rgba(245,166,35,0.25)',
    color:        'var(--amber)',
    fontSize:     '0.78rem',
    padding:      '0.5rem 1rem',
    borderRadius: '4px',
    marginTop:    '1.5rem',
  } as React.CSSProperties,
} as const;
