import { footer } from '../data';
import { useMediaQuery } from '../hooks/useMediaQuery';

export function Footer() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <footer style={{
      ...styles.footer,
      flexDirection: isMobile ? 'column' : 'row',
      gap:           isMobile ? '0.5rem' : '0',
      textAlign:     isMobile ? 'center' : 'left',
      padding:       isMobile ? '2rem 1.5rem' : '2rem 3rem',
    }}>
      <span>{footer.copyright}</span>
      <span style={{ color: 'var(--rust)' }}>{footer.tagline}</span>
      <span>{footer.location}</span>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop:      '1px solid var(--line)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    color:          'var(--muted)',
    fontSize:       '0.72rem',
  } as React.CSSProperties,
} as const;
