import { useState } from 'react';

export function GithubNoticeBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div style={styles.banner}>
      <span style={styles.icon}>ℹ</span>
      <span style={styles.text}>
        This site is hosted on a secondary GitHub account — all project links point to my primary account.
      </span>
      <button
        style={styles.close}
        onClick={() => setDismissed(true)}
        aria-label="Dismiss notice"
      >
        ✕
      </button>
    </div>
  );
}

const styles = {
  banner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.55rem 1.25rem',
    background: 'rgba(180,90,40, 0.12)',
    borderBottom: '1px solid rgba(180,90,40,0.3)',
    fontSize: '0.72rem',
    color: 'var(--muted)',
    letterSpacing: '0.01em',
  } as React.CSSProperties,

  icon: {
    color: 'var(--rust)',
    fontStyle: 'normal',
    flexShrink: 0,
    fontSize: '0.8rem',
  } as React.CSSProperties,

  text: {
    flex: 1,
  } as React.CSSProperties,

  close: {
    background: 'transparent',
    border: 'none',
    color: 'var(--rust)',
    cursor: 'pointer',
    fontSize: '0.7rem',
    padding: '0.15rem 0.3rem',
    lineHeight: 1,
    flexShrink: 0,
    opacity: 0.9,
  } as React.CSSProperties,
} as const;
