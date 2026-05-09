import type { Episode } from '../data';
import { series } from '../data';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { GitHubIcon } from './icons/GitHubIcon';

function EpisodeRow({ episode }: { episode: Episode }) {
  const isLive = episode.status === 'live' && episode.url;
  const Wrap: 'a' | 'div' = isLive ? 'a' : 'div';
  const wrapProps = isLive
    ? { href: episode.url, target: '_blank', rel: 'noreferrer' }
    : {};

  const statusLabel =
    episode.status === 'live'   ? null
  : episode.status === 'wip'    ? 'in progress'
  : 'coming';

  return (
    <Wrap
      {...wrapProps}
      style={{ ...styles.epRow, opacity: isLive ? 1 : 0.6, cursor: isLive ? 'pointer' : 'default' }}
      onMouseEnter={isLive ? (e) => {
        e.currentTarget.style.borderColor = 'var(--rust-dim)';
        e.currentTarget.style.background  = 'rgba(232,73,29,0.04)';
      } : undefined}
      onMouseLeave={isLive ? (e) => {
        e.currentTarget.style.borderColor = 'var(--bg3)';
        e.currentTarget.style.background  = 'var(--bg1)';
      } : undefined}
    >
      <span style={styles.epNum}>EP {String(episode.number).padStart(2, '0')}</span>
      <span style={styles.epTitle}>{episode.title}</span>
      <span style={styles.epMeta}>
        {isLive
          ? <><span style={{ color: 'var(--rust)' }}>▶</span> {episode.runtime}</>
          : <span style={styles.epComing}>{statusLabel}</span>}
      </span>
    </Wrap>
  );
}

export function Series() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section
      id="series"
      style={{ ...styles.section, padding: isMobile ? '4rem 1.5rem' : '6rem 3rem' }}
    >
      <div style={styles.inner}>
        <div className="section-label">// long-form video series</div>

        <div style={{ ...styles.headerRow, flexDirection: isMobile ? 'column' : 'row' }}>
          <div>
            <h2 style={styles.h2}>{series.title}</h2>
            <div style={styles.meta}>
              <span>{series.totalRuntime}</span>
              <span style={styles.dot}>·</span>
              <span style={{ color: 'var(--rust)' }}>{series.status}</span>
            </div>
          </div>
        </div>

        <p style={styles.blurb}>{series.blurb}</p>

        <div style={styles.episodes}>
          {series.episodes.map((ep) => <EpisodeRow key={ep.number} episode={ep} />)}
        </div>

        {series.roadmap && series.roadmap.length > 0 && (
          <div style={styles.roadmap}>
            <div style={styles.roadmapLabel}>// on the roadmap (v2 goals)</div>
            <ul style={styles.roadmapList}>
              {series.roadmap.map((item) => (
                <li key={item} style={styles.roadmapItem}>
                  <span style={styles.roadmapBullet}>▸</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ ...styles.ctaRow, flexDirection: isMobile ? 'column' : 'row' }}>
          {(() => {
            const firstLive = series.episodes.find((ep) => ep.status === 'live' && ep.url);
            const watchUrl = firstLive?.url ?? series.playlistUrl;
            const watchLabel = firstLive ? `Watch episode ${firstLive.number}` : 'Watch on YouTube';
            return (
              <a href={watchUrl} target="_blank" rel="noreferrer" style={styles.ctaPrimary}>
                <YouTubeIcon size={14} /> {watchLabel}
              </a>
            );
          })()}
          {series.repoUrl && (
            <a href={series.repoUrl} target="_blank" rel="noreferrer" style={styles.ctaGhost}>
              <GitHubIcon size={14} /> Companion repo
            </a>
          )}
          <a href={series.channelUrl} target="_blank" rel="noreferrer" style={styles.ctaGhost}>
            Subscribe →
          </a>
        </div>
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

  headerRow: {
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'flex-start',
    gap:            '1rem',
    marginBottom:   '0.4rem',
  } as React.CSSProperties,

  h2: {
    margin: 0,
  } as React.CSSProperties,

  meta: {
    display:       'inline-flex',
    flexWrap:      'wrap',
    gap:           '0.5rem',
    fontFamily:    "'JetBrains Mono', monospace",
    fontSize:      '0.78rem',
    color:         'var(--muted)',
    marginTop:     '0.5rem',
    letterSpacing: '0.04em',
  } as React.CSSProperties,

  dot: {
    color: 'var(--bg3)',
  } as React.CSSProperties,

  blurb: {
    color:        'var(--muted)',
    fontSize:     '0.9rem',
    lineHeight:   1.6,
    marginTop:    '1.4rem',
    marginBottom: '2.4rem',
    maxWidth:     '640px',
  } as React.CSSProperties,

  episodes: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '0.5rem',
    marginBottom:  '2rem',
  } as React.CSSProperties,

  roadmap: {
    background:    'var(--bg1)',
    border:        '1px dashed var(--bg3)',
    borderRadius:  '4px',
    padding:       '1.2rem 1.4rem',
    marginBottom:  '2rem',
  } as React.CSSProperties,

  roadmapLabel: {
    fontFamily:    "'JetBrains Mono', monospace",
    fontSize:      '0.7rem',
    color:         'var(--muted)',
    letterSpacing: '0.08em',
    marginBottom:  '0.8rem',
  } as React.CSSProperties,

  roadmapList: {
    listStyle:     'none',
    padding:       0,
    margin:        0,
    display:       'flex',
    flexDirection: 'column',
    gap:           '0.4rem',
  } as React.CSSProperties,

  roadmapItem: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize:   '0.82rem',
    color:      'var(--text)',
  } as React.CSSProperties,

  roadmapBullet: {
    color:       'var(--rust)',
    marginRight: '0.5rem',
  } as React.CSSProperties,

  epRow: {
    display:        'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems:     'center',
    gap:            '1.2rem',
    background:     'var(--bg1)',
    border:         '1px solid var(--bg3)',
    borderRadius:   '4px',
    padding:        '0.9rem 1.1rem',
    textDecoration: 'none',
    transition:     'all 0.15s',
    color:          'var(--text)',
  } as React.CSSProperties,

  epNum: {
    fontFamily:    "'JetBrains Mono', monospace",
    fontSize:      '0.7rem',
    color:         'var(--rust)',
    letterSpacing: '0.1em',
    fontWeight:    700,
  } as React.CSSProperties,

  epTitle: {
    fontFamily:   "'JetBrains Mono', monospace",
    fontSize:     '0.85rem',
    color:        'var(--text)',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
  } as React.CSSProperties,

  epMeta: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize:   '0.75rem',
    color:      'var(--muted)',
    whiteSpace: 'nowrap',
  } as React.CSSProperties,

  epComing: {
    color:         'var(--muted)',
    fontSize:      '0.7rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  } as React.CSSProperties,

  ctaRow: {
    display:  'flex',
    flexWrap: 'wrap',
    gap:      '0.7rem',
  } as React.CSSProperties,

  ctaPrimary: {
    display:        'inline-flex',
    alignItems:     'center',
    gap:            '0.5rem',
    textDecoration: 'none',
    padding:        '0.6rem 1.2rem',
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       '0.78rem',
    letterSpacing:  '0.06em',
    borderRadius:   '3px',
    background:     'var(--rust)',
    color:          '#fff',
    transition:     'all 0.2s',
  } as React.CSSProperties,

  ctaGhost: {
    display:        'inline-flex',
    alignItems:     'center',
    gap:            '0.5rem',
    textDecoration: 'none',
    padding:        '0.6rem 1.2rem',
    fontFamily:     "'JetBrains Mono', monospace",
    fontSize:       '0.78rem',
    letterSpacing:  '0.06em',
    borderRadius:   '3px',
    background:     'transparent',
    color:          'var(--text)',
    border:         '1px solid var(--bg3)',
    transition:     'all 0.2s',
  } as React.CSSProperties,
} as const;
