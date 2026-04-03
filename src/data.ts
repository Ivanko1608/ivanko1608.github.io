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
  icon: 'email' | 'github' | 'globe' | 'phone';
  label: string;
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export const hero = {
  name: 'Ivan Kramarenko',
  tagline: 'Available for EU remote roles',
  subtitle: 'Backend Engineer & Team Lead. High-throughput systems, low-level curiosity.',
  stack: 'Node.js · Go · Rust',
  stackNote: '— moving deeper into systems programming with Rust.',
  ctaEmail: 'cv.reboot220@aleeas.com',
  githubUrl: 'https://github.com/ivankram',
  blogUrl: 'https://ivankram.github.io/',
};

export const stats: Stat[] = [
  { value: '7+', label: 'Years experience' },
  { value: 'Top 10', label: 'Standoff 15 CTF' },
  { value: '16×', label: 'Faster deploys shipped' },
  { value: '3', label: 'Languages spoken' },
];

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
      "Looking for a team that already uses Rust in production or is adopting it. I want to write it professionally, not just on weekends.",
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
    period: 'Jan 2022 — Oct 2022 · 10 mo',
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
    body: 'Freelance web and mobile backend development — hundreds of projects across multiple languages and stacks.',
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
    title: '🦀 Rust (actively developing)',
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

// ── Contact ───────────────────────────────────────────────────────────────────

export const contact = {
  heading: "Let's work together",
  subtext: 'Open to remote roles. Especially interested in Rust.',
  euNote: '🌍 EU availability: C2 English · C1 Spanish · Open to CET/CEST timezones',
  links: [
    { href: 'mailto:cv.reboot220@aleeas.com', icon: 'email', label: 'cv.reboot220@aleeas.com' },
    { href: 'https://github.com/ivankram', icon: 'github', label: 'github.com/ivankram' },
    { href: 'https://ivankram.github.io/', icon: 'globe', label: 'HashPigz security blog' },
  ] satisfies ContactLink[],
};

// ── Footer ────────────────────────────────────────────────────────────────────

export const footer = {
  copyright: '© 2025 Ivan Kramarenko',
  tagline: '// designed & built with React, Tailwind, and a lot of TypeScript',
  location: 'Mallorca · Remote',
};
