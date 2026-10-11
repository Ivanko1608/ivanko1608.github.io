// ─────────────────────────────────────────────────────────────────────────────
// data.ts — All portfolio content lives here.
// Edit this file to update the site; no need to touch any component.
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Stat {
  value: string;   // e.g. "7+"
  label: string;   // e.g. "Years experience"
}

export interface Language {
  name: string;
  level: string;   // e.g. "C2 — Proficient"
  pct: number;   // 0–100 bar width
}

export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  body: string;
  bullets: string[];        // achievement bullets (use **bold** for emphasis)
  tags: Tag[];
  badges?: string[];        // optional result badges
  current?: boolean;         // highlights the timeline dot
}

export type TechVariant = 'default' | 'rust' | 'go' | 'node' | 'typescript';

export interface Tag {
  label: string;
  variant: TechVariant;
}

export interface SkillCategory {
  title: string;
  featured?: boolean;        // renders with rust accent styling
  pills: Pill[];
}

export interface Pill {
  label: string;
  variant?: TechVariant;
}

export interface BlogPost {
  url: string;
  tag: string;
  title: string;
  date: string;
}

export interface ContactLink {
  href: string;
  icon: 'email' | 'github' | 'globe' | 'phone' | 'youtube';
  label: string;
}

export interface Episode {
  number: number;
  title: string;
  runtime?: string;       // e.g. "4:50:00" — omit for unreleased
  url?: string;            // YouTube watch URL — omit for unreleased
  status: 'live' | 'coming' | 'wip';
  date?: string;           // e.g. "Mar 2026"
}

export interface Series {
  title: string;
  blurb: string;
  totalRuntime: string;     // e.g. "4h45m so far"
  status: string;            // e.g. "ongoing"
  playlistUrl: string;
  repoUrl?: string;
  channelUrl: string;
  episodes: Episode[];
  roadmap?: string[];       // unscoped future topics
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export const hero = {
  name: 'Ivan Kramarenko',
  jobTitle: 'Senior Backend Engineer & Team Lead',
  tagline: 'Open to senior backend & Rust roles · EU remote · CET',
  headline: 'Backends that stay up in production. In Rust, Go and Node.js.',
  subtitle: 'Backend engineer & team lead, 7+ years. Rust on the performance-critical paths of a 1,000+ conversions/day platform, Go on 5G Core infrastructure, Node.js across fintech and insurance. Currently building a VPN in Rust on camera.',
  stack: 'Rust · Go · Node.js',
  stackNote: '',
  currently: 'Freedom-TLS series · 4 episodes, ~24h of Rust VPN building on YouTube',
  channelName: 'Compiles Eventually',
  ctaEmail: 'cv.reboot220@aleeas.com',
  ctaSubject: 'Hiring: backend role',
  cvUrl: '/ivan-kramarenko-cv.pdf',
  githubUrl: 'https://github.com/Ivanko1608',
  githubOldUrl: 'https://github.com/ivankram',   // older projects only
  blogUrl: 'https://ivankram.github.io/',          // HashPigz security blog
  youtubeUrl: 'https://www.youtube.com/channel/UCXXd3jOjBp-SDsRDbMHwmJg',
};

// Proof strip under the hero, also used in the CV PDF
export const stats: Stat[] = [
  { value: '7+',     label: 'Years in production backends' },
  { value: '3h',     label: 'Deploy time, down from 2 days' },
  { value: '1,000+', label: 'Conversions/day on a platform I built' },
  { value: '9th',    label: 'Of 200+ teams at Standoff 15 CTF' },
];

// ── Selected work (case-study cards) ──────────────────────────────────────────

export interface CaseStudy {
  kicker: string;     // e.g. "Boomerang Partners · 2021 — now"
  title: string;
  problem: string;
  did: string[];      // what I did (use **bold** for emphasis)
  result: string;
  tags: Tag[];
  links?: { href: string; label: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    kicker: 'Boomerang Partners · Team Lead · 2021 — now',
    title: 'A CPA affiliate network backend, built from zero',
    problem: 'A licensed affiliate network needed its whole backend: tracking, offers, payouts, and a team to run it.',
    did: [
      'Designed and built the backend from scratch',
      'Put **Rust on the performance-critical paths**, moved the Express codebase to NestJS',
      'Built the CI/CD pipeline; ran hiring, 1-on-1s, code review and postmortems for a 3–5 person team',
    ],
    result: '1,000+ conversions/day. Deploys went from 2 days to 3 hours.',
    tags: [
      { label: 'Rust', variant: 'rust' },
      { label: 'NestJS', variant: 'node' },
      { label: 'PostgreSQL', variant: 'default' },
      { label: 'Kafka', variant: 'default' },
      { label: 'Redis', variant: 'default' },
      { label: 'AWS', variant: 'default' },
    ],
  },
  {
    kicker: 'YADRO · Senior Go Engineer · 2023 — 2024',
    title: 'Bridging legacy 4G management to a 5G Core',
    problem: 'A management console built for LTE/4G had to drive a new 5G Core, across a Go / C++ boundary.',
    did: [
      '**Sole author** of the Go microservice between the console and the 5G Core',
      'Worked both sides of the Go + C++ integration with the legacy LTE/4G software',
      'Introduced code generation from Protobuf and OpenAPI specs',
    ],
    result: 'Contracts generated from specs, so manual contract drift between services went away.',
    tags: [
      { label: 'Go', variant: 'go' },
      { label: 'C++', variant: 'default' },
      { label: 'Protobuf', variant: 'default' },
      { label: 'OpenAPI', variant: 'default' },
    ],
  },
  {
    kicker: 'Freedom-TLS · open source · 2026',
    title: 'A VPN in Rust, built on camera',
    problem: 'Build a VPN from scratch with no networking background, and keep the wrong turns in.',
    did: [
      'Started as a TLS-encrypted SOCKS5 tunnel on **tokio + rustls**',
      'Threw out six hours of protobuf for a custom **postcard** wire protocol',
      'Ended up moving raw IP packets over a **TUN device**',
    ],
    result: '~24 hours of unedited Rust over 4 episodes. Code on GitHub.',
    tags: [
      { label: 'Rust', variant: 'rust' },
      { label: 'tokio', variant: 'rust' },
      { label: 'rustls', variant: 'rust' },
      { label: 'Networking', variant: 'default' },
    ],
    links: [
      { href: 'https://www.youtube.com/playlist?list=PL5KHCLK_1CdeKeiIv00NKXlORxW6qD8NN', label: 'Watch the series' },
      { href: 'https://github.com/Ivanko1608/freedom-tls', label: 'Repo' },
    ],
  },
];

// ── Looking for (lets recruiters self-qualify) ────────────────────────────────

export const lookingFor = {
  heading: 'What I’m looking for',
  points: [
    'A product team running Rust in production, or adopting it',
    'Senior backend or tech-lead roles',
    'Remote, with CET/CEST overlap',
  ],
  languages: 'English C2 · Spanish C1 · Russian native',
};

// ── About ─────────────────────────────────────────────────────────────────────

export const about = {
  paragraphs: [
    "Backend engineer and team lead, **7+ years** in. I've built affiliate platforms doing 1k+ conversions/day, worked on 5G Core infrastructure at YADRO, and led small teams (3–5 people) across most of it. Most of what I've shipped is still running.",
    "Fintech, telecoms, insurance, affiliate marketing. Now looking for a *product team* that takes engineering seriously and ships things that matter.",
    "I also run a security research blog. Malware analysis, offensive security writeups, CTF stuff. Placed **9th at Standoff 15** (largest offensive security competition in Russia/Central Asia, 3 days, 200+ teams).",
  ],
  languages: [
    { name: 'English', level: 'C2 — Proficient', pct: 100 },
    { name: 'Spanish', level: 'C1 — Advanced', pct: 85 },
    { name: 'Russian', level: 'Native', pct: 100 },
  ] satisfies Language[],
  rustCard: {
    heading: '⚙ Why Rust, and why now',
    paragraphs: [
      "I like complex languages. Go is great but deliberately simple. C++ has the expressiveness I want but the tooling and safety story are rough. Rust gives me what C++ does, with memory safety, a real package manager, a compiler that actually helps, and a community I like being part of.",
      "I've shipped it on production hot paths and I'm building a VPN in it in public. Next I want a team where Rust is most of the job, not a slice of it.",
    ],
  },
};

// ── Experience ────────────────────────────────────────────────────────────────

export const experience: ExperienceItem[] = [
  {
    current: true,
    period: 'Nov 2021 — Present · 4 yr 5 mo',
    title: 'Team Lead — Backend',
    company: 'Boomerang Partners · Affiliate Network (Curaçao MGA licensed)',
    body: 'Built the entire backend for a CPA affiliate network from scratch. Set up engineering processes and managed a 3–5 person team (frontend + backend).',
    bullets: [
      'Reduced time-to-deploy from **2 days → 3 hours** by implementing full CI/CD pipeline',
      'Platform handles **1,000+ conversions/day** across active offers',
      'Led hiring, onboarding, 1-on-1s, code review standards and incident postmortems',
      'Migrated Express codebase to NestJS; introduced Rust for performance-critical paths',
    ],
    tags: [
      { label: 'Rust', variant: 'rust' },
      { label: 'Node.js', variant: 'node' },
      { label: 'NestJS', variant: 'node' },
      { label: 'PostgreSQL', variant: 'default' },
      { label: 'Redis', variant: 'default' },
      { label: 'Kafka', variant: 'default' },
      { label: 'Docker', variant: 'default' },
      { label: 'AWS', variant: 'default' },
      { label: 'CI/CD', variant: 'default' },
      { label: 'Team Lead', variant: 'default' },
    ],
  },
  {
    period: 'Jul 2023 — Sep 2024 · 1 yr 3 mo',
    title: 'Senior Golang Engineer',
    company: 'YADRO · 5G Core Infrastructure',
    body: 'Go and C++ work on 5G Core infrastructure. Wrote microservices, bridged legacy LTE/4G systems to the new 5G stack, and worked across language boundaries daily.',
    bullets: [
      'Sole author of the Go microservice bridging the management console to 5G Core (pass-through layer)',
      'Acted as cross-language intermediary (Go + C++) to integrate legacy LTE/4G management software with 5G Core systems',
      'Introduced automatic code generation from Protobuf and OpenAPI specs — eliminated manual contract drift',
    ],
    tags: [
      { label: 'Go', variant: 'go' },
      { label: 'Protobuf', variant: 'default' },
      { label: 'OpenAPI', variant: 'default' },
      { label: 'Ginkgo', variant: 'default' },
      { label: 'Microservices', variant: 'default' },
      { label: 'CI/CD', variant: 'default' },
      { label: 'C++', variant: 'default' },
    ],
  },
  {
    period: 'Dec 2022 — Aug 2023 · 9 mo',
    title: 'Lead Node.js Developer',
    company: 'VSK Insurance (A++ rated) · Fintech / Insurance',
    body: 'Backend services for the agent portal at one of Russia\'s largest insurers (33M+ insured). Led the backend side.',
    bullets: [
      'First on team to introduce unit tests — raised new service coverage to **88%**',
      'Introduced git hooks (Husky) — reduced bug rate by **10%**',
    ],
    tags: [
      { label: 'NestJS', variant: 'node' },
      { label: 'Node.js', variant: 'node' },
      { label: 'PostgreSQL', variant: 'default' },
      { label: 'CI/CD', variant: 'default' },
      { label: 'Unit Testing', variant: 'default' },
    ],
  },
  {
    period: 'Jan 2022 — Dec 2022 · 12 mo',
    title: 'Node.js Software Engineer',
    company: 'LANIT · EdTech Platform',
    body: 'Backend dev on an EdTech platform, international team. API design and code review.',
    bullets: [
      'Kicked off TypeScript migration of the existing JavaScript codebase',
      'Wrote tests across the platform — first structured testing effort on the team',
    ],
    tags: [
      { label: 'Node.js', variant: 'node' },
      { label: 'TypeScript', variant: 'typescript' },
      { label: 'REST', variant: 'default' },
      { label: 'International team', variant: 'default' },
    ],
  },
  {
    period: 'Dec 2018 — Nov 2021 · 3 yr',
    title: 'Freelance Fullstack Developer',
    company: 'Independent · Moscow',
    body: 'Freelance web and mobile development — hundreds of projects, multiple stacks.',
    bullets: [],
    tags: [
      { label: 'Node.js', variant: 'node' },
      { label: 'React', variant: 'default' },
      { label: 'PostgreSQL', variant: 'default' },
      { label: 'MySQL', variant: 'default' },
    ],
  },
];

// ── Skills ────────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    title: '🦀 Rust',
    featured: true,
    pills: [
      { label: 'Rust', variant: 'rust' },
      { label: 'Tokio', variant: 'rust' },
      { label: 'async/await', variant: 'rust' },
      { label: 'Actix-web', variant: 'rust' },
      { label: 'High-perf backend' },
    ],
  },
  {
    title: 'Backend',
    pills: [
      { label: 'Node.js', variant: 'node' },
      { label: 'Go', variant: 'go' },
      { label: 'TypeScript', variant: 'typescript' },
      { label: 'NestJS' },
      { label: 'Express.js' },
      { label: 'REST' },
      { label: 'Protobuf' },
      { label: 'gRPC' },
      { label: 'OpenAPI' },
    ],
  },
  {
    title: 'Infra & Cloud',
    pills: [
      { label: 'Docker' },
      { label: 'Linux' },
      { label: 'AWS' },
      { label: 'CI/CD' },
      { label: 'Apache Kafka' },
      { label: 'RabbitMQ' },
      { label: 'Redis' },
      { label: 'Nginx' },
    ],
  },
  {
    title: 'Data',
    pills: [
      { label: 'PostgreSQL' },
      { label: 'MySQL' },
      { label: 'Prisma' },
    ],
  },
  {
    title: 'Leadership',
    pills: [
      { label: 'Team Lead (3–5 people)' },
      { label: 'Code review' },
      { label: 'Hiring' },
      { label: 'Onboarding' },
      { label: '1-on-1s' },
      { label: 'Incident mgmt' },
      { label: 'Postmortems' },
      { label: 'Jira' },
    ],
  },
  {
    title: 'Security & Tooling',
    pills: [
      { label: 'Malware analysis' },
      { label: 'Reverse engineering' },
      { label: 'Offensive security' },
      { label: 'C++' },
    ],
  },
];

// ── Security / Blog ───────────────────────────────────────────────────────────

export const security = {
  blogUrl: 'https://ivankram.github.io/',
  ctfBadge: '🏆 Standoff 15 CTF — 9th place · 200+ teams · 3-day live event',
  posts: [
    {
      url: 'https://ivankram.github.io/posts/2024-10-11-discord-phantom-miner',
      tag: 'Malware · Reverse Engineering',
      title: 'Unmasking Discord Phantom Miner — Analyzing a Discord Ban Bypass Malware',
      date: 'Oct 11, 2024',
    },
    {
      url: 'https://ivankram.github.io/posts/2024-10-01-monteverde-htb-writeup',
      tag: 'Offensive',
      title: 'HTB Monteverde — Azure AD Connect Exploit & DCSync',
      date: 'Oct 1, 2024',
    },
    {
      url: 'https://ivankram.github.io/posts/2024-09-24-sauna-htb-writeup',
      tag: 'Offensive',
      title: 'HTB Sauna — Kerberos No-Preauth, winPEAS & Mimikatz LSASS dump',
      date: 'Sep 24, 2024',
    },
    {
      url: 'https://ivankram.github.io/posts/2024-09-20-streamio-htb-writeup',
      tag: 'Offensive',
      title: 'HTB Streamio — SQL injection, PHP RFI & Bloodhound pivoting',
      date: 'Sep 20, 2024',
    },
  ] satisfies BlogPost[],
};

// ── Series (long-form video content) ──────────────────────────────────────────

export const series: Series = {
  title: 'Freedom-TLS — building a VPN in Rust (sort of)',
  blurb: "Set out to build a VPN from scratch in Rust with no networking background. It started as a TLS-encrypted SOCKS5 tunnel, threw away six hours of protobuf, got a custom postcard wire protocol, and ended up moving raw IP packets over a TUN device. The messy version, wrong turns kept in.",
  totalRuntime: '~24h so far',
  status: 'ongoing',
  playlistUrl: 'https://www.youtube.com/playlist?list=PL5KHCLK_1CdeKeiIv00NKXlORxW6qD8NN',
  repoUrl: 'https://github.com/Ivanko1608/freedom-tls',
  channelUrl: 'https://www.youtube.com/channel/UCXXd3jOjBp-SDsRDbMHwmJg',
  episodes: [
    {
      number: 1,
      title: 'Building a VPN in Rust (ended up with a tunnel)',
      runtime: '4:47:45',
      url: 'https://youtu.be/OoD57Bts04U',
      status: 'live',
      date: 'May 2026',
    },
    {
      number: 2,
      title: 'Six hours of protobuf I had to throw away (EP2 part 1)',
      runtime: '6:21:50',
      url: 'https://youtu.be/nlYJtFqZlNo',
      status: 'live',
      date: 'May 2026',
    },
    {
      number: 3,
      title: 'From deleting everything to a working VPN (EP2 part 2)',
      runtime: '7:37:08',
      url: 'https://youtu.be/gjz9d9XygLc',
      status: 'live',
      date: 'Jun 2026',
    },
    {
      number: 4,
      title: 'I built a real VPN in Rust and it only cost me my sanity',
      runtime: '5:16:31',
      url: 'https://youtu.be/xjiw2QxcJkI',
      status: 'live',
      date: 'Jul 2026',
    },
  ],
  roadmap: [
    'UDP support',
    'DNS leak prevention',
    'Real error handling',
    'Config file instead of hardcoded values',
  ],
};

// ── Contact ───────────────────────────────────────────────────────────────────

export const contact = {
  heading: "Let's work together",
  subtext: 'Email is fastest. I reply within a day or two.',
  euNote: '🌍 EU availability: C2 English · C1 Spanish · Open to CET/CEST timezones',
  links: [
    { href: 'mailto:cv.reboot220@aleeas.com', icon: 'email', label: 'cv.reboot220@aleeas.com' },
    { href: 'https://github.com/Ivanko1608', icon: 'github', label: 'github.com/Ivanko1608' },
    { href: 'https://github.com/ivankram', icon: 'github', label: 'github.com/ivankram (older projects)' },
    { href: 'https://ivankram.github.io/', icon: 'globe', label: 'HashPigz security blog' },
    { href: 'https://www.youtube.com/channel/UCXXd3jOjBp-SDsRDbMHwmJg', icon: 'youtube', label: 'YouTube' },
  ] satisfies ContactLink[],
};

// ── Footer ────────────────────────────────────────────────────────────────────

export const footer = {
  copyright: '© 2026 Ivan Kramarenko',
  tagline: '// built with Astro, React and a lot of TypeScript',
  location: 'Mallorca · Remote',
};
