import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { hero, about, experience, skillCategories, contact } from '../data';

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase = 'grub' | 'boot' | 'shell';
type LineType = 'default' | 'success' | 'error' | 'muted' | 'rust' | 'dim';

interface OutputLine {
  id: number;
  text: string;
  type?: LineType;
  action?: string;  // if set, clicking this line runs the command
}

interface TerminalProps {
  onBack: () => void;
}

// ── IDs ───────────────────────────────────────────────────────────────────────

let _id = 0;
const mkLine = (text: string, type?: LineType): OutputLine => ({ id: _id++, text, type });
const blank = (): OutputLine => mkLine('');
const hr = (label = ''): OutputLine =>
  mkLine(label ? `── ${label} ${'─'.repeat(Math.max(0, 50 - label.length))}` : '─'.repeat(54), 'muted');

// ── Autocomplete ──────────────────────────────────────────────────────────────

const COMPLETABLE = ['help', 'whoami', 'experience', 'skills', 'contact', 'ls', 'cat', 'clear', 'exit', 'neofetch', 'git', 'sl', 'sudo'];
const FILES       = ['about.txt', 'experience.toml', 'skills.rs', 'contact.md', 'readme.md'];

function getSuggestions(input: string): string[] {
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

// ── Boot sequence ─────────────────────────────────────────────────────────────

const BOOT_LINES: { text: string; delay: number }[] = [
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

// ── GRUB ──────────────────────────────────────────────────────────────────────

const GRUB_COUNTDOWN_START = 5;
const BOX_W = 62; // interior width (between │ characters)

const GRUB_ENTRIES = [
  '* Ivan Kramarenko OS (Arch Linux btw)',
  '  Advanced options for Ivan Kramarenko OS',
  '  Memory test (memtest86+)',
];

// ── Easter eggs ───────────────────────────────────────────────────────────────

const FERRIS_LINES = [
  '    _~^~^~_      ',
  '   \\) /  o o\\  ',
  "     '_ ¬ _'    ",
  "     / '---'\\   ",
  '                 ',
  '                 ',
];

const SL_ART = [
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

function cmdWhoami(): OutputLine[] {
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

function cmdExperience(): OutputLine[] {
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

function cmdSkills(): OutputLine[] {
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

function cmdContact(): OutputLine[] {
  return [
    hr('Contact'),
    blank(),
    ...contact.links.map(l => mkLine(`  ${l.label}`)),
    blank(),
    mkLine(`  ${contact.euNote}`, 'muted'),
  ];
}

function cmdNeofetch(): OutputLine[] {
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

function cmdGitBlame(): OutputLine[] {
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

function cmdHelp(): OutputLine[] {
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

interface CmdCallbacks { onExit: () => void; onSl: () => void; onClear: () => void; }

function processCommand(raw: string, cb: CmdCallbacks): OutputLine[] {
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

// ── Component ─────────────────────────────────────────────────────────────────

export function Terminal({ onBack }: TerminalProps) {
  const [phase,      setPhase]      = useState<Phase>('grub');
  const [countdown,  setCountdown]  = useState(GRUB_COUNTDOWN_START);
  const [bootLines,  setBootLines]  = useState<string[]>([]);
  const [history,    setHistory]    = useState<OutputLine[]>([]);
  const [input,      setInput]      = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [showSl,     setShowSl]     = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => getSuggestions(input), [input]);

  // ── GRUB ────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'grub') return;
    if (countdown <= 0) { setPhase('boot'); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== 'grub') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') { e.preventDefault(); setPhase('boot'); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase]);

  // ── Boot ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'boot') return;
    let cancelled = false;
    let i = 0;
    const next = () => {
      if (cancelled || i >= BOOT_LINES.length) {
        if (!cancelled) setPhase('shell');
        return;
      }
      const { text, delay } = BOOT_LINES[i++];
      setBootLines(prev => [...prev, text]);
      setTimeout(next, delay);
    };
    next();
    return () => { cancelled = true; };
  }, [phase]);

  // ── Auto-scroll ──────────────────────────────────────────────────────────────

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bootLines, history, phase]);

  useEffect(() => {
    if (phase === 'shell') inputRef.current?.focus();
  }, [phase]);

  // ── SL ───────────────────────────────────────────────────────────────────────

  const handleSl = useCallback(() => {
    setShowSl(true);
    setTimeout(() => setShowSl(false), 6500);
  }, []);

  // ── Commands ─────────────────────────────────────────────────────────────────

  const execCommand = useCallback((raw: string) => {
    const prompt = mkLine(`ivan@portfolio:~$ ${raw}`, 'dim');
    const cbs: CmdCallbacks = {
      onExit:  onBack,
      onSl:    handleSl,
      onClear: () => setHistory([]),
    };
    const output = processCommand(raw, cbs);
    if (raw.trim()) setCmdHistory(prev => [raw, ...prev]);
    setHistoryIdx(-1);
    setInput('');
    setHistory(prev => [...prev, prompt, ...output]);
  }, [onBack, handleSl]);

  // ── Autocomplete ─────────────────────────────────────────────────────────────

  const applyCompletion = useCallback((suggestion: string, execute = false) => {
    const hasTrail = input.endsWith(' ');
    const parts    = input.trimStart().split(/\s+/);
    let completed: string;
    if (parts.length <= 1 && !hasTrail) {
      completed = suggestion;
    } else {
      parts[parts.length - 1] = suggestion;
      completed = parts.join(' ');
    }

    if (execute) {
      execCommand(completed);
    } else {
      setInput(completed + ' ');
    }
    inputRef.current?.focus();
  }, [input, execCommand]);

  const handleSubmit = useCallback(() => {
    execCommand(input);
  }, [input, execCommand]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length === 1) applyCompletion(suggestions[0]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistoryIdx(prev => {
        const next = Math.min(prev + 1, cmdHistory.length - 1);
        setInput(cmdHistory[next] ?? '');
        return next;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistoryIdx(prev => {
        const next = Math.max(prev - 1, -1);
        setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
        return next;
      });
    }
  }, [handleSubmit, applyCompletion, suggestions, cmdHistory]);

  // ── Helpers ───────────────────────────────────────────────────────────────────

  const lineColor = (type?: LineType): string => {
    switch (type) {
      case 'rust':    return 'var(--rust)';
      case 'success': return '#4ade80';
      case 'error':   return '#f87171';
      case 'muted':   return 'var(--muted)';
      case 'dim':     return '#4b5563';
      default:        return 'var(--text)';
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div style={styles.root} onClick={() => inputRef.current?.focus()}>

      {/* ── SL overlay ───────────────────────────────────────────────────── */}
      {showSl && (
        <pre style={styles.slPre}>{SL_ART}</pre>
      )}

      {/* ── GRUB ─────────────────────────────────────────────────────────── */}
      {phase === 'grub' && (
        <div style={styles.grubScreen}>
          <div style={styles.mono}>GNU GRUB  version 2.12</div>
          <div style={styles.mono}>&nbsp;</div>

          {/* top border */}
          <div style={styles.mono}>{' ┌' + '─'.repeat(BOX_W) + '┐'}</div>

          {/* selected entry — same │·space prefix as others */}
          <div style={styles.mono}>
            {' │ '}
            <span style={styles.grubSelected}>{GRUB_ENTRIES[0].padEnd(BOX_W - 2)}</span>
            {' │'}
          </div>

          {/* non-selected entries — identical prefix structure */}
          {GRUB_ENTRIES.slice(1).map((entry, i) => (
            <div key={i} style={styles.mono}>
              {' │ ' + entry.padEnd(BOX_W - 2) + ' │'}
            </div>
          ))}

          {/* bottom border */}
          <div style={styles.mono}>{' └' + '─'.repeat(BOX_W) + '┘'}</div>

          <div style={styles.mono}>&nbsp;</div>
          <div style={styles.grubHint}>Use the ↑ and ↓ keys to change the selection.</div>
          <div style={styles.grubHint}>Press enter to boot the selected OS, 'e' to edit the commands</div>
          <div style={styles.grubHint}>before booting or 'c' for a command-line.</div>
          <div style={styles.mono}>&nbsp;</div>
          <div style={styles.grubHint}>
            The highlighted entry will be executed automatically in{' '}
            <span style={{ color: '#fff' }}>{countdown}s</span>
          </div>
        </div>
      )}

      {/* ── Boot ─────────────────────────────────────────────────────────── */}
      {phase === 'boot' && (
        <div style={styles.bootScreen}>
          {bootLines.map((text, i) => (
            <div key={i} style={styles.bootLine}>{text || '\u00a0'}</div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

      {/* ── Shell ────────────────────────────────────────────────────────── */}
      {phase === 'shell' && (
        <div style={styles.shell}>
          <button style={styles.backBtn} onClick={onBack}>← back to landing</button>

          {history.map(l => (
            <div
              key={l.id}
              onClick={l.action ? () => execCommand(l.action!) : undefined}
              style={{
                ...styles.shellLine,
                color:      lineColor(l.type),
                opacity:    l.type === 'dim' ? 0.55 : 1,
                fontWeight: l.type === 'rust' ? 600 : 400,
                ...(l.action ? styles.clickableLine : undefined),
              }}
            >
              {l.text || '\u00a0'}
            </div>
          ))}

          {/* Suggestion pills (visible on all devices, essential on mobile) */}
          {suggestions.length > 0 && (
            <div style={styles.pillRow}>
              {suggestions.map(s => (
                <button key={s} style={styles.pill} onClick={() => applyCompletion(s, true)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input line */}
          <div style={styles.inputRow}>
            <span style={styles.prompt}>ivan@portfolio:~$&nbsp;</span>
            <span style={styles.inputMirror}>{input}</span>
            <span style={styles.caret}>▋</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); setHistoryIdx(-1); }}
              onKeyDown={handleKeyDown}
              style={styles.hiddenInput}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize:   '13px',
  lineHeight: 1.55,
};

const styles = {
  root: {
    minHeight:  '100dvh',
    background: '#000',
    color:      '#ccc',
    overflowX:  'hidden',
    cursor:     'text',
    ...MONO,
  } as React.CSSProperties,

  // ── GRUB ──────────────────────────────────────────────────────────────────
  grubScreen: {
    padding: '3rem 2rem',
    ...MONO,
  } as React.CSSProperties,

  mono: {
    ...MONO,
    color:     '#ccc',
    whiteSpace: 'pre',
  } as React.CSSProperties,

  grubHint: {
    ...MONO,
    color: '#aaa',
  } as React.CSSProperties,

  grubSelected: {
    background: '#c6c6c6',
    color:      '#000',
    whiteSpace: 'pre',
  } as React.CSSProperties,

  // ── Boot ──────────────────────────────────────────────────────────────────
  bootScreen: {
    padding: '1rem 1.5rem',
    ...MONO,
    color: '#aaa',
  } as React.CSSProperties,

  bootLine: {
    ...MONO,
    whiteSpace: 'pre-wrap',
    lineHeight: 1.4,
  } as React.CSSProperties,

  // ── Shell ─────────────────────────────────────────────────────────────────
  shell: {
    padding:       '1.5rem',
    display:       'flex',
    flexDirection: 'column',
    minHeight:     '100dvh',
    ...MONO,
  } as React.CSSProperties,

  backBtn: {
    background:    'none',
    border:        'none',
    color:         '#4b5563',
    cursor:        'pointer',
    ...MONO,
    fontSize:      '0.72rem',
    letterSpacing: '0.08em',
    textAlign:     'left',
    padding:       '0 0 1.5rem 0',
    transition:    'color 0.2s',
  } as React.CSSProperties,

  shellLine: {
    ...MONO,
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap',
    wordBreak:  'break-word',
  } as React.CSSProperties,

  clickableLine: {
    cursor:       'pointer',
    borderRadius: '2px',
    transition:   'background 0.15s',
  } as React.CSSProperties,

  pillRow: {
    display:    'flex',
    flexWrap:   'wrap',
    gap:        '0.4rem',
    padding:    '0.5rem 0',
  } as React.CSSProperties,

  pill: {
    background:    'transparent',
    border:        '1px solid #333',
    borderRadius:  '3px',
    color:         'var(--muted)',
    cursor:        'pointer',
    padding:       '0.15rem 0.5rem',
    ...MONO,
    fontSize:      '0.72rem',
    transition:    'border-color 0.15s, color 0.15s',
  } as React.CSSProperties,

  inputRow: {
    display:    'flex',
    alignItems: 'center',
    marginTop:  '0.1rem',
    position:   'relative',
  } as React.CSSProperties,

  prompt: {
    color:      'var(--rust)',
    flexShrink: 0,
    ...MONO,
  } as React.CSSProperties,

  inputMirror: {
    color:      '#fff',
    whiteSpace: 'pre',
    ...MONO,
  } as React.CSSProperties,

  caret: {
    color:     'var(--rust)',
    animation: 'blink 1.1s step-end infinite',
    ...MONO,
  } as React.CSSProperties,

  hiddenInput: {
    position:   'absolute',
    opacity:    0,
    width:      '100%',
    height:     '100%',
    top:        0,
    left:       0,
    cursor:     'text',
    border:     'none',
    background: 'transparent',
    outline:    'none',
    ...MONO,
  } as React.CSSProperties,

  slPre: {
    position:      'fixed',
    bottom:        '120px',
    left:          0,
    color:         'var(--rust)',
    ...MONO,
    lineHeight:    1.35,
    whiteSpace:    'pre',
    animation:     'sl-move 6s linear forwards',
    pointerEvents: 'none',
    zIndex:        200,
  } as React.CSSProperties,
} as const;
