import { contact } from '../data';
import type { ContactLink } from '../data';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { EmailIcon } from './icons/EmailIcon';
import { GitHubIcon } from './icons/GitHubIcon';
import { GlobeIcon }  from './icons/GlobeIcon';
import { PhoneIcon }  from './icons/PhoneIcon';

const ICON_MAP = {
  email:  EmailIcon,
  github: GitHubIcon,
  globe:  GlobeIcon,
  phone:  PhoneIcon,
} as const;

function ContactButton({ link }: { link: ContactLink }) {
  const Icon = ICON_MAP[link.icon];
  return (
    <a
      href={link.href}
      target={link.icon !== 'email' && link.icon !== 'phone' ? '_blank' : undefined}
      rel="noreferrer"
      style={styles.link}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--rust)'; e.currentTarget.style.borderColor = 'var(--rust-dim)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--bg3)'; }}
    >
      <Icon size={14} />
      {link.label}
    </a>
  );
}

export function Contact() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section
      id="contact"
      style={{ ...styles.section, padding: isMobile ? '4rem 1.5rem' : '6rem 3rem' }}
    >
      <div className="section-label">// get in touch</div>
      <h2>{contact.heading}</h2>
      <p style={styles.sub}>{contact.subtext}</p>

      <div style={{
        ...styles.linksRow,
        flexDirection: isMobile ? 'column' : 'row',
        alignItems:    isMobile ? 'stretch' : 'center',
      }}>
        {contact.links.map((link) => (
          <ContactButton key={link.href} link={link} />
        ))}
      </div>

      <div style={{ ...styles.euNote, textAlign: 'center', display: 'block', marginTop: '3rem' }}>
        {contact.euNote}
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth:  '1100px',
    margin:    '0 auto',
    borderTop: '1px solid var(--line)',
    textAlign: 'center',
  } as React.CSSProperties,

  sub: {
    color:        'var(--muted)',
    fontSize:     '0.85rem',
    marginBottom: '2.5rem',
  } as React.CSSProperties,

  linksRow: {
    display:        'flex',
    flexWrap:       'wrap',
    justifyContent: 'center',
    gap:            '1rem',
  } as React.CSSProperties,

  link: {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            '0.5rem',
    textDecoration: 'none',
    color:          'var(--muted)',
    fontSize:       '0.8rem',
    border:         '1px solid var(--bg3)',
    padding:        '0.6rem 1.2rem',
    borderRadius:   '4px',
    transition:     'all 0.2s',
  } as React.CSSProperties,

  euNote: {
    background:   'var(--bg1)',
    border:       '1px solid var(--bg3)',
    borderRadius: '4px',
    padding:      '0.7rem 1.2rem',
    fontSize:     '0.78rem',
    color:        'var(--muted)',
    lineHeight:   1.7,
  } as React.CSSProperties,
} as const;
