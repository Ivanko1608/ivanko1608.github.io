import {
  Document, Page, View, Text, Link, Font,
  pdf, StyleSheet,
} from '@react-pdf/renderer';
import {
  hero, stats, about, experience, skillCategories, security, contact,
} from '../data';

// ── Fonts ────────────────────────────────────────────────────────────────────
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf', fontWeight: 400 },
    { src: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-500-normal.ttf', fontWeight: 500 },
    { src: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf', fontWeight: 700 },
  ],
});

// ── Colors & tokens ──────────────────────────────────────────────────────────
const C = {
  black:  '#1a1a1a',
  dark:   '#333333',
  gray:   '#555555',
  light:  '#888888',
  faint:  '#d4d4d4',
  bg:     '#f7f7f7',
  rust:   '#C73E14',
  white:  '#ffffff',
};

// ── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 9.5,
    color: C.dark,
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 48,
    backgroundColor: C.white,
  },
  // Header
  name: { fontSize: 26, fontWeight: 700, color: C.black, letterSpacing: -0.5 },
  accentBar: { width: 50, height: 2.5, backgroundColor: C.rust, marginTop: 5, marginBottom: 10 },
  subtitle: { fontSize: 11, color: C.dark, marginBottom: 3 },
  stack: { fontSize: 9, color: C.gray, marginBottom: 12 },
  contactRow: { flexDirection: 'row', gap: 6, marginBottom: 14, flexWrap: 'wrap' },
  contactItem: { fontSize: 7.5, color: C.gray },
  contactSep: { fontSize: 7.5, color: C.faint },
  // Stats
  statsRow: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: C.faint, paddingTop: 10, marginBottom: 14 },
  statBox: { flex: 1 },
  statVal: { fontSize: 15, fontWeight: 700, color: C.rust },
  statLabel: { fontSize: 6.5, color: C.light, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 2 },
  // Sections
  section: { marginBottom: 10 },
  sectionHead: {
    fontSize: 10, fontWeight: 700, color: C.rust, textTransform: 'uppercase',
    letterSpacing: 1.2, marginBottom: 8, paddingBottom: 4,
    borderBottomWidth: 0.5, borderBottomColor: C.faint,
  },
  // Experience
  jobWrap: { marginBottom: 10 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 },
  jobTitle: { fontSize: 10, fontWeight: 700, color: C.black },
  jobPeriod: { fontSize: 8, color: C.light, textAlign: 'right' },
  jobCompany: { fontSize: 9, color: C.rust, marginBottom: 4 },
  jobBody: { fontSize: 8.5, color: C.gray, lineHeight: 1.5, marginBottom: 4 },
  bulletRow: { flexDirection: 'row', marginBottom: 3, paddingLeft: 2 },
  bulletDot: { width: 10, fontSize: 8.5, color: C.rust, fontWeight: 700 },
  bulletText: { flex: 1, fontSize: 8.5, color: C.dark, lineHeight: 1.45 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  tag: { fontSize: 6.5, color: C.light, backgroundColor: C.bg, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 2 },
  // Skills
  skillCat: { marginBottom: 6 },
  skillCatTitle: { fontSize: 9, fontWeight: 700, color: C.dark, marginBottom: 3 },
  skillCatTitleFeat: { fontSize: 9, fontWeight: 700, color: C.rust, marginBottom: 3 },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  pill: { fontSize: 7.5, color: C.gray, backgroundColor: C.bg, paddingHorizontal: 6, paddingVertical: 2.5, borderRadius: 2 },
  pillRust: { fontSize: 7.5, color: C.rust, backgroundColor: '#fdf2f0', paddingHorizontal: 6, paddingVertical: 2.5, borderRadius: 2 },
  // Security
  ctfBadge: { fontSize: 9, fontWeight: 700, color: C.dark, marginBottom: 8 },
  postRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  postTitle: { fontSize: 8.5, color: C.dark, flex: 1, paddingRight: 8 },
  postDate: { fontSize: 7.5, color: C.light, flexShrink: 0 },
  // Footer
  footerWrap: { marginTop: 12, paddingTop: 10, borderTopWidth: 0.5, borderTopColor: C.faint },
  ctaBox: {
    backgroundColor: '#fdf2f0', borderRadius: 4, padding: 12, borderLeftWidth: 2.5, borderLeftColor: C.rust,
  },
  ctaTitle: { fontSize: 9.5, fontWeight: 700, color: C.black },
  footerLink: { fontSize: 10, fontWeight: 700, color: C.rust, textDecoration: 'none' },
});

// ── Helpers ──────────────────────────────────────────────────────────────────
function strip(t: string) {
  return t.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
}

/** Remove emoji characters that Inter can't render in the PDF */
function stripEmoji(t: string) {
  return t.replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FEFF}]|[\u2699]/gu, '').trim();
}

// ── Document ─────────────────────────────────────────────────────────────────
function ResumeDocument() {
  return (
    <Document title={`${hero.name} — Resume`} author={hero.name}>
      <Page size="A4" style={s.page} wrap>

        {/* ── Header ──────────────────────────────────────────────── */}
        <Text style={s.name}>{hero.name}</Text>
        <View style={s.accentBar} />
        <Text style={s.subtitle}>{strip(hero.subtitle)}</Text>
        <Text style={s.stack}>{hero.stack}  {hero.stackNote}</Text>

        <View style={s.contactRow}>
          <Text style={s.contactItem}>{hero.ctaEmail}</Text>
          <Text style={s.contactSep}>|</Text>
          <Text style={s.contactItem}>Mallorca, Spain · Remote</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 4, marginBottom: 14 }}>
          <Link src={hero.githubUrl} style={s.contactItem}>{hero.githubUrl.replace('https://', '')}</Link>
          <Text style={{ fontSize: 7.5, color: C.light }}>(legacy)</Text>
          <Text style={s.contactSep}>|</Text>
          <Link src="https://github.com/Ivanko1608" style={s.contactItem}>github.com/Ivanko1608</Link>
          <Text style={{ fontSize: 7.5, color: C.light }}>(Rust & current work)</Text>
        </View>

        {/* ── Stats ───────────────────────────────────────────────── */}
        <View style={s.statsRow}>
          {stats.map(st => (
            <View key={st.label} style={s.statBox}>
              <Text style={s.statVal}>{st.value}</Text>
              <Text style={s.statLabel}>{st.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Profile ─────────────────────────────────────────────── */}
        <View style={s.section} wrap={false}>
          <Text style={s.sectionHead}>Profile</Text>
          {about.paragraphs.slice(0, 2).map((p, i) => (
            <Text key={i} style={s.jobBody}>{strip(p)}</Text>
          ))}
          <Text style={{ ...s.contactItem, marginTop: 4 }}>
            {about.languages.map(l => `${l.name} (${l.level})`).join('   ·   ')}
          </Text>
        </View>

        {/* ── Experience ──────────────────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionHead}>Experience</Text>
          {experience.map((job, i) => (
            <View key={i} style={s.jobWrap} wrap={false}>
              <View style={s.jobHeader}>
                <Text style={s.jobTitle}>{job.title}</Text>
                <Text style={s.jobPeriod}>{job.period}</Text>
              </View>
              <Text style={s.jobCompany}>{job.company}</Text>
              <Text style={s.jobBody}>{job.body}</Text>

              {job.bullets.map((b, j) => (
                <View key={j} style={s.bulletRow}>
                  <Text style={s.bulletDot}>•</Text>
                  <Text style={s.bulletText}>{strip(b)}</Text>
                </View>
              ))}

              {job.tags.length > 0 && (
                <View style={s.tagRow}>
                  {job.tags.map(t => (
                    <Text key={t.label} style={s.tag}>{t.label}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* ── Skills ──────────────────────────────────────────────── */}
        <View style={s.section} wrap={false}>
          <Text style={s.sectionHead}>Skills</Text>
          {skillCategories.map((cat, i) => (
            <View key={i} style={s.skillCat}>
              <Text style={cat.featured ? s.skillCatTitleFeat : s.skillCatTitle}>{stripEmoji(cat.title)}</Text>
              <View style={s.pillRow}>
                {cat.pills.map(p => (
                  <Text key={p.label} style={p.variant === 'rust' ? s.pillRust : s.pill}>{p.label}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* ── Security ────────────────────────────────────────────── */}
        <View style={s.section} wrap={false}>
          <Text style={s.sectionHead}>Security Research & CTF</Text>
          <Text style={s.ctfBadge}>{stripEmoji(security.ctfBadge)}</Text>
          {security.posts.map((post, i) => (
            <View key={i} style={s.postRow}>
              <Text style={s.postTitle}>{post.title}</Text>
              <Text style={s.postDate}>{post.date}</Text>
            </View>
          ))}
          <View style={{ flexDirection: 'row', marginTop: 6, gap: 4 }}>
            <Text style={{ fontSize: 8.5, color: C.gray }}>Read more at</Text>
            <Link src={security.blogUrl} style={{ fontSize: 8.5, color: C.rust, textDecoration: 'none' }}>
              {security.blogUrl.replace('https://', '')}
            </Link>
          </View>
        </View>

        {/* ── Footer CTA ──────────────────────────────────────────── */}
        <View style={s.footerWrap} wrap={false}>
          <View style={s.ctaBox}>
            <Text style={s.ctaTitle}>This PDF is a summary. The full version is interactive.</Text>
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', marginTop: 4 }}>
              <Link src="https://ivanko1608.github.io" style={s.footerLink}>
                ivanko1608.github.io
              </Link>
              <Text style={{ fontSize: 8, color: C.gray }}>
                — detailed project cards, a working terminal emulator, and security blog.
              </Text>
            </View>
          </View>
          <Text style={{ ...s.contactItem, marginTop: 10 }}>
            {stripEmoji(contact.euNote)}
          </Text>
        </View>

      </Page>
    </Document>
  );
}

// ── Render & download ────────────────────────────────────────────────────────
export async function renderResumePdf() {
  const blob = await pdf(<ResumeDocument />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Ivan_Kramarenko_Resume.pdf';
  a.click();
  URL.revokeObjectURL(url);
}
