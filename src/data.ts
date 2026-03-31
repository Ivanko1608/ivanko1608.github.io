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

export interface Tag {
  label: string;
  variant: 'default' | 'rust' | 'go' | 'node';
}

export interface SkillCategory {
  title: string;
  featured?: boolean;        // renders with rust accent styling
  pills: Pill[];
}

export interface Pill {
  label: string;
  highlight?: boolean;       // renders with rust accent styling
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
  subtitle: 'Backend Engineer & Team Lead building high-throughput distributed systems.',
  stack: 'Node.js · Go · Rust',
  stackNote: '— transitioning deeper into systems programming with Rust.',
  ctaEmail: 'cv.reboot220@aleeas.com',
  githubUrl: 'https://github.com/ivankram',
  blogUrl: 'https://ivankram.github.io/',
};

export const stats: Stat[] = [
  { value: '7+', label: 'Years experience' },
  { value: '5+', label: 'Production systems built' },
  { value: '1k+', label: 'Daily conversions handled' },
  { value: '3', label: 'Languages spoken' },
];

// ── About ─────────────────────────────────────────────────────────────────────

export const about = {
  paragraphs: [
    "I'm a backend engineer and team lead with **7+ years** designing systems from scratch — from high-throughput affiliate platforms to 5G Core infrastructure. I've led teams of 3–5, built CI/CD pipelines, and shipped products that stay stable under real production load.",
    "I've worked across fintech, telecoms, insurance and affiliate marketing — and I'm now focused on bringing that breadth to *European product teams* that care about engineering rigour.",
    "Outside work I run a security research blog where I publish malware analysis and offensive security writeups — **Standoff 15 finalist, 9th place**.",
  ],
  languages: [
    { name: 'English', level: 'C2 — Proficient', pct: 100 },
    { name: 'Spanish', level: 'C1 — Advanced', pct: 85 },
    { name: 'Russian', level: 'Native', pct: 100 },
  ] satisfies Language[],
  rustCard: {
    heading: '⚙ Why Rust, and why now',
    paragraphs: [
      "I've spent years building performant Node.js and Go services, pushing them as far as they'll go. Rust's memory model, zero-cost abstractions and fearless concurrency are the next logical step for the class of systems I want to build — low-latency message brokers, network proxies, embedded data pipelines.",
      "I want to join a team where Rust is already in production or actively being adopted, so I can contribute immediately while growing deep expertise.",
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
    body: 'Designed and built a high-throughput CPA affiliate network from zero — architecting the backend, establishing engineering processes, and managing a 3–5 person frontend + backend team.',
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
    body: 'Built high-performance microservices for 5G Core infrastructure targeting broadband access in remote regions. Worked in C++/Go cross-team with strict latency requirements.',
    bullets: [
      'Introduced Protobuf interface generation from OpenAPI — eliminated manual contract drift between Go and C++ services',
      'Responsible for cross-team communication between Go and C++ codebases via Protobuf',
      'Contributed to components improving network throughput and fault tolerance',
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
    body: 'Developed and led backend services for the agent self-service portal at one of Russia\'s largest insurers (33M+ insured citizens).',
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
    body: 'Backend development in an international team building an EdTech platform. Code review, cross-team communication and API design.',
    bullets: [],
    tags: [
      { label: 'Node.js', variant: 'node' },
      { label: 'TypeScript', variant: 'default' },
      { label: 'REST', variant: 'default' },
      { label: 'International team', variant: 'default' },
    ],
  },
  {
    period: 'Dec 2018 — Nov 2021 · 3 yr',
    title: 'Freelance Fullstack Developer',
    company: 'Independent · Moscow',
    body: 'Built and shipped web applications and mobile backends independently. Consulting on architecture and development processes.',
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
      { label: 'Rust', highlight: true },
      { label: 'Tokio', highlight: true },
      { label: 'async/await', highlight: true },
      { label: 'Systems programming', highlight: true },
      { label: 'Memory safety' },
      { label: 'Actix-web' },
      { label: 'High-perf backend' },
    ],
  },
  {
    title: 'Backend',
    pills: [
      { label: 'Node.js' },
      { label: 'NestJS' },
      { label: 'Express.js' },
      { label: 'Go' },
      { label: 'TypeScript' },
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
      { label: 'Redis' },
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
      { label: 'Git' },
      { label: 'C++' },
      { label: 'Ginkgo' },
      { label: 'Husky' },
    ],
  },
];

// ── Security / Blog ───────────────────────────────────────────────────────────

export const security = {
  blogUrl: 'https://ivankram.github.io/',
  ctfBadge: '🏆 Standoff 15 CTF — finalist · 2025',
  posts: [
    {
      url: 'https://ivankram.github.io/posts/2024-10-11-discord-phantom-miner',
      tag: 'Malware · Reverse Engineering',
      title: 'Unmasking Discord Phantom Miner — Analyzing a Discord Ban Bypass Malware',
      date: 'Oct 11, 2024',
    },
    {
      url: 'https://ivankram.github.io/posts/2024-10-01-monteverde-htb-writeup',
      tag: 'Offensive · HTB',
      title: 'HTB Monteverde — Azure AD Connect Exploit & DCSync',
      date: 'Oct 1, 2024',
    },
    {
      url: 'https://ivankram.github.io/posts/2024-09-24-sauna-htb-writeup',
      tag: 'Offensive · HTB',
      title: 'HTB Sauna — Kerberos No-Preauth, winPEAS & Mimikatz LSASS dump',
      date: 'Sep 24, 2024',
    },
    {
      url: 'https://ivankram.github.io/posts/2024-09-20-streamio-htb-writeup',
      tag: 'Offensive · HTB',
      title: 'HTB Streamio — SQL injection, PHP RFI & Bloodhound pivoting',
      date: 'Sep 20, 2024',
    },
  ] satisfies BlogPost[],
};

// ── Contact ───────────────────────────────────────────────────────────────────

export const contact = {
  heading: "Let's work together",
  subtext: 'Open to remote roles with EU-based teams. Particularly interested in Rust.',
  euNote: '🌍 EU availability: C2 English · C1 Spanish · Open to CET/CEST timezones · No relocation required',
  links: [
    { href: 'mailto:cv.reboot220@aleeas.com', icon: 'email', label: 'cv.reboot220@aleeas.com' },
    { href: 'https://github.com/ivankram', icon: 'github', label: 'github.com/ivankram' },
    { href: 'https://ivankram.github.io/', icon: 'globe', label: 'hashpigz blog' },
  ] satisfies ContactLink[],
};

// ── Footer ────────────────────────────────────────────────────────────────────

export const footer = {
  copyright: '© 2025 Ivan Kramarenko',
  tagline: '// built with Claude and some guidance by me, I\'m not good at frontend',
  location: 'Mallorca · Remote',
};
