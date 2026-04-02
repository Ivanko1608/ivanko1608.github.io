import { hero, about, experience, skillCategories, contact } from '../data';

// ── Types ─────────────────────────────────────────────────────────────────────

export type LineType = 'default' | 'success' | 'error' | 'muted' | 'rust' | 'dim';

export interface OutputLine {
  id: number;
  text: string;
  type?: LineType;
  action?: string;
}

export interface CmdCallbacks {
  onExit: () => void;
  onSl: () => void;
  onClear: () => void;
}

// ── IDs ───────────────────────────────────────────────────────────────────────

let _id = 0;
export const resetId = () => { _id = 0; };
export const mkLine = (text: string, type?: LineType): OutputLine => ({ id: _id++, text, type });
export const blank = (): OutputLine => mkLine('');
export const hr = (label = ''): OutputLine =>
  mkLine(label ? `── ${label} ${'─'.repeat(Math.max(0, 50 - label.length))}` : '─'.repeat(54), 'muted');

// ── Autocomplete ──────────────────────────────────────────────────────────────

export const COMPLETABLE = ['help', 'whoami', 'experience', 'skills', 'contact', 'ls', 'cat', 'clear', 'exit', 'neofetch', 'git', 'sl', 'sudo'];
export const FILES       = ['about.txt', 'experience.toml', 'skills.rs', 'contact.md', 'readme.md'];

export function getSuggestions(input: string): string[] {
  const trimmed = input.trimStart();
  if (!trimmed) return [];
  const hasTrail = input.endsWith(' ');
  const parts    = trimmed.split(/\s+/);
  const cmd      = parts[0].toLowerCase();

  if (parts.length === 1 && !hasTrail)
    return COMPLETABLE.filter(c => c.startsWith(cmd) && c !== cmd);

  const partial = (parts[1] ?? '').toLowerCase();
  if (cmd === 'cat') return FILES.filter(f => f.startsWith(partial));
  if (cmd === 'git') return ['blame'].filter(f => f.startsWith(partial));
  return [];
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const BOOT_LINES: { text: string; delay: number }[] = [
  { text: '[    0.000000] Linux version 6.9.1-arch1-1 (gcc (GCC) 14.2.0)', delay: 20 },
  { text: '[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-linux root=UUID=8f3da... rw quiet', delay: 20 },
  { text: '[    0.127983] ACPI: IRQ0 used by override.', delay: 35 },
  { text: '[    0.203847] PCI: Using configuration type 1 for base access', delay: 30 },
  { text: '[    0.312871] Loading rustc 1.87.0...', delay: 60 },
  { text: '[    0.403933] Initializing cgroup subsys memory', delay: 35 },
  { text: '[    0.519233] Mounting /proc filesystem', delay: 35 },
  { text: '[    0.621019] systemd[1]: Starting Portfolio Services...', delay: 80 },
  { text: '[    0.834291] [  OK  ] Started Journal Service', delay: 55 },
  { text: '[    1.002847] [  OK  ] Reached target Local File Systems', delay: 55 },
  { text: '[    1.203847] [  OK  ] Loaded experience.toml', delay: 70 },
  { text: '[    1.341092] [  OK  ] Loaded skills.rs', delay: 70 },
  { text: '[    1.502841] [  OK  ] Mounted /dev/contacts', delay: 70 },
  { text: '[    1.623910] [  OK  ] Started Rust Module Supervisor', delay: 70 },
  { text: '[    1.689003] 🦀  All Rust modules initialized successfully', delay: 120 },
  { text: '', delay: 80 },
  { text: 'Ivan Kramarenko OS  (Arch Linux btw)', delay: 80 },
  { text: 'Kernel 6.9.1-arch1-1 on an x86_64', delay: 60 },
  { text: '', delay: 220 },
  { text: 'ivan login: ivan', delay: 100 },
  { text: 'Password: ████████', delay: 550 },
  { text: '', delay: 100 },
  { text: 'Last login: Mon Mar 31 23:52:10 2026', delay: 100 },
  { text: '', delay: 60 },
  { text: "Welcome to Ivan's Portfolio OS  /  type 'help' for commands", delay: 100 },
  { text: '', delay: 50 },
];

export const GRUB_COUNTDOWN_START = 5;
export const BOX_W = 62;

export const GRUB_ENTRIES = [
  '* Ivan Kramarenko OS (Arch Linux btw)',
  '  Advanced options for Ivan Kramarenko OS',
  '  Memory test (memtest86+)',
];

export const FERRIS_LINES = [
  '    _~^~^~_      ',
  '   \\) /  o o\\  ',
  "     '_ ¬ _'    ",
  "     / '---'\\   ",
  '                 ',
  '                 ',
];

export const SL_ART = [
  '      ====        ________                ___________',
  '  _D _|  |_______/        \\__I_I_____===__|_________|',
  '   |(_)---  |   H\\________/ |   |        =|___ ___|',
  '   /     |  |   H  |  |     |   |         ||_| |_||',
  '  |      |  |   H  |__--------------------| [___] |',
  '  | ________|___H__/__|_____/[][]~\\_______|       |',
  '  |/ |   |-----------I_____I [][] []  D   |=======|',
  '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|',
  ' |/-=|___|=    ||    ||    ||    |_____/~\\     |',
  '  \\_/      \\O=====O=====O=====O_/      \\_/',
].join('\n');

// ── Command outputs ───────────────────────────────────────────────────────────

export function cmdWhoami(): OutputLine[] {
  return [
    mkLine(hero.name, 'rust'),
    mkLine('Backend Engineer & Rust Enthusiast'),
    mkLine('Mallorca · Remote', 'muted'),
    blank(),
    mkLine(about.paragraphs[0].replace(/\*\*/g, '').replace(/\*/g, '')),
    blank(),
    mkLine('Languages:', 'muted'),
    ...about.languages.map(l => mkLine(`  ${l.name}  ${l.level}`, 'muted')),
  ];
}

export function cmdExperience(): OutputLine[] {
  return [
    hr('Work History'),
    blank(),
    ...experience.flatMap((e, i) => [
      mkLine(`[${e.period}]`, 'muted'),
      mkLine(`  ${e.title}  ·  ${e.company}`, 'rust'),
      ...e.bullets.map(b => mkLine(`  • ${b.replace(/\*\*/g, '')}`)),
      ...(i < experience.length - 1 ? [blank()] : []),
    ]),
  ];
}

export function cmdSkills(): OutputLine[] {
  return [
    hr('Skills'),
    blank(),
    ...skillCategories.flatMap(cat => [
      mkLine(`  ${cat.title}`, cat.featured ? 'rust' : 'default'),
      mkLine(`  ${cat.pills.map(p => p.label).join('  ·  ')}`, 'muted'),
      blank(),
    ]),
  ];
}

export function cmdContact(): OutputLine[] {
  return [
    hr('Contact'),
    blank(),
    ...contact.links.map(l => mkLine(`  ${l.label}`)),
    blank(),
    mkLine(`  ${contact.euNote}`, 'muted'),
  ];
}

export function cmdNeofetch(): OutputLine[] {
  const info = [
    'ivan@portfolio',
    '─'.repeat(22),
    'OS: Arch Linux btw',
    'Kernel: 6.9.1-arch1-1',
    'Uptime: 7 years, 3 months (career)',
    'Shell: zsh 5.9',
    'Resolution: depends on your monitor',
    'CPU: Human Brain @ ∞ GHz',
    'Memory: coffee-dependent',
    'Languages: Rust 🦀 > Go > Node.js',
  ];
  const len = Math.max(FERRIS_LINES.length, info.length);
  return Array.from({ length: len }, (_, i) => {
    const f = (FERRIS_LINES[i] ?? '').padEnd(20);
    const v = info[i] ?? '';
    return mkLine(`${f}  ${v}`, i === 0 ? 'rust' : i === 1 ? 'muted' : 'default');
  });
}

export function cmdGitBlame(): OutputLine[] {
  return [
    mkLine('3d4f8a1 (Ivan Kramarenko  2026-04-01 03:47:22 +0200   1) fix: fought the borrow checker for 3 days. we came to an agreement', 'muted'),
    mkLine('a2bc901 (Ivan Kramarenko  2025-12-25 00:00:01 +0200   2) chore: updated all dependencies. prod on fire, probably unrelated', 'muted'),
    mkLine('f9e1234 (Ivan Kramarenko  2025-11-15 23:59:59 +0200   3) perf: made it async. now it\'s slow in a different thread', 'muted'),
    mkLine('7b3d567 (Ivan Kramarenko  2025-08-10 14:23:11 +0200   4) feat: added logging. found 14 new bugs, fixed none', 'muted'),
    mkLine('c8a1928 (Ivan Kramarenko  2025-04-20 16:42:00 +0200   5) docs: wrote README. already outdated.', 'muted'),
  ];
}

function cmdLine(text: string, cmd: string, type?: LineType): OutputLine {
  return { id: _id++, text, type, action: cmd };
}

export function cmdHelp(): OutputLine[] {
  return [
    mkLine('Available commands:', 'muted'),
    blank(),
    cmdLine('  whoami        about me',        'whoami'),
    cmdLine('  experience    work history',     'experience'),
    cmdLine('  skills        tech stack',       'skills'),
    cmdLine('  contact       get in touch',     'contact'),
    cmdLine('  ls            list files',       'ls'),
    mkLine( '  cat <file>    read a file'),
    cmdLine('  clear         clear terminal',   'clear'),
    cmdLine('  exit          back to landing',  'exit'),
    blank(),
    cmdLine('  neofetch      system information', 'neofetch', 'dim'),
    cmdLine('  git blame     who did this?',      'git blame', 'dim'),
    cmdLine('  sl            steam locomotive',    'sl', 'dim'),
    cmdLine('  sudo rm -rf / trust the process',   'sudo rm -rf /', 'dim'),
  ];
}

// ── Command processor ─────────────────────────────────────────────────────────

export function processCommand(raw: string, cb: CmdCallbacks): OutputLine[] {
  const parts = raw.trim().split(/\s+/);
  const cmd   = parts[0].toLowerCase();
  const args  = parts.slice(1);

  switch (cmd) {
    case 'help':       return cmdHelp();
    case 'whoami':     return cmdWhoami();
    case 'experience': return cmdExperience();
    case 'skills':     return cmdSkills();
    case 'contact':    return cmdContact();
    case 'neofetch':   return cmdNeofetch();
    case 'ls':
      return [mkLine('about.txt     experience.toml     skills.rs     contact.md     readme.md', 'muted')];
    case 'cat': {
      const f = args[0];
      if (!f) return [mkLine('cat: missing file operand', 'error')];
      switch (f) {
        case 'about.txt':       return cmdWhoami();
        case 'experience.toml': return cmdExperience();
        case 'skills.rs':       return cmdSkills();
        case 'contact.md':      return cmdContact();
        case 'readme.md':
          return [
            mkLine("# Ivan Kramarenko's Portfolio Terminal"),
            blank(),
            mkLine("The developer-facing version of Ivan's portfolio."),
            mkLine("Type 'help' for available commands."),
          ];
        default: return [mkLine(`cat: ${f}: No such file or directory`, 'error')];
      }
    }
    case 'git':
      if (args[0] === 'blame') return cmdGitBlame();
      return [mkLine(`git: '${args[0] ?? ''}' is not a git command. See 'git --help'.`, 'error')];
    case 'sl':
      cb.onSl();
      return [mkLine('🚂 Choo choo!', 'rust')];
    case 'sudo':
      if (args.join(' ').replace(/\s+/g, ' ') === 'rm -rf /') {
        return [
          mkLine('Nice try.', 'error'),
          mkLine('[sudo] password for ivan: '),
          mkLine('ivan is not in the sudoers file. This incident will be reported.', 'error'),
        ];
      }
      return [mkLine(`sudo: ${args[0] ?? 'command'} not found`, 'error')];
    case 'clear': cb.onClear(); return [];
    case 'exit':  cb.onExit();  return [];
    case '':      return [];
    default:      return [mkLine(`bash: ${cmd}: command not found`, 'error')];
  }
}
